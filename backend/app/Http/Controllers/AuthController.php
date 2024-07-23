<?php

namespace App\Http\Controllers;

use App\Interfaces\SocialAuthContract;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    private $socialAuthContract;

    public function __construct(SocialAuthContract $socialAuthContract)
    {
        $this->socialAuthContract = $socialAuthContract;
    }

    public function handleCallback($provider)
    {
        return $this->socialAuthContract->handleCallback($provider);
    }

    public function userLogout()
    {
        return $this->socialAuthContract->userLogout();
    }
}