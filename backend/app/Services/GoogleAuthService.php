<?php

namespace App\Services;

use App\Interfaces\SocialAuthContract;
use App\Models\GoogleAuthUser;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Laravel\Socialite\Facades\Socialite;


class GoogleAuthService implements SocialAuthContract

{

    
    public function handleCallback($provider) 
    {
        
        try {
        
            $socialUser = Socialite::driver($provider)->stateless()->user();

            $userData = User::where('email', $socialUser->email)->first();
            
            if (!$userData) {
                $newUser = $this->createNewUser($socialUser);
                $token = $this->generateNewToken($newUser);
                $this->createSocialAuthUser($socialUser, $newUser, $token);

                return $this->redirectWithToken($newUser, $token);

            } else {

                $this->createSocialAuthUser($socialUser, $userData);
                $tokenData = $this->createSanctumToken($userData);

                return $this->redirectWithToken($userData, $tokenData->original->plainTextToken);
            }
        } catch (Exception $e) {
            Log::channel('OauthLogs')->error("Error during $provider auth callback", [
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function createSocialAuthUser($socialUser, $newUser, $token = null) 
    {
    
        $userSocialData = GoogleAuthUser::where('email', $socialUser->email)->first();
        
        if (!$userSocialData) {

            return GoogleAuthUser::create([
                'name' => $socialUser->name,
                'email' => $socialUser->email,
                'user_id' => $newUser->id,
                'avatar' => $socialUser->avatar,
                'refreshToken' => $socialUser->refreshToken,
                'profile_id_code' => $socialUser->idCode ?? null,
                'userOAuthId' => $socialUser->attributes['id'],
            ]);
        } 
        else {

            return GoogleAuthUser::where('email', $socialUser->email)->update([
                'refreshToken' => $socialUser->refreshToken,
            ]);
        }
    }

    public function createSanctumToken($userData)
    {
        try {
            
            $tokenData = $userData->tokens()->where('tokenable_id', $userData->id)->first();
            if (!$tokenData) {
                $token = $userData->createToken($userData->email);

                return response()->json($token);
            } else {

                $userData->tokens()->where('tokenable_id', $userData->id)->delete();
                $newToken = $userData->createToken($userData->email);

                return response()->json($newToken);
            }
        } catch (Exception $e) {
            Log::channel('OauthLog.log')->error('Failed to create sanctum token using helper function', ['error' => $e->getMessage()]);
        }
    }

    public function userLogout() 
    {

        $user = User::find(9);
        $test = $user->tokens()->where('id', 9)->delete();

        return response()->json($test);
    }

    private function createNewUser($socialUser) 
    {

        return User::create([
            'name' => $socialUser->name,
            'email' => $socialUser->email,
            'role' => 'user',
        ]);

    }

    private function generateNewToken($user) 
    {
        return $user->createToken($user->email)->plainTextToken;

    }

    private function redirectWithToken($user, $token) 
    {

        $tokenJson = json_encode([
            'email' => $user->email,
            'name' => $user->name,
            'role' => $user->role,
            'token' => $token,
        ]);

        return Redirect::away('http://localhost:3000/login?token=' . urlencode($tokenJson));
    }
    
}









?>