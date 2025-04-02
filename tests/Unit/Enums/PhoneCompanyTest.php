<?php

declare(strict_types=1);
use App\Enums\PhoneCompanyEnum;

test('PhoneCompanyEnum has correct values', function () {
    $expectedValues = [
        'ATT' => 'AT&T',
        'T_MOBILE' => 'T-Movil',
        'SPRINT' => 'Sprint',
        'OPEN_M' => 'Open M.',
        'CLARO' => 'Claro',
        'VERIZON' => 'Verizon',
        'SUNCOM' => 'Suncom',
        'BOOST' => 'Boost',
    ];

    foreach ($expectedValues as $key => $value) {
        expect(PhoneCompanyEnum::from($value)->name)->toBe($key);
        expect(PhoneCompanyEnum::from($value)->value)->toBe($value);
    }
});

test('PhoneCompanyEnum companyHost method returns correct host', function () {
    $expectedHosts = [
        PhoneCompanyEnum::ATT->value => '@txt.att.net',
        PhoneCompanyEnum::T_MOBILE->value => '@tmomail.net',
        PhoneCompanyEnum::SPRINT->value => '@messaging.sprintpcs.com',
        PhoneCompanyEnum::OPEN_M->value => '@email.openmobilepr.com',
        PhoneCompanyEnum::CLARO->value => '@mms.claropr.com',
        PhoneCompanyEnum::VERIZON->value => '@vtext.com',
        PhoneCompanyEnum::SUNCOM->value => '@tms.suncom.com',
        PhoneCompanyEnum::BOOST->value => '@myboostmobile.com',
    ];

    foreach ($expectedHosts as $enum => $host) {
        expect(PhoneCompanyEnum::from($enum)->companyHost())->toBe($host);
    }
});

test('PhoneCompanyEnum createPhoneEmail method returns correct email', function () {
    $phone = '1234567890';
    $expectedEmails = [
        PhoneCompanyEnum::ATT->value => '1234567890@txt.att.net',
        PhoneCompanyEnum::T_MOBILE->value => '1234567890@tmomail.net',
        PhoneCompanyEnum::SPRINT->value => '1234567890@messaging.sprintpcs.com',
        PhoneCompanyEnum::OPEN_M->value => '1234567890@email.openmobilepr.com',
        PhoneCompanyEnum::CLARO->value => '1234567890@mms.claropr.com',
        PhoneCompanyEnum::VERIZON->value => '1234567890@vtext.com',
        PhoneCompanyEnum::SUNCOM->value => '1234567890@tms.suncom.com',
        PhoneCompanyEnum::BOOST->value => '1234567890@myboostmobile.com',
    ];

    foreach ($expectedEmails as $enum => $email) {
        expect(PhoneCompanyEnum::from($enum)->createPhoneEmail($phone))->toBe($email);
    }
});
