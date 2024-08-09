<?php

namespace App\Helpers;

use App\Models\GoogleAuthUser;
use Illuminate\Support\Facades\Http;

class ExchangeTokenHelper
{
    
    public static function exchange(){

        $refreshTokenData = self::getRefreshTokenData();

        return self::getExchangeToken($refreshTokenData);

    }

    public static function getRefreshTokenData(){

        $user = GoogleAuthUser::where('email', 'zeffali7@gmail.com')->first();

        if ($user && $user->refreshToken !== null) {
            return $user->refreshToken;
        }   

        return response()->json('user or user refresh token is not found');
    }

    public static function getExchangeToken($refreshTokenData){
        // return response()->json($refreshTokenData);

        $grant_type = 'refresh_token';
        $refresh_token = $refreshTokenData;
        $client_id = env('GOOGLE_CLIENT_ID');
        $client_secret = env('GOOGLE_CLIENT_SECRET');
        
        // return response()->json($client_id);

        $response = Http::asForm()->post('https://oauth2.googleapis.com/token', [
            'grant_type' => $grant_type,
            'refresh_token' => $refresh_token,
            'client_id' => $client_id,
            'client_secret' => $client_secret,
        ]);

        // return response()->json($response->json());

        if ($response->successful()) {
            return $response->json()['access_token'];
        } 

        return $response->json();
    }

}














?>