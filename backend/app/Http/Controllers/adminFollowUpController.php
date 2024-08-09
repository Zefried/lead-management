<?php

namespace App\Http\Controllers;
use App\Helpers\ExchangeTokenHelper;
use App\Models\FollowUpList;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Psr\Http\Message\ResponseInterface;

class adminFollowUpController extends Controller
{
    public function addFollowup(Request $request){

        $originalPayload = $request->all();

        $accessToken = ExchangeTokenHelper::exchange();
      
        $eventData = $this->createEvent($originalPayload, $accessToken);

        return response()->json($eventData);

   }

   public function createEvent($originalPayload, $accessToken){
         // return response()->json($accessToken);
         // Original payload
         $payload = [
            'title' => $originalPayload['title'],
            'description' => $originalPayload['description'],
            'location' => $originalPayload['location'],
            'start' =>  $originalPayload['start'],
            'end' =>  $originalPayload['end'],
         ];

         // Convert to Carbon instances for formatting and subtracting hours since not IST 5h30 mint ahead
         $startDateTime = Carbon::createFromFormat('Y-m-d\TH:i', $payload['start'])->subHours(5)->subMinutes(30);
         $endDateTime = Carbon::createFromFormat('Y-m-d\TH:i', $payload['end'])->subHours(5)->subMinutes(30);

         // Format data according to ISO 8601
         $rawData = [
            'summary' => $payload['title'],
            'description' => $payload['description'],
            'start' => [
               'dateTime' => $startDateTime,
               'timeZone' => 'Asia/Kolkata'
            ],
            'end' => [
               'dateTime' => $endDateTime,
               'timeZone' => 'Asia/Kolkata'
            ]
         ];

        // Send POST request with Bearer token and raw JSON body
         $response = Http::withToken($accessToken)
         ->withHeaders(['Content-Type' => 'application/json'])
         ->post('https://www.googleapis.com/calendar/v3/calendars/primary/events', $rawData);
         
        

         if ($response->successful()) {
            
            $data = $response->json();

            $followUpInstance = FollowUpList::create([
                  'client_id' => '2',
                  'event_title' => $data['summary'],
                  'remarks' => $data['description'],
                  'start_date' => $data['start']['dateTime'],
                  'end_date' => $data['end']['dateTime'],
                  'status' => $data['pending'],
                  'calendar_id' => $data['id'],
                  'creator' => $data['creator']['email'],
                  'location' => $originalPayload['location']
            ]);

            return response()->json([
                  'status' => 201,
                  'message' => 'successful',
                  'data' => $followUpInstance,
            ]);


         } else {
            return response()->json(['error' => $response->json(), 'message' => 'Token May Have Expired, Please Login'], 400);
         }

         

   }
    
}
