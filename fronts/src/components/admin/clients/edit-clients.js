import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export const EditClients = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const userData = JSON.parse(localStorage.getItem('auth_user'));
    const token = userData.token;

    const [loading, setLoading] = useState(null);

    const [clientRetrievedData, setClientData] = useState();


    // retrieving clientData
    useEffect(()=>{
        setLoading(true);
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.get(`api/admin/edit-client/${id}`,{
                headers:{
                    authorization: `Bearer ${token}`
                }
            }).then((res)=>{ 
                setClientData(res.data);
                setLoading(false);

            }).catch((error)=>{
                console.log(error + 'error on fetching user data')
            })
        }).catch((error)=>{
            console.log(error + 'error on getting csrf token');
        });
    },[]);

    
    let selectedCategoryName = '';
    useEffect(() => {
        findCategoryName(selectedCategoryName);
    });



    function findCategoryName() {
        let id;
        let data;
        let oldCatName;

        if(clientRetrievedData && clientRetrievedData.clientData){
            id = clientRetrievedData.clientData.category_id;

            data = clientRetrievedData.categoryData.filter((items) => items.id == id);

            if(data.length >= 0){
                oldCatName = data[0].category_name;
            }

            return oldCatName;

            // console.log(oldCatName + 'category');
           
            // console.log(data);
        }
        // Add your logic to find the category name here
    }


    const handleClient = (event) => {
        
            const {name, value} = event.target;
            setClientData((prevData) => {
                console.log(prevData);
                return (
                    {
                        ...prevData,
                        clientData:{
                            ...prevData.clientData,
                            [name]:value
                        }

                    }
                )   
            });
    }

    console.log(clientRetrievedData);



    const handleSubmit = (event) => {
        
        setLoading(true);
        event.preventDefault();

        console.log(clientRetrievedData.clientData);

        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post(`api/admin/update-client/${id}`, clientRetrievedData.clientData, {
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

                    navigate('/admin/add-clients');
                  
                } else{
                    setLoading(false);
    
                     Swal.fire({
                        title: "Success",
                        text: "Category Updated Successfully",
                        icon: "success"
                      });

                    navigate('/admin/add-clients')
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

    let categoryData = '';
    if(clientRetrievedData && clientRetrievedData.categoryData){
        categoryData = clientRetrievedData.categoryData.map((items,i)=>{
            return <option value={items.id} key={items.id}>{items.category_name}</option>
        }) 
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
              <form onSubmit={handleSubmit} >
              
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                          <button className="nav-link active" id="category-tab" data-bs-toggle="tab" data-bs-target="#category-tab-pane" type="button" role="tab" aria-controls="category-tab-pane" aria-selected="true">Home</button>
                      </li>
                  </ul>

                  <div className="tab-content" id="myTabContent">
                      <div className="tab-pane fade show active" id="category-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">     
                          <div className='form-group m-3'>
                                    <div className='col-lg-6 mb-3'>
                                      <label class="form-label">Choose Business Type</label>
                                     
                                      <select class="form-select"  name='business_type' onChange={handleClient}>
                                        <option defaultValue={'a'} key={'a'}>{findCategoryName()}</option>
                                            {categoryData}
                                      </select>    
                                      
                                    </div>

                                    <div className='col-lg-6 mb-3'>
                                      <label class="form-label">Client Name</label>
                                      <input type="text" value={clientRetrievedData && clientRetrievedData.clientData ? clientRetrievedData.clientData.client_name : ''} name='client_name' onChange={handleClient} className="form-control" />
                                    
                                    </div>

                                    <div className='col-lg-6 mb-3'>
                                      <label class="form-label">Business Name</label>
                                      <input type="text" value={clientRetrievedData && clientRetrievedData.clientData ?  clientRetrievedData.clientData.business_name : ''} onChange={handleClient} name='business_name' className="form-control" />
                                     
                                    </div>
                                     
                                     <div className='col-lg-6 mb-3'>
                                        <label for="exampleInputPassword1" class="form-label">Phone</label>
                                        <input type="text" value={clientRetrievedData && clientRetrievedData.clientData ? clientRetrievedData.clientData.phone : ''} onChange={handleClient} name='phone'  className="form-control"/>
                                       
                                     </div>
                                    

                                     <div className='col-lg-6 mb-3'>
                                        <label for="exampleInputPassword1" class="form-label">Location</label>
                                        <input type="text" value={clientRetrievedData && clientRetrievedData.clientData ? clientRetrievedData.clientData.location : ''} onChange={handleClient} name='location' className="form-control"/>
                                        
                                     </div>


                          </div>

                          <button className='btn btn-outline-primary m-3' type='submit'>Update Client</button>
                      </div>
                  </div>
                  
              </form>
        </div>




          

    </div>

         

   
  )
}
