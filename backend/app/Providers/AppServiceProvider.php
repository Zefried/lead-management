<?php
namespace App\Providers;

use App\Interfaces\SocialAuthContract;
use App\Services\GoogleAuthService;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(SocialAuthContract::class, GoogleAuthService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}