import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

// This component is dealing with
// adding categories
// view categories
// and handling delete categories


export const EditFollowUp = () => {

    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('auth_user'));
    const token = userData.token;

    const {id} = useParams();

    const [loading, setLoading] = useState();

    const [clientData, setClientData] = useState();
    const [followUp, setFollowUpData] = useState();


    useEffect(()=>{

        axios.get('sanctum/csrf-cookie')
        .then(response => {
            axios.get(`api/admin/edit-followups/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {

                if(res.data.status === 200){

                    console.log(res.data);
                    
                    setClientData(res.data.client);
                    setFollowUpData(res.data.followUp);

                }else if(res.data.status === 500){
                    Swal.fire({
                        title: "Opps",
                        text: res.data.message + ', please create a new follow-up',
                        icon: "warning"
                    });
                } else{

                    Swal.fire({
                        title: "Opps",
                        text: res.data.error + ', please create a new follow-up',
                        icon: "warning"
                    });
                   
                }

                setLoading(false);    
            })
            .catch((error) => {
                setLoading(false);
                console.error('Error retrieving client data:', error);
            });
        })
        .catch((error) => {
            setLoading(false);
            console.error('Error getting CSRF token:', error);
        });
    },[]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        if(followUp){
            setFollowUpData((prevData)=>(
               {...prevData,[name]:value}
            ))
        }

    };


    const handleSubmit = (e) => {
        setLoading(true);
        
        e.preventDefault();
        
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post(`api/admin/update-followups/${id}`, followUp, {
                headers:{
                    authorization: `Bearer ${token}`
                }
            }).then((res)=>{
                if(res.data.status === 200){
                    setLoading(false);
                    navigate('/admin/view-followup')
                } else {
                    Swal.fire({
                        title: "Opps",
                        text: res.data.error + ', please create a new follow-up',
                        icon: "warning"
                    });
                }

                setLoading(false);
            }).catch((error)=>{
                setLoading(false);
                console.log(error + 'error on updating followUp data')
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
                        Edit Follow-ups
                    </h4>
                </div>

                <div className=" m-3 followup-card-wrapper" style={{width: '18rem'}}>

                    <img src="https://img.republicworld.com/rimages/bdtnaabdyxlki0vb_1683274977_16_9.jpeg" className="card-img-top m-3" alt="..." style={{height:'40px', width:'40px'}} />
                    
                    <div className="followUp-card">         
                            <p className='fu-text'>Client Name :{clientData ? clientData.client_name : '' }</p>
                            <p className='fu-text'>Phone : {clientData ? clientData.phone : '' }</p>
                            <p className='fu-text'>Location : {clientData ? clientData.location : '' }</p>
                    </div>
                </div>

              


                <form onSubmit={handleSubmit}>
                    <div className="m-3 col-lg-4">
                        <label>Event Title</label>
                        <input className="form-control" type="text" name="event_title" value={followUp ? followUp.event_title : ''} onChange={handleChange}/>
                       
                    </div>
                    
                    <div className="m-3 col-lg-4">
                        <label>Remarks:</label>
                        <textarea  className="form-control" name="remarks"  value={followUp ? followUp.remarks : ''} onChange={handleChange}/>
                        
                    </div>

                    <div className="m-3 col-lg-4">
                        <label>Client Location:</label>
                        <input  className="form-control" type="text" name="location"  value={followUp ? followUp.location : ''} onChange={handleChange}/>
                        
                    </div>

                    <button className='m-3 btn btn-md btn-outline-primary' type="submit">Update Event</button>
                </form>

            </div>        
        );


}
