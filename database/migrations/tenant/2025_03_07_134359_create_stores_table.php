<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stores', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->boolean('active')->default(false);
            $table->string('prefix_code')->unique()->comment('Used for everteck to identify the store');
            $table->timestamps();
        });

        Schema::create('store_items', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('store_id')->constrained('stores')->cascadeOnDelete();
            $table->string('name');
            $table->float('price');
            $table->json('options')->nullable();
            $table->boolean('buy_multiple')->default(false);
            $table->string('picture_url')->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('store_items');
        Schema::dropIfExists('stores');
    }
};
