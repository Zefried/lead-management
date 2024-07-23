<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;

class CategoryController extends Controller
{
    public function addCategory(Request $request){

       $validation = Validator::make($request->all(), [
            'category_name' => 'required',
            'slug' => 'required'
       ]);

       if($validation->fails()){
            return response()->json($validation->messages());
       } 

        $category = Category::create($request->only(['category_name', 'description', 'slug']));

        return response()->json([
            'status' => 200,
            'message' => 'Category Added Successfully',
            'data' => $category,
        ]);

    }

    public function viewCategory(){
        $categoryData = Category::all();
        return response()->json($categoryData);
    }

    public function editCategory($id){
       $userData = Category::where('id', $id)->get();
       return response()->json($userData);
    }

    public function updateCategory($id, Request $request){
        $userData = Category::find($id);

        if (!$userData) {
            return response()->json([
                'status' => 400,
                'message' => 'Category not found'
            ]);
        }

        $userData->update($request->all());

        return response()->json([
            'status' => 200,
            'message' => 'Category Updated Successfully',
            'data' => $userData,
        ]);
       
    }

    public function deleteCategory($id){
        $category = Category::find($id);
      
        if(!$category){
            return response()->json([
                'status' => 400,
                'message' => 'Category not found',
            ]);
        } 

        try {
            $category->delete();
    
            return response()->json([
                'status' => 200,
                'message' => 'Category deleted successfully',
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


//please push the project in git today
//please at least move it to the pen drive - buy one