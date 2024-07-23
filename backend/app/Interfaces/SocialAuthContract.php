<?php

namespace App\Interfaces;

interface SocialAuthContract

{
    public function handleCallback($provider);
    public function createSocialAuthUser($socialUser, $newUser, $token = null);
    public function createSanctumToken($userData);
    public function userLogout();
}




?>