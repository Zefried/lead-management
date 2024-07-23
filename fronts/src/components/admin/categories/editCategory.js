import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export const EditCategory = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const userData = JSON.parse(localStorage.getItem('auth_user'));
    const token = userData.token;

    const [loading, setLoading] = useState(null);
    const [categoryRetrievedData, setRetrievedData] = useState();


    useEffect(()=>{
        setLoading(true);
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.get(`api/admin/edit-category/${id}`,{
                headers:{
                    authorization: `Bearer ${token}`
                }
            }).then((res)=>{ 
                setRetrievedData(res.data[0]);
                setLoading(false);

            }).catch((error)=>{
                console.log(error + 'error on fetching user data')
            })
        }).catch((error)=>{
            console.log(error + 'error on getting csrf token');
        });
    },[])


    const handleEditData = (event) => {
        const {name, value} = event.target;

        setRetrievedData((prevData)=>{
            return(
                {...prevData, [name]:value}
            )
        })


    }

    const handleSubmit = (event) => {
        setLoading(true);
        event.preventDefault();

        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post(`api/admin/update-category/${id}`,categoryRetrievedData, {
                headers:{
                    authorization: `Bearer ${token}`
                }
            }).then((res)=>{

                if(res.data.status == 400){
                    setLoading(false);
                
                    Swal.fire({
                        icon: "error",
                        title: "Opp's something went wrong",
                        text: res.data.message,
                        icon: "warning"
                    });

                    navigate('/admin/add-category');
                  
                } else{
                    setLoading(false);
    
                     Swal.fire({
                        title: "Success",
                        text: "Category Updated Successfully",
                        icon: "success"
                      });

                    navigate('/admin/add-category')
                }
                

            }).catch((error)=>{
                console.log(error + 'error on storing category data')
            })
        }).catch((error)=>{
           console.log(error + 'error on getting csrf token');
        });
    }



    // using custom jsx

    let loadingJsx = '';
        if(loading){

        return loadingJsx = (
            <div>
                <h3>Loading..</h3>
            </div>
           )
            
    }



  
    return (

    <div className='client-category-wrapper'>
        {loadingJsx}


        <div className='category-heading'>
            <h4 className='m-2'>
                Edit Category
            </h4>
        </div>
       


        <div className='client-category-container'>
              <form onSubmit={handleSubmit}>
              
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                          <button className="nav-link active" id="category-tab" data-bs-toggle="tab" data-bs-target="#category-tab-pane" type="button" role="tab" aria-controls="category-tab-pane" aria-selected="true">Home</button>
                      </li>
                  </ul>

                  <div className="tab-content" id="myTabContent">
                      <div className="tab-pane fade show active" id="category-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">     
                          <div className='form-group m-3'>
                                    <div className='col-lg-6'>
                                      <label class="form-label">Category Name</label>
                                      <input type="text" name='category_name' onChange={handleEditData} value={categoryRetrievedData ? categoryRetrievedData.category_name : ''} className="form-control" />
                                      
                                    </div>
                                     
                                     <div className='col-lg-6'>
                                        <label for="exampleInputPassword1" class="form-label">Slug</label>
                                        <input type="text" name='slug' onChange={handleEditData} value={categoryRetrievedData ? categoryRetrievedData.slug : ''} className="form-control"/>
                                      
                                     </div>
                                    
                                    <div className='col-lg-6'>
                                        <label for="exampleInputPassword1" class="form-label">Description</label>
                                        <textarea name='description' onChange={handleEditData} value={categoryRetrievedData ? categoryRetrievedData.description : ''}   className='form-control' ></textarea>                       
                                    </div>   

                          </div>

                          <button className='btn btn-outline-primary m-3' type='submit'>Update Category</button>
                      </div>
                  </div>
                  
              </form>
        </div>




          

    </div>

         

   
  )
}
