<?php

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
        Schema::create('inboxes', function (Blueprint $table) {
            $table->id();
            $table->morphs('sender');
            $table->string('subject');
            $table->text('message');
            $table->foreignId('parent_id')->nullable()->constrained('inboxes')->onDelete('cascade');
            $table->boolean('is_deleted')->default(false);
            $table->string('year', 5);
            $table->timestamps();
        });

        Schema::create('inboxebles', function (Blueprint $table) {
            $table->foreignId('inbox_id')->constrained('inboxes')->onDelete('cascade');
            $table->morphs('receiver');
            $table->boolean('is_read')->default(false);
            $table->boolean('is_deleted')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inboxeables');
        Schema::dropIfExists('inboxes');
    }
};
