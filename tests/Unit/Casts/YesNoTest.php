<?php

declare(strict_types=1);

use App\Casts\YesNo;
use Illuminate\Database\Eloquent\Model;

beforeEach(function () {
    $this->cast = new YesNo();
    $this->model = new class extends Model {};
});

test('get returns NO when value is falsy', function () {
    expect($this->cast->get($this->model, 'is_active', false, []))->toBe('NO');
    expect($this->cast->get($this->model, 'is_active', null, []))->toBe('NO');
    expect($this->cast->get($this->model, 'is_active', '', []))->toBe('NO');
});

test('get returns uppercase value when value is truthy', function () {
    expect($this->cast->get($this->model, 'is_active', 'yes', []))->toBe('YES');
    expect($this->cast->get($this->model, 'is_active', 'y', []))->toBe('Y');
    expect($this->cast->get($this->model, 'is_active', 'true', []))->toBe('TRUE');
});

test('set returns NO when value is falsy', function () {
    expect($this->cast->set($this->model, 'is_active', false, []))->toBe('NO');
    expect($this->cast->set($this->model, 'is_active', null, []))->toBe('NO');
    expect($this->cast->set($this->model, 'is_active', '', []))->toBe('NO');
});

test('set returns uppercase value when value is truthy', function () {
    expect($this->cast->set($this->model, 'is_active', 'yes', []))->toBe('YES');
    expect($this->cast->set($this->model, 'is_active', 'y', []))->toBe('Y');
    expect($this->cast->set($this->model, 'is_active', 'true', []))->toBe('TRUE');
});
