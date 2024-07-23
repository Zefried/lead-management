import React from 'react'
import {Link} from 'react-router-dom';

export const Dashboard = () => {




  return (
    <div className='db-container'>
      
            <div className='db-wrapper'>
                <div className='card-wrapper'>
                    
                    <div className='db-card-header'>
                        <h1>Follow-up</h1>
                    </div>
                    
                       
                    <div className='card-row'>

                            <div className='card-one db-card-body'>
                                    <div className='card-icon'>
                                        <i class="bi bi-telephone-outbound"></i>
                                    </div>

                                    <div className='today-followUps'>
                                        <p>Today Follow-up</p>
                                    </div>

                                    <div className='db-card-numbs'>
                                        <p>23</p>
                                    </div>
                            </div>
        
                            <div className='card-one db-card-body'>

                                    <div className='card-icon'>
                                        <i class="bi bi-cash-coin"></i>
                                    </div>

                                    <div className='today-followUps'>
                                        <p>Pending Payments</p>
                                    </div>

                                    <div className='db-card-numbs'>
                                        <p>25</p>
                                    </div>
                            </div>
                    
                            <div className='card-one db-card-body'>
                                        
                                    <div className='card-icon'>
                                        <i class="bi bi-gear-wide-connected"></i>
                                    </div>

                                    <div className='today-followUps'>
                                        <p>Today Meetings</p>
                                    </div>

                                    <div className='db-card-numbs'>
                                        <p>21</p>
                                    </div>
                            </div>
                        
                            <div className='card-one db-card-body'>
                                        
                                    <div className='card-icon'>
                                        <i class="bi bi-check2-circle"></i>
                                    </div>

                                    <div className='today-followUps'>
                                        <p>Today Task</p>
                                    </div>

                                    <div className='db-card-numbs'>
                                        <p>07</p>
                                    </div>
                            </div>                           

                    </div>

                </div>
            </div>

            <div className='content-wrapper'>

                <div className='row'>

                    <div className='col-lg-5 todo-list'>
                        
                        <div className="container py-5 h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-xl-10">
                                <div className="card" style={{borderRadius: 15}}>
                                <div className="card-body p-5">
                                    <h6 className="mb-3">Awesome Todo List</h6>
                                    <form className="d-flex justify-content-center align-items-center mb-4">
                                    <div data-mdb-input-init className="form-outline flex-fill">
                                        <input placeholder='I need to do xyg' type="text" id="form3" className="form-control form-control-lg" />
                                        
                                    </div>
                                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg ms-2">Add</button>
                                    </form>
                                    <ul className="list-group mb-0">
                                    <li className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
                                        <div className="d-flex align-items-center">
                                        <input className="form-check-input me-2" type="checkbox" defaultValue aria-label="..." />
                                        Cras justo odio
                                        </div>
                                        <a href="#!" data-mdb-tooltip-init title="Remove item">
                                        <i className="fas fa-times text-primary" />
                                        </a>
                                    </li>
                                    <li className="list-group-item d-flex d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
                                        <div className="d-flex align-items-center">
                                        <input className="form-check-input me-2" type="checkbox" defaultValue aria-label="..." defaultChecked />
                                        <s>Dapibus ac facilisis in</s>
                                        </div>
                                        <a href="#!" data-mdb-tooltip-init title="Remove item">
                                        <i className="fas fa-times text-primary" />
                                        </a>
                                    </li>
                                    <li className="list-group-item d-flex d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
                                        <div className="d-flex align-items-center">
                                        <input className="form-check-input me-2" type="checkbox" defaultValue aria-label="..." />
                                        Morbi leo risus
                                        </div>
                                        <a href="#!" data-mdb-tooltip-init title="Remove item">
                                        <i className="fas fa-times text-primary" />
                                        </a>
                                    </li>
                                    <li className="list-group-item d-flex d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
                                        <div className="d-flex align-items-center">
                                        <input className="form-check-input me-2" type="checkbox" defaultValue aria-label="..." />
                                        Porta ac consectetur ac
                                        </div>
                                        <a href="#!" data-mdb-tooltip-init title="Remove item">
                                        <i className="fas fa-times text-primary" />
                                        </a>
                                    </li>
                                    <li className="list-group-item d-flex d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-0">
                                        <div className="d-flex align-items-center">
                                        <input className="form-check-input me-2" type="checkbox" defaultValue aria-label="..." defaultChecked />
                                        Vestibulum at eros
                                        </div>
                                        <a href="#!" data-mdb-tooltip-init title="Remove item">
                                        <i className="fas fa-times text-primary" />
                                        </a>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
                                        <div className="d-flex align-items-center">
                                        <input className="form-check-input me-2" type="checkbox" defaultValue aria-label="..." />
                                        Morbi leo risus
                                        </div>
                                        <a href="#!" data-mdb-tooltip-init title="Remove item">
                                        <i className="fas fa-times text-primary" />
                                        </a>
                                    </li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    
                    </div>

                    <div className='col-lg-7 follow-up-list'>

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

                                <div className='filter-card'>
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
                                </div>
                               
                            </div>
                        </div>


                        <div className='follow-up-card'>
                            <table className="table align-middle mb-0 bg-white">
                                <thead className="bg-light">
                                    <tr>
                                    <th>Name</th>
                                    <th>Business</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                    <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                        <img src="https://mdbootstrap.com/img/new/avatars/8.jpg" alt='' style={{width: 45, height: 45}} className="rounded-circle" />
                                        <div className="ms-3">
                                            <p className="fw-bold mb-1">John Doe</p>
                                            <p className="text-muted mb-0">7827379352</p>
                                        </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="fw-normal mb-1">Software engineer</p>
                                        <p className="text-muted mb-0">IT department</p>
                                    </td>
                                    <td>
                                        <span className="badge badge-success rounded-pill d-inline">Active</span>
                                    </td>
                                    <td><b>Hot</b></td>
                                    <td>
                                        <button type="button" className="btn btn btn-outline-primary btn-rounded btn-sm fw-bold follow-btn" data-mdb-ripple-color="dark">
                                        Edit
                                        </button>
                    
                                        <button type="button" className="btn btn btn-outline-danger btn-rounded btn-sm fw-bold follow-btn" data-mdb-ripple-color="dark">
                                        Delete
                                        </button>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                        <img src="https://mdbootstrap.com/img/new/avatars/6.jpg" className="rounded-circle" alt='' style={{width: 45, height: 45}} />
                                        <div className="ms-3">
                                            <p className="fw-bold mb-1">Alex Ray</p>
                                            <p className="text-muted mb-0">8800828701</p>
                                        </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="fw-normal mb-1">Consultant</p>
                                        <p className="text-muted mb-0">Finance</p>
                                    </td>
                                    <td>
                                        <span className="badge badge-primary rounded-pill d-inline">Onboarding</span>
                                    </td>
                                    <td><b>Cold</b></td>
                                    <td>
                                        <button type="button" className="btn btn btn-outline-primary btn-rounded btn-sm fw-bold follow-btn" data-mdb-ripple-color="dark">
                                        Edit
                                        </button>
                                        <button type="button" className="btn btn btn-outline-danger btn-rounded btn-sm fw-bold follow-btn" data-mdb-ripple-color="dark">
                                        Delete
                                        </button>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                        <img src="https://mdbootstrap.com/img/new/avatars/7.jpg" className="rounded-circle" alt='' style={{width: 45, height: 45}} />
                                        <div className="ms-3">
                                            <p className="fw-bold mb-1">Kate Hunington</p>
                                            <p className="text-muted mb-0">7878225432</p>
                                        </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="fw-normal mb-1">Designer</p>
                                        <p className="text-muted mb-0">UI/UX</p>
                                    </td>
                                    <td>
                                        <span className="badge badge-warning rounded-pill d-inline">Awaiting</span>
                                    </td>
                                    <td><b>Hot</b></td>
                                    <td>
                                        <button type="button" className="btn btn btn-outline-primary btn-rounded btn-sm fw-bold follow-btn" data-mdb-ripple-color="dark">
                                        Edit
                                        </button>
                                        <button type="button" className="btn btn btn-outline-danger btn-rounded btn-sm fw-bold follow-btn" data-mdb-ripple-color="dark">
                                        Delete
                                        </button>
                                    </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                       

                    </div>

                </div>

                




            </div>
      
    </div>
  )



}



// Sync execution and breakdown process mai we discover new probs