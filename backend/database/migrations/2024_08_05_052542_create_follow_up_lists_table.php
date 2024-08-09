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
        Schema::create('follow_up_lists', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('client_id')->nullable();
            $table->string('event_title')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamp('start_date')->nullable();
            $table->timestamp('end_date')->nullable();
            $table->string('status')->default('pending'); // or 'completed', 'cancelled', etc.
            $table->string('calendar_id')->nullable();
            $table->string('creator')->nullable();
            $table->string('location')->nullable();
            // foreign keys
            $table->foreign('client_id')->references('id')->on('add_clients')->onDelete('set null');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('follow_up_lists');
    }
};
