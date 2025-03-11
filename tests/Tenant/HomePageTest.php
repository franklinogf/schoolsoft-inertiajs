<?php

test('renders school home page', function () {
    /** @var \Tests\TenantCase $this */
    $schoolInfo = $this->getPrimaryAdmin();

    $response = $this->get(route('home.index'));

    $response->assertStatus(200);
    $response->assertSee($schoolInfo->colegio);
});
