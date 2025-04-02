<?php

declare(strict_types=1);

use App\Casts\Date;
use Illuminate\Database\Eloquent\Model;

beforeEach(function () {
    $this->model = new class extends Model {};
    $this->cast = new Date();
});
test('Date cast returns null for "0000-00-00"', function () {

    $result = $this->cast->get($this->model, 'test_date', '0000-00-00', []);
    expect($result)->toBeNull();
});

test('Date cast returns the value if not "0000-00-00"', function () {
    $result = $this->cast->get($this->model, 'test_date', '2023-10-01', []);
    expect($result)->toBe('2023-10-01');
});

test('Date cast sets "0000-00-00" when value is null', function () {
    $result = $this->cast->set($this->model, 'test_date', null, []);
    expect($result)->toBe('0000-00-00');
});

test('Date cast sets the given value when it is not null', function () {
    $result = $this->cast->set($this->model, 'test_date', '2023-10-01', []);
    expect($result)->toBe('2023-10-01');
});
