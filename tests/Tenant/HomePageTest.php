<?php

it('renders school home page', function () {
    $response = $this->get(route('home.index'));

    $response->assertStatus(200);
});
