<?php

namespace App\Http\Controllers;
use App\Helpers\ExchangeTokenHelper;
use App\Models\AddClient;
use App\Models\FollowUpList;
use App\Models\StatusMaster;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class adminFollowUpController extends Controller
{

   public function addFollowup(Request $request){
      
      $data = $request->all();
      $email = $data['email']; //purpose - to fetch refreshToken of the current admin or sub-admin
      $id = $data['id'];
      $originalPayload = $data['event'];

      $validator = Validator::make($originalPayload, [
         'title' => 'required',
         'description' => 'required',
         'location' => 'required',
         'start' =>  'required',
         'end' => 'required',
      ]);

      if($validator->fails()){
         return response()->json(['error' => $validator->messages()]);
      }

      $accessToken = ExchangeTokenHelper::exchange($email);
      $eventData = $this->createEvent($originalPayload, $accessToken, $id);

      return response()->json($eventData);

      // return response()->json([
      //    'status' => 200,
      //    'message' => 'follow up added',
      //    'eventData' => $eventData,
      // ]);

   }

   public function createEvent($originalPayload, $accessToken, $id){
         // return response()->json($accessToken);
         // Original payload
         $payload = [
            'title' => $originalPayload['title'],
            'description' => $originalPayload['description'],
            'start' =>  $originalPayload['start'],
            'end' =>  $originalPayload['end'],
         ];

         // Convert to Carbon instances for formatting and subtracting hours since not IST 5h30 mint ahead
         $startDateTime = Carbon::createFromFormat('Y-m-d\TH:i', $payload['start'])->subHours(5)->subMinutes(30);
         $endDateTime = Carbon::createFromFormat('Y-m-d\TH:i', $payload['end'])->subHours(5)->subMinutes(29);

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
                  'client_id' => $id,
                  'event_title' => $data['summary'],
                  'remarks' => $data['description'],
                  'start_date' => $data['start']['dateTime'],
                  'end_date' => $data['end']['dateTime'],
                  'status' => 'pending',
                  'calendar_id' => $data['id'],
                  'creator' => $data['creator']['email'],
            ]);

            return response()->json([
                  'status' => 201,
                  'messages' => 'Your follow-up has been created',
                  'item' => $followUpInstance,
            ]);


         } else {
            return response()->json(['error' => $response->json(), 'messages' => 'Token May Have Expired, Please Sign in again'], 400);
         }
   }

   // Creating the event is done above; now, we are working on retrieving data below

   public function viewFollowUp(){
      try {
         // Retrieve paginated data
         $followUpList = AddClient::with('followUps')->get();

         return response()->json([
             'status' => 200,
             'items' => $followUpList, 
         ]);

     } catch (\Exception $e) {
         return response()->json([
             'status' => 500,
             'message' => $e->getMessage(),
         ]);
     }
   }

   // edit followup event begins here
   
   public function editFollowup($id)
   {
      try {

         // throw new \Exception('Record not found');

         $followUpData = FollowUpList::where('id', $id)->first();
         
         if ($followUpData) {
               // its not a key, Retrieving related client data through client function
               $clientData = $followUpData->client;

               return response()->json([
                  'status' => 200,
                  'followUp' => $followUpData,
                  'client' => $clientData
               ]);

         } else {

               return response()->json([
                  'status' => 404,
                  'error' => 'Record not found']);
         }
      } catch (\Exception $e) {

         return response()->json([
            'status' => 500,
            'message' => $e->getMessage(),
         ]);
      }
   }

   public function updateFollowup(Request $Request, $id)
   {
      try {
         // throw new \Exception('Record not found');
         $editedData = $Request->all();
         $followUpData = FollowUpList::findOrFail($id);

         $updated = $followUpData->update($editedData);

         return response()->json([
            'status' => 200,
            'followUp' => $updated,
         ]);
            

      } catch (\Exception $e) {

         return response()->json([
            'status' => 500,
            'error' => $e->getMessage(),
         ]);
      }
   }

   public function deleteFollowup($id) {

      try{
         $item = FollowUpList::findorfail($id);
         $item->delete();
   
         return response()->json([
            'status' => 200
         ]);

      }catch(\Exception $e){
         return response()->json([
            'status' => 404,
            'message' => $e->getMessage(),

         ]);
      }
     
   }  

   public function fetchStatusMaster(){
      try{
         $data = StatusMaster::all();
         return response()->json([
            'status' =>  200,
            'statusData' => $data,
         ]);

      }catch(\Exception $e){
         return response()->json([
            'status' => 404,
            'message' => $e->getMessage(),
         ]);
      }
    
   }

   public function updateFollowupStatus(Request $request){

      try{
         
         $followUpId = $request->input('id');
         $statusName = $request->input('status_name');
         // $statusId = $request->input('status_id');

         $follow_up_row = FollowUpList::findorfail($followUpId);
         $follow_up_row->update(['status' => $statusName]);

         return response()->json([
            'status' => 200,
            'message' => 'status updated',
         ]);

    
      }catch(Exception $e){
         return response()->json([
            'status' => 500,
            'message' => $e->getMessage(),
         ]);
      }


   }
    
}
