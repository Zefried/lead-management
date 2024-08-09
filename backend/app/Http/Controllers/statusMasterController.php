<?php

namespace App\Http\Controllers;

use App\Models\StatusMaster;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class statusMasterController extends Controller
{

    public function addStatus(request $request){
       
       $validator = validator::make($request->all(), [
        'status_name' => 'required',
       ]);

       if($validator->fails()){
            return response()->json($validator->messages());
       }

        try{

            $status_data = statusMaster::create([
                'status_name' => $request->input('status_name'),
            ]);
        
            return response()->json([
                'status' => 200,
                'message' => 'status name added successfully',
                'data' => $status_data,
            ]);

        }catch(Exception $e){
            Log::channel('CrudLogs')->error('Error while adding status_master_name', [
                'error' => $e->getMessage(),
            ]);
        }
       

    }

    public function viewStatus(){
        
       $statusData = statusMaster::all();

        return response()->json([
            'status' => 200,
            'data' => $statusData,
        ]);
    }

    public function editStatus($id) {
        $userData = statusMaster::where('id', $id)->first();
        return response()->json($userData);
    }

    public function updateStatus($id, Request $request){
        $statusData = statusMaster::find($id);

        if (!$statusData) {
            return response()->json([
                'status' => 400,
                'message' => 'status not found',
            ]);
        }

        $updateStatus = $statusData->update($request->all());

        return response()->json([
            'status' => 200,
            'message' => 'Client Updated Successfully',
            'data' => $updateStatus,
        ]);
       
    }

    public function deleteStatus($id){
        $statusData = statusMaster::find($id);
      
        if(!$statusData){
            return response()->json([
                'status' => 400,
                'message' => 'item not found',
            ]);
        } 

        try {
            $statusData->delete();
    
            return response()->json([
                'status' => 200,
                'message' => 'status master deleted successfully',
            ]);

        } catch (Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Failed to delete status master',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
