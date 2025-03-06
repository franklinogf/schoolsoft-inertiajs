@props(['school' => config('app.name')])
<x-mail::layout>
{{-- Header --}}
<x-slot:header>
<x-mail::header :url="$school === config('app.name') ? config('app.url') : route('home.index', ['school' => tenant('id')])">
{{ $school }}
</x-mail::header>
</x-slot:header>

{{-- Body --}}
{{ $slot }}

{{-- Subcopy --}}
@isset($subcopy)
<x-slot:subcopy>
<x-mail::subcopy>
{{ $subcopy }}
</x-mail::subcopy>
</x-slot:subcopy>
@endisset

{{-- Footer --}}
<x-slot:footer>
<x-mail::footer>
© {{ date('Y') }} {{ config('app.name') }}. @lang('All rights reserved.')
</x-mail::footer>
</x-slot:footer>
</x-mail::layout>
