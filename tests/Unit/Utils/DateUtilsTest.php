<?php

declare(strict_types=1);

use App\Utils\DateUtils;

test('return the month name in lowercase (spanish)', function (int $monthNumber) {
    app()->setLocale('es');
    $expectedMonthName = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
    ][$monthNumber - 1];

    $monthName = DateUtils::getMonthName($monthNumber);
    expect(app()->getLocale())->toBe('es');
    expect($monthName)->toBe($expectedMonthName);
})->with([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

test('return the month name in lowercase (english)', function (int $monthNumber) {
    app()->setLocale('en');
    $expectedMonthName = [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december',
    ][$monthNumber - 1];

    $monthName = DateUtils::getMonthName($monthNumber);
    expect(app()->getLocale())->toBe('en');
    expect($monthName)->toBe($expectedMonthName);
})->with([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
