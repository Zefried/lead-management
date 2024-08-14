<?php

namespace App\Helpers;

use App\Models\GoogleAuthUser;
use Illuminate\Support\Facades\Http;

class ExchangeTokenHelper
{
    
    public static function exchange($email){

        $refreshTokenData = self::getRefreshTokenData($email);

        return self::getExchangeToken($refreshTokenData);

    }

    public static function getRefreshTokenData($email){

        $user = GoogleAuthUser::where('email', $email)->first();

        if ($user && $user->refreshToken !== null) {
            return $user->refreshToken;
        }   

        return response()->json(['messages' => 'there is a problem finding the user or refresh token']);
    }

    public static function getExchangeToken($refreshTokenData){
        // return response()->json($refreshTokenData);
        try{

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

            return response()->json([
                'status' => 401,
                'message' => 'Refresh Token expired please login',
                'error' => $response->json(),
            ]);
            
        } catch(\Exception $e){
           return response()->json([
            'status' => 500,
            'message' => 'Exchange token error: ' . $e->getMessage(),
           ]);
        }
       
 
       
    }

}














?>