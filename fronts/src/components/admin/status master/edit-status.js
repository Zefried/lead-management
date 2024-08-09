import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

// This component is dealing with
// adding categories
// view categories
// and handling delete categories


export const EditStatusMaster = () => {
    
    const {id} = useParams();
    const navigate = useNavigate();

    const userData = JSON.parse(localStorage.getItem('auth_user'));
    const token = userData.token;
    const [error, setError] = useState();

    const [loading, setLoading] = useState();
    const [statusData, setStatusData] = useState();


    const handleStatus = (event) => {
        const {name, value} = event.target;
        setStatusData((prevData)=>{
            return(
                {...prevData, [name]:value}
            )
        })
    }

    const handleSubmit = (event) => {
        setLoading(true);
        event.preventDefault();

        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post(`api/admin/update-status/${id}`, statusData, {
                headers:{
                    authorization: `Bearer ${token}`
                }
            }).then((res)=>{
                if(res.data.status === 200){
                    setLoading(false);  
                    console.log(res.data);

                    Swal.fire({
                        title: "Success",
                        text: "Your status is updated Successfully",
                        icon: "success"
                      });

                    navigate('/admin/add-status')

                }else {
                    setLoading(false);
                    setError(res.data.message);

                    Swal.fire({
                        icon:'error',
                        title: "Opp's Something went wrong",
                        text: error,
                        icon: "Warning"
                      });
                }

            }).catch((error)=>{
                setLoading(false);
                console.log(error + 'error on storing status name')
            })
        }).catch((error)=>{
            console.log(error + 'error on getting csrf token');
        });
    }

    // retrieving status master
    useEffect(()=>{

        setLoading(true);
            axios.get('sanctum/csrf-cookie').then(response => {
                axios.get(`api/admin/edit-status/${id}`,{   
                    headers:{
                        authorization: `Bearer ${token}`
                    }
                }).then((res)=>{
                    setStatusData(res.data);
                    setLoading(false);

                }).catch((error)=>{
                    setLoading(false);
                    console.log(error + 'error on fetching status data')
                })
            }).catch((error)=>{
                console.log(error + 'error on getting csrf token');
            });
    },[]);

    console.log(error);
    // working with custom jsx

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
               Edit Status
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
                                      <label class="form-label">Status Name</label>
                                      <input type="text" name='status_name' onChange={handleStatus} value={statusData ? statusData.status_name :''} className="form-control" />
                                    
                                    </div>                                
                          </div>

                          <button className='btn btn-outline-primary m-3' type='submit'>Update Status</button>
                      </div>

                  </div>
                  
              </form>
        </div>




          

    </div>

         

   
  )
}
