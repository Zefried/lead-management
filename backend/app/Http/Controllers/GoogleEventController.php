<?php

namespace App\Http\Controllers;

use App\Models\GoogleAuthUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use PhpParser\Node\Stmt\Switch_;

class GoogleEventController extends Controller
{


   public function eventCrud(request $request){
    $userData = GoogleAuthUser::where('email', $request->email)->first();

    $clientId = '743324467464-ff7fpq7lm3aumi83dv0jt0r5enlqf5b0.apps.googleusercontent.com';
    $clientSecret = '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';
                

    $response = Http::asForm()->post('https://oauth2.googleapis.com/token', [
        'client_id' => env('GOOGLE_CLIENT_ID', $clientId),
        'client_secret' => env('GOOGLE_CLIENT_SECRET', $clientSecret),
        'refresh_token' => $userData->refreshToken,
        'grant_type' => 'refresh_token',
    ]);

    if ($response->status() !== 200) {
        
    }

    $jsonResponse = $response->json();              

        $states = $request->input('state');
        $eventData = $request->all();
        
        switch($states){
            case 'create-event':
            return $this->createAction($eventData, $jsonResponse);
        }       
            
   }     
   
   public function createAction($data, $jsonResponse){
    $accessToken = $jsonResponse['access_token'];
    return response()->json($accessToken);
   }

//    https://www.googleapis.com/calendar/v3/calendars/primary/events/rp8bp0g1jqp8kv0rci1fcmdcqo
}
