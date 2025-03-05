<x-mail::message :school="$school">

{{ Illuminate\Mail\Markdown::parse($message) }}

{{__('Thanks')}},<br>
{{ $school }}
</x-mail::message>
