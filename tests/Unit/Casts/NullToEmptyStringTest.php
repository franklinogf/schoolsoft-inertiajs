<?php

declare(strict_types=1);

use App\Casts\NullToEmptyString;
use Illuminate\Database\Eloquent\Model;

beforeEach(function () {
    $this->cast = new NullToEmptyString();
    $this->model = new class extends Model {};
});

test('get returns value unchanged', function () {
    expect($this->cast->get($this->model, 'notes', 'some notes', []))->toBe('some notes');
    expect($this->cast->get($this->model, 'notes', null, []))->toBeNull();
    expect($this->cast->get($this->model, 'notes', '', []))->toBe('');
});

test('set returns empty string when value is null', function () {
    expect($this->cast->set($this->model, 'notes', null, []))->toBe('');
});

test('set returns value unchanged when not null', function () {
    expect($this->cast->set($this->model, 'notes', 'some notes', []))->toBe('some notes');
    expect($this->cast->set($this->model, 'notes', '', []))->toBe('');
});
