import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

// This component is dealing with
// adding categories
// view categories
// and handling delete categories


export const AddFollowUp = () => {

    const userData = JSON.parse(localStorage.getItem('auth_user'));
    const token = userData.token;
    const email = userData.email;

    const {id} = useParams();

    const [loading, setLoading] = useState();

    const [clientData, setClientData] = useState(null);

    const [event, setEvent] = useState({
        title:'',
        start: '',
        end: '',
        description: '',
        location:'',
    });
   
    console.log(event);
    
    function minDate() {
        let now = new Date();
        let year = now.getFullYear();
        let month = String(now.getMonth() + 1).padStart(2, '0');
        let day = String(now.getDate()).padStart(2, '0');
        let hours = String(now.getHours()).padStart(2, '0');
        let minutes = String(now.getMinutes()).padStart(2, '0');
    
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }


    useEffect(()=>{

        axios.get('sanctum/csrf-cookie')
        .then(response => {
            axios.get(`api/admin/edit-client/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                setClientData(res.data.clientData);
                setLoading(false);
               
            })
            .catch((error) => {
                console.error('Error retrieving client data:', error);
            });
        })
        .catch((error) => {
            console.error('Error getting CSRF token:', error);
        });
    },[]);

    const handleChange = (e) => {

        const { name, value } = e.target;
        setEvent({ ...event, [name]: value });
    };
    
    const handleSubmit = (e) => {
        setLoading(true);
        
        e.preventDefault();
        
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('api/admin/add-followup', event, {
                headers:{
                    authorization: `Bearer ${token}`
                }
            }).then((res)=>{
                console.log(res.data.original.id);
                setLoading(false);
            }).catch((error)=>{
                setLoading(false);
                console.log(error + 'error on storing category data')
            })
        }).catch((error)=>{
            setLoading(false);
            console.log(error + 'error on getting csrf token');
        });

    }

    

    let loadingJsx = '';
        if(loading){

        return loadingJsx = (
            <div>
                <h3>Loading..</h3>
            </div>
        ) 
            
    }


        return (
            <div>
              
                <div className='category-heading'>
                    <h4 className='m-2'>
                        Set Follow-up
                    </h4>
                </div>
                <div className=" m-3 followup-card-wrapper" style={{width: '18rem'}}>

                    <img src="https://img.republicworld.com/rimages/bdtnaabdyxlki0vb_1683274977_16_9.jpeg" className="card-img-top m-3" alt="..." style={{height:'40px', width:'40px'}} />
                    
                    <div className="followUp-card">         
                            <p className='fu-text'>Client Name : {clientData ? clientData.client_name : ''}</p>
                            <p className='fu-text'>Phone : {clientData ? clientData.phone : ''}</p>
                            <p className='fu-text'>Location : {clientData ? clientData.location : ''}</p>
                    </div>
                </div>

              


                <form onSubmit={handleSubmit}>
                    <div className="m-3 col-lg-4">
                        <label>Event Title</label>
                        <input className="form-control" type="text" name="title" value={event.title} onChange={handleChange}/>
                    </div>

                    <div className="m-3 col-lg-4">
                        <label>Start:</label>
                        <input className="form-control" type="datetime-local" name="start" value={event.start}  min={minDate()}  onChange={handleChange}/>
                    </div>
                    <div className="m-3 col-lg-4"> 
                        <label>End:</label>
                        <input  className="form-control" type="datetime-local" name="end" value={event.end} min={minDate()} onChange={handleChange}/>
                    </div>
                    <div className="m-3 col-lg-4">
                        <label>Remarks:</label>
                        <textarea  className="form-control" name="description" value={event.description} onChange={handleChange}/>
                    </div>

                    <div className="m-3 col-lg-4">
                        <label>Client Location:</label>
                        <input  className="form-control" type="text" name="location" value={event.location} onChange={handleChange}/>
                    </div>
                    <button className='m-3 btn btn-md btn-outline-primary' type="submit">Add Event</button>
                </form>

            </div>
           
        );


}
