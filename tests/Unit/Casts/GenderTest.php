<?php

declare(strict_types=1);

use App\Casts\Gender;
use Illuminate\Database\Eloquent\Model;

beforeEach(function () {
    $this->cast = new Gender();
    $this->model = new class extends Model {};
});

test('get converts Masculino to m', function () {
    expect($this->cast->get($this->model, 'gender', 'Masculino', []))->toBe('m');
});

test('get converts Femenino to f', function () {
    expect($this->cast->get($this->model, 'gender', 'Femenino', []))->toBe('f');
});

test('get returns other values unchanged', function () {
    expect($this->cast->get($this->model, 'gender', 'Other', []))->toBe('Other');
    expect($this->cast->get($this->model, 'gender', 'male', []))->toBe('male');
    expect($this->cast->get($this->model, 'gender', null, []))->toBeNull();
});

test('set returns value unchanged', function () {
    expect($this->cast->set($this->model, 'gender', 'm', []))->toBe('m');
    expect($this->cast->set($this->model, 'gender', 'f', []))->toBe('f');
    expect($this->cast->set($this->model, 'gender', 'Masculino', []))->toBe('Masculino');
    expect($this->cast->set($this->model, 'gender', null, []))->toBeNull();
});
