import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';

// This component is dealing with
// adding categories
// view categories
// and handling delete categories


export const AddClients = () => {

    const userData = JSON.parse(localStorage.getItem('auth_user'));
    const token = userData.token;

    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [reloader, setReloader] = useState(false);

    const [categoryData, setCategoryData] = useState();
    const [clientData, setClientData] = useState({
        business_type: '',
        client_name: '',
        business_name: '',
        phone: '',
        location: ''
      });

    const [clientRetrievedData, setClientRetrievedData] = useState(); 

    useEffect(()=>{
        setLoading(true);

        axios.get('sanctum/csrf-cookie')
        .then(response => {
            axios.get('api/admin/view-category', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                setCategoryData(res.data);
                setLoading(false);            
            })
            .catch((error) => {
                console.error('Error retrieving category data:', error);
            });
        })
        .catch((error) => {
            console.error('Error getting CSRF token:', error);
        });

    },[])

    // useEffect for clientDataRetrieval
    useEffect(()=>{

        axios.get('sanctum/csrf-cookie')
        .then(response => {
            axios.get('api/admin/view-client', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                setClientRetrievedData(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error retrieving client data:', error);
            });
        })
        .catch((error) => {
            console.error('Error getting CSRF token:', error);
        });

    },[reloader])

    function reloadEffect () {
        setLoading(false);
        let newState = true;

        setReloader((prevState) => {
                newState = newState !== prevState.abc;
             return (
                {...prevState, abc:newState}
             ) 
        })
    }   

    const handleClients = (event) => {
        const {name, value} = event.target;
        setClientData({...clientData, [name]:value});
    }

    const handleForm = (e) => {
        setLoading(true);
        
        e.preventDefault();
        
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('api/admin/add-client',clientData, {
                headers:{
                    authorization: `Bearer ${token}`
                }
            }).then((res)=>{
                if(res.data.status === 200){
                    
                    setClientData({
                        business_type: '',
                        client_name: '',
                        business_name: '',
                        phone: '',
                        location: ''
                    });

                    setLoading(false);
                    
                    Swal.fire({
                        title: "Success",
                        text: "Client Added Successfully",
                        icon: "success"
                      });
                }else{
                    setLoading(false);
                    setError(res.data);
                    Swal.fire({
                        icon:'error',
                        title: "Opp's Something went wrong",
                        text: "Please fill the fields correctly",
                        icon: "Warning"
                      });
                }
                

            }).catch((error)=>{
                console.log(error + 'error on storing category data')
            })
        }).catch((error)=>{
            console.log(error + 'error on getting csrf token');
        });

    }

    const handleDelete = (id) =>{

        axios.get('sanctum/csrf-cookie').then(response => {
            axios.get(`api/admin/delete-client/${id}`, {
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
                    reloadEffect();
                    setLoading(false);

                    Swal.fire({
                        title: "Item deleted",
                        text: res.data.message,
                        icon: "success"
                    });                 
                }    
            }).catch((error)=>{
                console.log(error + 'error on deleting category data')
            })
        }).catch((error)=>{
            console.log(error + 'error on getting csrf token');
        });
    }

    console.log(clientRetrievedData);

    let loadingJsx = '';

    if(loading){
        return loadingJsx = (
            <div>
                <h3>Loading..</h3>
            </div>
        ) 
    }

    let selectCategory = '';
    
    if(categoryData){
        selectCategory = categoryData.map((prevData)=>{
            return (               
                <option value={prevData.id} key={prevData.id} >{prevData.category_name}</option>             
            )
        })
    }   
    
    let viewData = '';
    
    if(clientRetrievedData){

        viewData = clientRetrievedData.map((items, i) => {
            return (
                <tr key={items.id}>
                    <td>{i}</td>
                    <td>
                        <img className='clientViewProfile' src='https://m.media-amazon.com/images/M/MV5BZTZjNjUyN2QtNWZlNC00ODYyLTg2YjctNjQwNzFhNDk5ODgzXkEyXkFqcGdeQXVyNzUyODA1NDk@._V1_QL75_UX820_.jpg' alt='profileImg' />
                    </td>
                    <td>{items.client_name}</td>
                    <td>{items.business_name}</td>
                    <td>{items.phone}</td>
                    <td>{items.location}</td>
                    <td>
                        <Link to={`/admin/edit-clients/${items.id}`} className='btn btn-sm btn-outline-primary'>Edit</Link>
                    </td>
                    <td>
                        <Link className='btn btn-sm btn-outline-danger' onClick={()=>handleDelete(items.id)}>Delete</Link>
                    </td>
                </tr>
            )
        })   
    }

  
    return (

    <div className='client-category-wrapper'>
       
        {loadingJsx}

        <div className='category-heading'>
            <h4 className='m-2'>
                Add Clients
            </h4>
        </div>
       


        <div className='client-category-container'>
              <form onSubmit={handleForm} >
              
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                          <button className="nav-link active" id="category-tab" data-bs-toggle="tab" data-bs-target="#category-tab-pane" type="button" role="tab" aria-controls="category-tab-pane" aria-selected="true" onClick={reloadEffect}>Home</button>
                      </li>
                      <li className="nav-item" role="presentation">
                          <button className="nav-link" id="view-tab" data-bs-toggle="tab" data-bs-target="#view-tab-pane" type="button" role="tab" aria-controls="view-tab-pane" aria-selected="true" onClick={reloadEffect} >View Clients</button>
                      </li>
                  </ul>

                  <div className="tab-content" id="myTabContent">

                      <div className="tab-pane fade show active" id="category-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">     
                          <div className='form-group m-3'>

                                    <div className='col-lg-6 mb-3'>
                                      <label class="form-label">Choose Business Type</label>
                                     
                                      <select class="form-select" onChange={handleClients} name='business_type'>
                                        <option value=''>Business Type</option>
                                        {selectCategory}
                                      </select>    
                                       <span>{error ? error.business_type : ''}</span>
                                    </div>

                                    <div className='col-lg-6 mb-3'>
                                      <label class="form-label">Client Name</label>
                                      <input type="text" name='client_name' onChange={handleClients} className="form-control" />
                                      <span>{error ? error.client_name : ''}</span>
                                    </div>

                                    <div className='col-lg-6 mb-3'>
                                      <label class="form-label">Business Name</label>
                                      <input type="text" name='business_name' onChange={handleClients} className="form-control" />
                                      <span>{error ? error.business_name : ''}</span>
                                    </div>
                                     
                                     <div className='col-lg-6 mb-3'>
                                        <label for="exampleInputPassword1" class="form-label">Phone</label>
                                        <input type="text" name='phone' onChange={handleClients}  className="form-control"/>
                                        <span>{error ? error.phone : ''}</span>
                                     </div>
                                    

                                     <div className='col-lg-6 mb-3'>
                                        <label for="exampleInputPassword1" class="form-label">Location</label>
                                        <input type="text" name='location' onChange={handleClients}  className="form-control"/>
                                        <span>{error ? error.location : ''}</span>
                                     </div>

                          </div>

                          <button className='btn btn-outline-primary m-3' type='submit'>Add Client</button>
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
                                                <th scope="col">Profile</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Business</th>
                                                <th scope="col">Number</th>
                                                <th scope="col">Location</th>
                                                <th scope="col">Edit</th>
                                                <th scope="col">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {viewData}
                                    
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
