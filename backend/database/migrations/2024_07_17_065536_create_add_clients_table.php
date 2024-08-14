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
        
        Schema::create('add_clients', function (Blueprint $table) {
            
            $table->id();
            $table->unsignedBigInteger('category_id'); // Foreign key column
            $table->string('client_name')->nullable();
            $table->string('business_name')->nullable();
            $table->string('business_type')->nullable();
            $table->string('phone')->nullable();
            $table->string('location')->nullable();
          
            $table->timestamps();

            // Adding foreign key constraint
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('add_clients');
    }
};
