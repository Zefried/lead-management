import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';

// This component is dealing with
// adding categories
// view categories
// and handling delete categories


export const AddCategory = () => {

    const userData = JSON.parse(localStorage.getItem('auth_user'));
    const token = userData.token;

    const [loading, setLoading] = useState();
    const [reload, setReload] = useState(false);

    const handleReload = () => {
        setReload(prevState => {
            const newState = !prevState;
            // console.log(newState);
            return newState;
        });
    };


    const [categoryInput, setCategory] = useState({
        category_name: '',
        slug:'',
        description:'',
        error:[],
    });

    const [categoryRetrievedData, setRetrievedData] = useState(null);
    
    const handleCategory = (event) => {
        const {name, value} = event.target;
        setCategory({...categoryInput, [name]:value});

    }

    const handleSubmit = (event) => {
        setLoading(true);
        event.preventDefault();

        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('api/admin/add-category',categoryInput, {
                headers:{
                    authorization: `Bearer ${token}`
                }
            }).then((res)=>{
                if(res.data.status === 200){
                    setLoading(false);
                    
                    setCategory({
                        category_name: '',
                        slug: '',
                        description: '',
                        error: [],
                    });

                    Swal.fire({
                        title: "Success",
                        text: "Your category Added Successfully",
                        icon: "success"
                      });

                }else {
                    setLoading(false);
                    
                    setCategory({...categoryInput, error:res.data});

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


    console.log(categoryInput);

    useEffect(()=>{

        axios.get('sanctum/csrf-cookie')
        .then(response => {
            axios.get('api/admin/view-category', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                setRetrievedData(res.data);
                setLoading(false);
               
            })
            .catch((error) => {
                console.error('Error retrieving category data:', error);
            });
        })
        .catch((error) => {
            console.error('Error getting CSRF token:', error);
        });
    },[reload]);

    const handleDelete = (id, event) =>{

        event.preventDefault();
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.get(`api/admin/delete-category/${id}`, {
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
    
    // working with custom jsx

    let loadingJsx = '';
        if(loading){

        return loadingJsx = (
            <div>
                <h3>Loading..</h3>
            </div>
           )
            
    }

    let viewData = '';
        if(!loading && categoryRetrievedData){
           
            viewData = categoryRetrievedData.map((items, index)=>{
             
               
                return (
                    <tr key={items.id}>
                        <td>{index+1}</td>
                        <td>{items.category_name}</td>
                        <td>{items.slug}</td>
                        <td>
                            <Link to={`/admin/edit-category/${items.id}`} className='btn btn-sm btn-outline-primary'>Edit</Link>
                        </td>
                        <td>
                            <Link className='btn btn-sm btn-outline-danger' onClick={(event)=>handleDelete(items.id, event)}>Delete</Link>
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
                Add Category
            </h4>
        </div>
       


        <div className='client-category-container'>
              <form onSubmit={handleSubmit}>
              
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                          <button className="nav-link active" id="category-tab" data-bs-toggle="tab" data-bs-target="#category-tab-pane" type="button" role="tab" aria-controls="category-tab-pane" aria-selected="true" onClick={()=> handleReload()}>Home</button>
                      </li>
                      <li className="nav-item" role="presentation">
                          <button className="nav-link" id="view-tab" data-bs-toggle="tab" data-bs-target="#view-tab-pane" type="button" role="tab" aria-controls="view-tab-pane" aria-selected="true" onClick={()=> handleReload()} >View Category</button>
                      </li>
                  </ul>

                  <div className="tab-content" id="myTabContent">

                      <div className="tab-pane fade show active" id="category-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">     
                          <div className='form-group m-3'>
                                    <div className='col-lg-6'>
                                      <label class="form-label">Category Name</label>
                                      <input type="text" name='category_name' onChange={handleCategory} className="form-control" />
                                      <span>{categoryInput.error.category_name}</span>
                                    </div>
                                     
                                     <div className='col-lg-6'>
                                        <label for="exampleInputPassword1" class="form-label">Slug</label>
                                        <input type="text" name='slug' onChange={handleCategory}  className="form-control"/>
                                        <span>{categoryInput.error.slug}</span>
                                     </div>
                                    
                                    <div className='col-lg-6'>
                                        <label for="exampleInputPassword1" class="form-label">Description</label>
                                        <textarea name='description' onChange={handleCategory}  className='form-control' ></textarea>                       
                                    </div>
                                        
                                     {/* <div className='mt-3'>
                                        <label class="form-check-label mx-2" for="exampleCheck1">Status</label>
                                        <input type="checkbox" name='category_status' onChange={handleCategory} class="form-check-input" />
                                    </div> */}
                                     
                          </div>

                          <button className='btn btn-outline-primary m-3' type='submit'>Add Category</button>
                      </div>

                      <div className="tab-pane fade show" id="view-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">     
                          <div className='form-group m-3'>

                          <div className='category-view'>
                            <div className='container px-4'>
                      
                                    {/* <div className='card-header'>
                                        <h4>
                                        Category list
                                        <Link className='btn btn-outline-primary btn-sm float-end' id='category-tab-pane' to={'/admin/add-category'}>Add Category</Link>
                                        </h4>
                                    </div> */}

                                    <div className='card-body'>
                                    <table class="table">
                                        <thead class="thead-dark">
                                            <tr>
                                            <th scope="col">S.no</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Slug</th>
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
