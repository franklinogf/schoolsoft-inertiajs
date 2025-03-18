<?php

namespace App\Http\Controllers\Regiweb\Options;

use App\Http\Controllers\Controller;
use App\Http\Resources\CoursesResource;
use App\Http\Resources\InboxResource;
use App\Models\Inbox;
use App\Models\Student;
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
                ->get();
        } elseif ($type === 'sent') {
            $mails = $teacher->inboxes()
                ->get();
        } else {

            $mails = $teacher->receivedMessages()
                ->get()->merge(
                    $teacher->inboxes()
                        ->get()
                );
        }

        $mails = $mails->count() > 0 ? InboxResource::collection($mails) : [];
        // if ($inbox) {
        //     if ($inbox->sender_id === auth()->user()->id) {
        //         $inbox->is_read_by_sender = true;
        //     } else {
        //         $inbox->is_read_by_receiver = true;
        //     }
        //     $inbox->save();

        // }
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
        ]);

        /**
         * @var \App\Models\Teacher $teacher
         */
        $teacher = auth()->user();
        $inbox = $teacher->inboxes()->create([
            'subject' => $validated['subject'],
            'message' => $validated['message'],
        ]);

        $students = Student::ofCourse($course)
            ->whereIn('year.ss', $validated['students'])
            ->get();

        $inbox->students()->attach($students);

        return to_route('regiweb.options.messages.index')->with('success', 'Message sent successfully');
    }

    public function destroy(string $id)
    {
        $inbox = Inbox::findOrFail($id);
        if ($inbox->sender_id === auth()->user()->id) {
            $inbox->is_deleted_by_sender = true;
        } else {
            $inbox->is_deleted_by_receiver = true;
        }
        $inbox->save();

        return to_route('regiweb.options.messages.index')->with('success', 'Message deleted successfully');
    }
}
