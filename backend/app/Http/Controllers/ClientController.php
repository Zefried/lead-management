<?php

namespace App\Http\Controllers;

use App\Models\AddClient;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;
use Illuminate\Support\Facades\Log;

class ClientController extends Controller
{
    
    public function addClient(Request $request){

        $validation = Validator::make($request->all(), [
             'client_name' => 'required',
             'business_type' => 'required',
             'business_name' => 'required',
             'phone' => 'required|numeric|digits_between:9,13',
             'location' => 'required',
        ]);
 
        if($validation->fails()){
             return response()->json($validation->messages());
        } 
        
        try{
            $category = AddClient::create([
                'client_name' => $request->input('client_name'),
                'category_id' =>  $request->input('business_type'),
                'business_type' =>  $request->input('business_type'),
                'business_name' =>  $request->input('business_name'),
                'phone' =>  $request->input('phone'),
                'location' =>  $request->input('location'),
             ]);
             
            return response()->json([
                'status' => 200,
                'message' => 'Category Added Successfully',
                'data' => $category,
            ]);

        } catch(Exception $e){
            Log::channel('CrudLogs')->error("Error while adding clients", [
                'error' => $e->getMessage(),
            ]);
        }
 
    }
 
     public function viewClient(){
         $clientData = AddClient::all();
         return response()->json($clientData);
     }
 
     public function editClient($id){
        
        $categoryData = Category::all();
        $clientData = AddClient::where('id', $id)->first();

        return response()->json([
            'clientData' => $clientData,
            'categoryData' => $categoryData
        ]);
     }
 
     public function updateClient($id, Request $request){
         $userData = AddClient::find($id);
 
         if (!$userData) {
             return response()->json([
                 'status' => 400,
                 'message' => 'Client not found',
             ]);
         }
 
        $updateUser = $userData->update($request->all());
 
         return response()->json([
             'status' => 200,
             'message' => 'Client Updated Successfully',
             'data' => $updateUser,
         ]);
        
     }
 
     public function deleteClient($id){
         $clientData = AddClient::find($id);
       
         if(!$clientData){
             return response()->json([
                 'status' => 400,
                 'message' => 'Client not found',
             ]);
         } 
 
         try {
             $clientData->delete();
     
             return response()->json([
                 'status' => 200,
                 'message' => 'Client deleted successfully',
             ]);

         } catch (Exception $e) {
             return response()->json([
                 'status' => 500,
                 'message' => 'Failed to delete category',
                 'error' => $e->getMessage(),
             ], 500);
         }
     }
}
