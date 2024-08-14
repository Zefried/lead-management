import React, { startTransition } from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../../Layouts/Admin/adminStyle.css';

export const ViewFollowUp = () => {

    const userData = JSON.parse(localStorage.getItem('auth_user'));
    const token = userData.token;
    const [loading, setLoading] = useState(false);
    
    const [reload, setReload] = useState({
        newState:false,
    });

    const [viewFollowUp, setViewFollowUp] = useState({
        status: [],
        data:[],
    })

    const [followUpStatus, setFollowUpStatus] = useState()

    
    useEffect(()=>{
        setLoading(true);

        axios.get('sanctum/csrf-cookie')
        .then(response => {
            axios.get(`api/admin/fetch-status-master`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                if(res.data.status == 200){
                   setFollowUpStatus(res.data.statusData);
                   setLoading(false);
                }else if(res.data.status == 500){

                    Swal.fire({
                        title: "Opps",
                        text: res.data.message,
                        icon: "warning"
                    });
                    setLoading(false);
                }
           
            })
            .catch((error) => {
                setLoading(false);
                console.error('Error retrieving status master Data:', error);
            });
        })
        .catch((error) => {
            setLoading(false);
            console.error('Error getting CSRF token:', error);
        });
    },[reload]);

    useEffect(()=>{
        setLoading(true);

        axios.get('sanctum/csrf-cookie')
        .then(response => {
            axios.get(`api/admin/view-followup`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                if(res.data.status == 200){

                    // console.log(res.data);
                    setViewFollowUp((prevData)=>(
                        {...prevData, 
                            status:res.data.status,
                            data:res.data.items, 
                        }
                    ))

                    setLoading(false);
                }else if(res.data.status == 500){

                    Swal.fire({
                        title: "Opps",
                        text: res.data.message,
                        icon: "warning"
                    });
                    setLoading(false);
                }
           
            })
            .catch((error) => {
                setLoading(false);
                console.error('Error retrieving followUp Data:', error);
            });
        })
        .catch((error) => {
            setLoading(false);
            console.error('Error getting CSRF token:', error);
        });
    },[token, reload]);

    function reloadFunction() {

        setReload((prevState) => {
            // Toggle the newState boolean value
            let newState = !prevState.newState;
            return {
                ...prevState,  // Spread the previous state (if there are other properties)
                newState       // Update the newState property with the toggled value
            };
        });
        
    }


    const handleDelete = (id) =>{

        axios.get('sanctum/csrf-cookie')
        .then(response => {
            axios.get(`api/admin/delete-followups/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                if(res.data.status == 200){
                    reloadFunction();
                    // console.log(res.data);
                    setLoading(false);
                }else if(res.data.status == 500){

                    Swal.fire({
                        title: "Opps",
                        text: res.data.message,
                        icon: "warning"
                    });
                    setLoading(false);
                }
           
            })
            .catch((error) => {
                setLoading(false);
                console.error('Error on deleting followUp Data:', error);
            });
        })
        .catch((error) => {
            setLoading(false);
            console.error('Error getting CSRF token:', error);
        });
    }


    const handleStatusChange = (e) => {
        const { value } = e.target;

        let statusId = [] // we don't need the status_id but am retrieving it for testing array.from below
        const selectElement = e.target;
        const followUpId = selectElement.dataset.followup;

        // console.log(followUpId)
    
        Array.from(e.target.selectedOptions).forEach((items) => {
            let status_id = items.getAttribute('data-id');
            statusId.push(status_id);

            // console.log(items);
            // options to add more custom attributes, eg: we have data-x for created at
            // eg let cd = items.getAttribute('data-x');
        })
      
        let statusChangeData = {
            id: followUpId,
            status_name: value,
            status_id:statusId,
        }
        
        if(statusChangeData){
            postStatusChangeData(statusChangeData);
        }

    } 

    function postStatusChangeData(statusChangeData){

        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post(`api/admin/update-followup-status`, statusChangeData, {
                headers:{
                    authorization: `Bearer ${token}`
                }
            }).then((res)=>{
                console.log(res.data.status);

                if(res.data.status === 200){
                     alert(res.data.message);

                } else if(res.data.status === 500) {
                    Swal.fire({
                        title: "Opps",
                        text: res.data.message,
                        icon: "warning"
                    });
                }
                setLoading(false);
            }).catch((error)=>{
                setLoading(false);
                console.log(error + 'error on updating followUp status')
            })
        }).catch((error)=>{
            setLoading(false);
            console.log(error + 'error on getting csrf token');
        });

    }
  

    let loadingJsx = '';
    
    if(loading){
        loadingJsx = (
            <div>
                <h3>Loading..</h3>
            </div>
        )     
    }

    let statusJsx = '';
    if (followUpStatus) {
        statusJsx = followUpStatus.map((items) => (
            <option key={items.id} value={items.status_name} data-id={items.id}  data-x={items.created_at}>{items.status_name}</option>
        ))
    }

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    let followUpTable = '';
    if (viewFollowUp && viewFollowUp.data) {
        // console.log(viewFollowUp.data);
        
        let followUpRows = []
        let globalIndex = 1; 

        viewFollowUp.data.forEach((items) => {
            
            items.follow_ups.forEach((followUp) => {
               followUpRows.push(
                <tr key={followUp.id}>
                    <td>{globalIndex }</td>
                    <td>{followUp.event_title}</td>
                    <td>{items.client_name}</td>
                    <td>{items.phone}</td>
                    <td>{formatDate(followUp.start_date)}</td>
                    <td>
                        <div className="remark-cell">
                            {followUp.remarks}
                        </div>
                    </td>
                    <td>{items.location}</td>
                    <td>
                        <select key={followUp.id} data-followup={followUp.id} class="form-select" aria-label="Default select example" onChange={handleStatusChange}>
                            <option key={followUp.id} value={followUp.status}>{followUp.status}</option> 
                            {statusJsx}
                        </select>

                    </td>

                    <td>
                        <Link className='btn btn-outline-primary' to={`/admin/edit-followup/${followUp.id}`}>Edit</Link>
                    </td>
                    
                    <td>
                        <Link className='btn btn-outline-danger' onClick={()=>handleDelete(followUp.id)} >Delete</Link>
                    </td>
                </tr>
               )

               globalIndex++;
            })

        })

        followUpTable = followUpRows;
      
    }

    
   





  return (
    <div className='client-followUp-wrapper'>
       

    <div className='followUp-heading'>
        <h4 className='m-2'>
          Follow-Up List
        </h4>
        {loadingJsx}

    </div>
    

    <div className='client-followUp-container'>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
                <button className="nav-link active" id="category-tab" data-bs-toggle="tab" data-bs-target="#category-tab-pane" type="button" role="tab" aria-controls="category-tab-pane" aria-selected="true">Data</button>
            </li>
        </ul>

        <div className="tab-content" id="myTabContent">
            <div className='followup-filter'>
                <div class="search-box">
                    <div class="search">
                        <div class="search-form">
                            <form role="search"><input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            </form>
                        </div>

                        <div class="search-btn">
                            <button class="btn"> <i class="bi bi-search"></i></button>
                        </div>
                    </div>
                </div>            

                <div className='follow-up-filter-box'>
                    <div className='follow-up-filter-btn'>
                        <i class="bi bi-funnel"></i>
                    </div>

                    {/* <div className='filter-card'>
                        <div className='follow-up-filter-option'>
                            <ul>
                                <li>
                                    <Link className="customData">Custom Date</Link>
                                </li>
                                <li>
                                    <Link className="customData">Today</Link>
                                </li> 

                                <li>
                                    <Link className="customData">Weekly</Link>
                                </li>
                            </ul>
                        </div>
                    </div> */}
                               
                </div>
            </div>

        
            <div className='followupTable'>
                <table className="table align-middle m-2 bg-white followupTable">
                    <thead className="bg-light">
                        <tr className='nnbb'>
                            <th scope="col">S.no</th>
                            <th scope="col">Event</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Date | Time</th>
                            <th scope="col">Remarks</th>
                            <th scope="col">Location</th>
                            <th scope="col">Status</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>  
                        {followUpTable}
                    </tbody>
            </table>
            </div>
            

        </div>
    </div>


    </div>
  )
}
