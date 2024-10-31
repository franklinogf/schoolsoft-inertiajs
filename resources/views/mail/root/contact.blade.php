<x-mail::message>
# Schoolsoft Contact Form
## Name: {{ $name }}
## Email: {{ $email }}
## Message: {{ $message }}
## Phone: {{ $phone }}
<br />
Thanks,<br />
{{ config('app.name') }}
</x-mail::message>
