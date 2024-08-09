import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../../Layouts/Admin/adminStyle.css';

// This component is dealing with
// adding categories
// view categories
// and handling delete categories


export const StatusMaster = () => {

    const userData = JSON.parse(localStorage.getItem('auth_user'));
    const token = userData.token;

    const [loading, setLoading] = useState();
    const [deleteLoad, setDeleteLoad] = useState();
    const [reload, setReload] = useState(false);
   
    const [statusInput, setStatus] = useState({
        status_name: '',
        error:[],
    });
    const [statusViewData, setStatusView] = useState();

    const handleReload = () => {
        setReload(prevState => {
            const newState = !prevState;
            // console.log(newState);
            return newState;
        });
    };

    const handleStatus = (event) => {
        const {name, value} = event.target;
        setStatus({...statusInput, [name]:value});
    }

    const handleSubmit = (event) => {
        setLoading(true);
        event.preventDefault();

        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('api/admin/add-status',statusInput, {
                headers:{
                    authorization: `Bearer ${token}`
                }
            }).then((res)=>{
                if(res.data.status === 200){
                    setLoading(false);
                    
                    setStatus({
                        status_name:'',
                    });

                    Swal.fire({
                        title: "Success",
                        text: "Your status is created Successfully",
                        icon: "success"
                      });

                }else {
                    setLoading(false);
                    
                    setStatus({...statusInput, error:res.data});

                    Swal.fire({
                        icon:'error',
                        title: "Opp's Something went wrong",
                        text: "Please fill the fields correctly",
                        icon: "Warning"
                      });
                }

            }).catch((error)=>{
                console.log(error + 'error on storing status name')
            })
        }).catch((error)=>{
            console.log(error + 'error on getting csrf token');
        });
    }

    const handleDelete = (id) =>{
       setDeleteLoad(true)
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.get(`api/admin/delete-status/${id}`, {
                headers:{
                    authorization: `Bearer ${token}`
                }
            }).then((res)=>{
                
                if(res.data.status === 400){
                    setLoading(false);
                    
                    Swal.fire({
                        icon: "error",
                        title: "Opp's something went wrong",
                        text: res.data.message,
                        icon: "warning"
                    });
                   
                } else{
                    handleReload();
                    setDeleteLoad(false);              
                }    
            }).catch((error)=>{
                console.log(error + 'error on deleting status master')
            })
        }).catch((error)=>{
            console.log(error + 'error on getting csrf token');
        });
    }

    // retrieving status master
    useEffect(()=>{
            axios.get('sanctum/csrf-cookie').then(response => {
                axios.get('api/admin/view-status',{   
                    headers:{
                        authorization: `Bearer ${token}`
                    }
                }).then((res)=>{
                    setStatusView(res.data.data);
                    setLoading(false);

                }).catch((error)=>{

                    setLoading(false);
                    console.log(error + 'error on fetching status data')
                })
            }).catch((error)=>{
                console.log(error + 'error on getting csrf token');
            });
    },[reload]);


    // working with custom jsx

    let loadingJsx = '';
    if(loading){

        return loadingJsx = (
            <div>
                <h3>Loading..</h3>
            </div>
           )    
    }

    let statusViewJsx = '';    
    if(statusViewData){
        statusViewJsx = statusViewData.map((items, i)=>{
            return (
                <tr key={items.id}>
                    <td>{i}</td>
                    <td>{items.status_name}</td>
                    <td>
                        <Link to={`/admin/edit-status/${items.id}`} className='btn btn-sm btn-outline-primary'>Edit</Link>
                    </td>
                    <td>
                        <Link className='btn btn-sm btn-outline-danger' onClick={() => handleDelete(items.id)}>Delete</Link>
                    </td>
                
                </tr>
            )
        })
    }

    let deleteJsx = '';
    if(deleteLoad){
        deleteJsx = (
            <div className='d-flex'>
                <div class="spinner-border text-warning" role="status">
                </div>
                <p className='px-3'>Deleting...</p>
            </div>
        )
    }


  
    return (

    <div className='client-category-wrapper'>
        {loadingJsx}


        <div className='category-heading'>
            <h4 className='m-2'>
                Add Status 
            </h4>
        </div>
       


        <div className='client-category-container'>
            {deleteJsx}
              <form onSubmit={handleSubmit}>
              
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                          <button className="nav-link active" id="category-tab" data-bs-toggle="tab" data-bs-target="#category-tab-pane" type="button" role="tab" aria-controls="category-tab-pane" aria-selected="true" onClick={()=> handleReload()}>Home</button>
                      </li>
                      <li className="nav-item" role="presentation">
                          <button className="nav-link" id="view-tab" data-bs-toggle="tab" data-bs-target="#view-tab-pane" type="button" role="tab" aria-controls="view-tab-pane" aria-selected="true" onClick={()=> handleReload()} >View Available Status</button>
                      </li>
                  </ul>

                  <div className="tab-content" id="myTabContent">

                      <div className="tab-pane fade show active" id="category-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">     
                          <div className='form-group m-3'>
                                    <div className='col-lg-6'>
                                      <label class="form-label">Status Name</label>
                                      <input type="text" name='status_name' onChange={handleStatus} className="form-control" />
                                      <span>{statusInput && statusInput.error ? statusInput.error.status_name : ''}</span>
                                    </div>                                
                          </div>

                          <button className='btn btn-outline-primary m-3' type='submit'>Add Status</button>
                      </div>

                      <div className="tab-pane fade show" id="view-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">     
                          <div className='form-group m-3'>

                          <div className='category-view'>
                            <div className='container px-4'>

                                    <div className='card-body'>
                                    <table class="table">
                                        <thead class="thead-dark">
                                            <tr>
                                            <th scope="col">S.no</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Edit</th>
                                            <th scope="col">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {statusViewJsx}
                                        </tbody>
                                        </table>
                                    </div>
                           
                            </div>
                          </div>

                          </div>
                      </div>

                  </div>
                  
              </form>
        </div>




          

    </div>

         

   
  )
}
