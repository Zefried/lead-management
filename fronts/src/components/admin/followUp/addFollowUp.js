import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

// This component is dealing with
// adding categories
// view categories
// and handling delete categories


export const AddFollowUp = () => {

    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('auth_user'));
    const token = userData.token;
    const email = userData.email;

    const {id} = useParams();

    const [loading, setLoading] = useState();

    const [clientData, setClientData] = useState(null);

    const [event, setEvent] = useState({
        title:'',
        start: '',
        description: '', 
    });
   
    const postData = {event:event, id:id, email:email}

    const [serverStatus, setServerStatus] = useState({
        error:[],
        data:[],
    })
    
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
        // logic is when name is start, it updates both start and end but if not still updating other data on state
        const { name, value } = e.target;
        if (name === 'start') {
            setEvent({ ...event, [name]: value, end: value });
        } else {
            setEvent({ ...event, [name]: value });
        }
            
    };


    console.log(event);


    const handleSubmit = (e) => {
        setLoading(true);
        
        e.preventDefault();
        
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('api/admin/add-followup', postData, {
                headers:{
                    authorization: `Bearer ${token}`
                }
            }).then((res)=>{

                if(res.data.original.status === 201){

                    setServerStatus((prevState) => ({
                        ...prevState, // Spread the previous state
                        data: res.data.original?.item || [], // Update the data field
                        error: res.data.error || prevState.error, // Update error if available, otherwise keep previous
                    })); 

                    Swal.fire({
                        title: "Successful",
                        text: res.data.original.messages,
                        icon: "success"
                    });

                    navigate('/admin/view-followup')
                    setLoading(false);
                } else if(res.data.status === 401){
                    Swal.fire({
                        title: "Failed",
                        text: res.data.messages,
                        icon: "Warning"
                    });

                }

             
            }).catch((error)=>{
                setLoading(false);
                console.log(error + 'error on storing category data')
            })
        }).catch((error)=>{
            setLoading(false);
            console.log(error + 'error on getting csrf token');
        });

    }

    if(serverStatus){
        console.log(serverStatus);
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
                        <span>{serverStatus.error ? serverStatus.error.title : ''}</span>
                    </div>

                    <div className="m-3 col-lg-4">
                        <label>Start:</label>
                        <input className="form-control" type="datetime-local" name="start" value={event.start}  min={minDate()}  onChange={handleChange}/>
                        <span>{serverStatus.error ? serverStatus.error.start : ''}</span>
                    </div>

                    
                    <div className="m-3 col-lg-4">
                        <label>Remarks:</label>
                        <textarea  className="form-control" name="description" value={event.description} onChange={handleChange}/>
                        <span>{serverStatus.error ? serverStatus.error.description : ''}</span>
                    </div>

                    <button className='m-3 btn btn-md btn-outline-primary' type="submit">Add Event</button>
                </form>

            </div>        
        );


}
