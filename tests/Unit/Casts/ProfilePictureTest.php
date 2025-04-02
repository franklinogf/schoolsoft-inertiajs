<?php

declare(strict_types=1);

use App\Casts\ProfilePicture;
use Illuminate\Database\Eloquent\Model;

beforeEach(function () {
    $this->cast = new ProfilePicture();
    $this->model = new class extends Model {};
});

test('get returns null when value is empty string', function () {
    expect($this->cast->get($this->model, 'avatar', '', []))->toBeNull();
});

test('get returns value when not empty', function () {
    $path = 'avatars/user-1.jpg';

    expect($this->cast->get($this->model, 'avatar', $path, []))->toBe($path);
});

test('set returns the value unchanged', function () {
    $path = 'avatars/user-1.jpg';

    expect($this->cast->set($this->model, 'avatar', $path, []))->toBe($path);
    expect($this->cast->set($this->model, 'avatar', null, []))->toBeNull();
});
