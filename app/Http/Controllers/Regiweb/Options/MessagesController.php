<?php

namespace App\Http\Controllers\Regiweb\Options;

use App\Enums\MediaCollectionEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\CoursesResource;
use App\Http\Resources\InboxResource;
use App\Models\Inbox;
use App\Models\Student;
use App\Models\TemporaryFile;
use Illuminate\Http\Request;

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
            $mails = $teacher->inboxes()
                ->where('is_deleted', false)
                ->get();
        } else {

            $mails = $teacher->receivedMessages()
                ->wherePivot('is_deleted', true)
                ->get()->merge(
                    $teacher->inboxes()
                        ->where('is_deleted', true)
                        ->get()
                );
        }

        $mails = $mails->count() > 0 ? InboxResource::collection($mails) : [];

        $mail = $inbox ? new InboxResource($inbox) : null;

        return inertia('Regiweb/Options/Messages/Index',
            [
                'mails' => $mails,
                'mail' => $mail,
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
        $inbox = $teacher->inboxes()->create([
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
        if ($inbox->sender_id == $teacher->id) {
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
        if ($inbox->sender_id == $teacher->id) {
            $inbox->update(['is_deleted' => false]);
        } else {
            $teacher->receivedMessages()
                ->updateExistingPivot($inbox->id, ['is_deleted' => false]);
        }

        return to_route('regiweb.options.messages.index', ['type' => $type])->with('success', 'Message deleted successfully');
    }
}
