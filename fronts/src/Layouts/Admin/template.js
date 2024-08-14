import React, { useEffect } from 'react'
import './adminStyle.css';
import { adminHelper } from '../../util/js/adminPanel.js';
import { Link, Outlet } from 'react-router-dom';





export const Template = () => {
 
    
    useEffect(() => {
        // Use the function from external JavaScript file
        console.log(adminHelper.testFunction());
        console.log(adminHelper.sidebarToggle());
        console.log(adminHelper.accordControl());
        console.log(adminHelper.tabWidth());
  
    }, []);


  


  return (
        <div>
            {/* Bootstrap custom template design starts from here on */}

            <div className='wrapper'>

                <div className='main-header'>
                    
                    <div className='logo'>
                        <div className='logo-content'>
                           {/* <img src='' alt={'img'}></img> */}
                        
                            <p className='sb-companyName'>Web Infotech</p>
                        </div>             
                    </div>

                    <div className='nav'>
                        <div className='nav-align'>
                            <div className='search-box'>  
                                <div className='search'>
                                    
                                    <div className='search-form'>
                                        <form role="search">
                                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                        </form>
                                    </div>
                                    <div className='search-btn'>
                                        <button className='btn'> <i class="bi bi-search"></i></button>
                                    </div>
    
                                </div>
                            </div>

                            <div className='profile-box d-flex'>
                                <div className='notification'>
                                    <i class="bi bi-bell-fill"></i>
                                </div>

                                <div className='img'>
                                    <img src='https://rb.gy/n865th' alt=''></img>
                                </div>

                                <div className='profile-name d-flex'>
                                    <div className='companyName'>
                                        <p>Web Infotech</p>
                                    </div>

                                    <div className='companyProfile'>
                                        <i onClick={adminHelper.accordControl} class="bi bi-person-check"></i>
                                        <div className='accordianCard accord-Display' id='accordianCard'>
                                            <div class="card childCard">
                                                <div class="card-body ">
                                                    <div className='profile-img' id='cardProfileImg'>
                                                        <img src='https://rb.gy/n865th' alt=''></img>
                                                    </div>
                                                    <div className='profile-text'>
                                                        <p className='nav-profile-name'>Name</p>
                                                        <p className='nav-profile-email'>webinfotech019@gmail.com</p>
                                                        <button className='btn btn-sm btn btn-outline-primary nav-profile-btn'>View Profile</button>
                                                        <button className='btn btn-sm btn btn-outline-danger nav-profile-logout' >Log out</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        
                    </div>
                </div>

                
                <div className='temp-body' id='sidebar-wrapper'>
                    
                    <div className='sidebar' id='sidebar'>
                        
                        

                        <div className='sb-wrapper'>

                        <div className='profile-sb-box'>
                            <div className='profile-sb-img'>
                                <img src='https://rb.gy/n865th' alt='img' />
                            </div>
                            <div className='profile-sb-text'>
                                <p>Web Infotech</p>
                                <span>Administrator</span>
                            </div>

                            <div className='profile-sb-card'>
                                <i onClick={adminHelper.accordControl} class="bi bi-person-check sb-person-check"></i>       
                            </div>
                        </div>
                           
                            <div className='sb-row'>
                                <div className='sb-tab-icon'>
                                    <i class="bi bi-speedometer2"></i>
                                </div>

                                <div className='sb-tab-name'>
                                    <Link to={'/admin/dashboard'} className='link-info dashboard-link'> <p>Dashboard</p></Link> 
                                </div>

                                <div className='sb-tab-accordian'>
                                    {/* <div className='compact-down'>
                                        <i className="bi bi-chevron-compact-down" data-bs-toggle="collapse" data-bs-target="#collapseContent" aria-expanded="false" aria-controls="collapseContent">
                                        </i> 
                                    </div> */}
                                   
                                      
                                    {/* <div class="collapse" id="collapseContent">
                                        <div class="card card-body tab-cards final-sb-tab">
                                            <div className='tab-links'>
                                                <Link className='link'><i class="bi bi-dash-lg"></i>Home</Link>
                                            </div>
                                            <div className='tab-links'>
                                                <Link className='link'><i class="bi bi-dash-lg"></i>Profile</Link>
                                            </div>  
                                            <div className='tab-links'>
                                                <Link className='link'><i class="bi bi-dash-lg"></i>Extra</Link>
                                            </div>                                                 
                                        </div> 
                                    </div> */}
                                </div>
                            </div>


                            <div className='sb-row'>
                                <div className='sb-tab-icon'>
                                    <i class="bi bi-people-fill"></i>
                                </div>

                                <div className='sb-tab-name'>
                                    <p className='tab-width-align'>My Clients</p>
                                </div>

                                <div className='sb-tab-accordian'>
                                    <div className='compact-down'>
                                        <i className="bi bi-chevron-compact-down" data-bs-toggle="collapse" data-bs-target="#collapseContentTwo" aria-expanded="false" aria-controls="collapseContentTwo">
                                        </i> 
                                    </div>
                                   
                                      
                                    <div class="collapse" id="collapseContentTwo">
                                        <div class="card card-body tab-cards final-sb-tab" id="tab-cardOne">
                                            <div className='tab-links'>
                                                <Link className='link' to={'/admin/add-category'}><i class="bi bi-dash-lg"></i>Add Category</Link>
                                            </div>
                                            <div className='tab-links'>
                                                <Link className='link' to={'/admin/add-clients'}><i class="bi bi-dash-lg"></i>All Clients</Link>
                                            </div>  
                                                                                        
                                        </div> 
                                    </div>
                                </div>
                            </div>

                            <div className='sb-row'>
                                <div className='sb-tab-icon'>
                                    <i class="bi bi-people-fill"></i>
                                </div>

                                <div className='sb-tab-name'>
                                    <p className='tab-width-align' >Follow-ups</p>
                                </div>

                                <div className='sb-tab-accordian'>
                                    <div className='compact-down'>
                                        <i className="bi bi-chevron-compact-down" data-bs-toggle="collapse" data-bs-target="#collapseContentThree" aria-expanded="false" aria-controls="collapseContentTwo">
                                        </i> 
                                    </div>
                                   
                                      
                                    <div class="collapse" id="collapseContentThree">
                                        <div class="card card-body tab-cards final-sb-tab" id="tab-cardOne">
                                            <div className='tab-links'>
                                                <Link className='link' to={'/admin/add-status'}><i class="bi bi-dash-lg"></i>Create Status</Link>
                                            </div>
                                            <div className='tab-links'>
                                                <Link className='link' to={'/admin/view-followup'}><i class="bi bi-dash-lg"></i>View Follow-up</Link>
                                            </div>
                                            <div className='tab-links'>
                                                <Link className='link' to={'/admin/add-category'}><i class="bi bi-dash-lg"></i>Today's Follow-up</Link>
                                            </div>
                                            <div className='tab-links'>
                                                <Link className='link' to={'/admin/add-clients'}><i class="bi bi-dash-lg"></i>Initiated</Link>
                                            </div>  
                                                                                        
                                        </div> 
                                    </div>
                                </div>
                            </div>

                            
                        </div>

                    </div>

                    <div className='panel-content' id='panel' >
                        <Outlet/>           
                    </div>
                </div>

               

            </div>

            
        </div>

        
  )
}
