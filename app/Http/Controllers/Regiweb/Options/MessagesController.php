<?php

namespace App\Http\Controllers\Regiweb\Options;

use App\Enums\MediaCollectionEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\CoursesResource;
use App\Http\Resources\InboxResource;
use App\Models\Inbox;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\TemporaryFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\MediaLibrary\Support\MediaStream;

class MessagesController extends Controller
{
    public function index(?Inbox $inbox = null)
    {

        $type = request()->query('type', 'inbox');
        if (! in_array($type, ['inbox', 'sent', 'trash'])) {
            $type = 'inbox';
        }
        /**
         * @var \App\Models\Teacher $teacher
         */
        $teacher = auth()->user();

        if ($type === 'inbox') {
            $mails = $teacher->receivedMessages()
                ->wherePivot('is_deleted', false)
                ->get();
        } elseif ($type === 'sent') {
            $mails = $teacher->sentMessages()
                ->where('is_deleted', false)
                ->get();
        } else {

            $mails = $teacher->receivedMessages()
                ->wherePivot('is_deleted', true)
                ->get()->merge(
                    $teacher->sentMessages()
                        ->where('is_deleted', true)
                        ->get()
                );
        }

        $mails = $mails->count() > 0 ? InboxResource::collection($mails) : [];

        $mail = $inbox ? new InboxResource($inbox) : null;
        if ($mail) {
            if ($inbox->sender_id !== $teacher->id) {
                $teacher->receivedMessages()
                    ->updateExistingPivot($inbox->id, ['is_read' => true]);
            }
        }

        return inertia('Regiweb/Options/Messages/Index',
            [
                'mails' => Inertia::defer(fn () => $mails),
                'mail' => Inertia::defer(fn () => $mail),
                'type' => $type,
            ]);
    }

    public function create(?string $course = null)
    {
        $courses = CoursesResource::collection(auth()->user()->courses);
        $students = $course !== null ? Student::ofCourse($course)->get() : [];

        return inertia('Regiweb/Options/Messages/Create',
            [
                'courses' => $courses,
                'students' => $students,
                'course' => $course,
            ]);
    }

    public function store(Request $request, string $course)
    {
        $validated = $request->validate([
            'subject' => 'required|string',
            'message' => 'required|string',
            'students' => 'required',
            'files' => ['array'],
            'files.*' => ['string'],
        ]);
        $folders = $validated['files'];

        /**
         * @var \App\Models\Teacher $teacher         *
         */
        $teacher = auth()->user();
        /**
         * @var \App\Models\Inbox $inbox
         */
        $inbox = $teacher->sentMessages()->create([
            'subject' => $validated['subject'],
            'message' => $validated['message'],
        ]);
        $temporaryFiles = tenancy()->central(function () use ($folders) {
            return TemporaryFile::whereIn('folder', $folders)->get();
        });

        foreach ($temporaryFiles as $temporaryFile) {
            $inbox->addMediaFromDisk(tmp_path($temporaryFile->folder, $temporaryFile->filename), 'local')
                ->toMediaCollection(MediaCollectionEnum::INBOX_ATTACHMENT->value);
            $temporaryFile->delete();
        }

        $students = Student::ofCourse($course)
            ->whereIn('year.ss', $validated['students'])
            ->get();

        $inbox->students()->attach($students);

        return to_route('regiweb.options.messages.index')->with('success', 'Message sent successfully');
    }

    public function destroy(Request $request)
    {
        $id = $request->input('id');
        $type = $request->query('type', 'inbox');
        $inbox = Inbox::findOrFail($id);
        /**
         * @var \App\Models\Teacher $teacher
         */
        $teacher = auth()->user();
        if ($inbox->sender_id === $teacher->id) {
            $inbox->update(['is_deleted' => true]);
        } else {
            $teacher->receivedMessages()
                ->updateExistingPivot($inbox->id, ['is_deleted' => true]);
        }

        return to_route('regiweb.options.messages.index', ['type' => $type])->with('success', 'Message deleted successfully');
    }

    public function restore(Request $request)
    {
        $id = $request->input('id');
        $type = $request->query('type', 'inbox');
        $inbox = Inbox::findOrFail($id);
        /**
         * @var \App\Models\Teacher $teacher
         */
        $teacher = auth()->user();
        if ($inbox->sender_id === $teacher->id) {
            $inbox->update(['is_deleted' => false]);
        } else {
            $teacher->receivedMessages()
                ->updateExistingPivot($inbox->id, ['is_deleted' => false]);
        }

        return to_route('regiweb.options.messages.index', ['type' => $type])->with('success', 'Message deleted successfully');
    }

    public function downloadAll(Inbox $inbox)
    {

        $media = $inbox->getMedia(MediaCollectionEnum::INBOX_ATTACHMENT->value);

        Gate::allowIf(fn (Teacher $user) => $user->id === $inbox->sender_id
        || $inbox->model->teachers()->where('receiver_id', $user->id)->exists()
        );

        return MediaStream::create($inbox->subject->lower()->snake().'.zip')->addMedia($media);
    }

    public function download(Media $media)
    {
        Gate::allowIf(fn (Teacher $user) => $user->id === $media->model->sender_id
        || $media->model->teachers()->where('receiver_id', $user->id)->exists()
        );

        return $media;
    }
}
