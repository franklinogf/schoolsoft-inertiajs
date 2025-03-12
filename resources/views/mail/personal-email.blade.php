<x-mail::message :school="$school">

{{ Illuminate\Mail\Markdown::parse($message) }}

{{__('Gracias')}},<br>
{{ $school }}
</x-mail::message>
