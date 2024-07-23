import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const location = useLocation();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [loginInfo, setLogin] = useState({
      email:'',
      name:'',
      role:'',
      token:'',
  });

  const handleGoogleSignUp = async () => {
    setLoading(true);

    const clientId = '743324467464-ff7fpq7lm3aumi83dv0jt0r5enlqf5b0.apps.googleusercontent.com'; // Your Google Client ID
    const redirectUri = encodeURIComponent('http://localhost:8000/api/auth/google/callback'); // Your Google Redirect URI
    const scope = encodeURIComponent('openid email profile https://www.googleapis.com/auth/calendar');
  
    const googleSignup = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline&prompt=consent`;
  
    try {
      window.location.href = googleSignup;
     
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paramData = params.get('token');
    const userData = JSON.parse(decodeURIComponent(paramData)); 

    try{
      if(userData){

        let stringData = JSON.stringify(userData);
        localStorage.setItem('auth_user', stringData);
        
        setLogin({
          'email':userData.email,
          'name':userData.name,
          'role':userData.role,
          'token':userData.token,
        }) 

        setLoading(false);

        navigate('/admin/dashboard');
        let message = 'You have signed in successfully.';
        Swal.fire({
          title: "Success!",
          text: message,
          icon: "success"
        })
      }
    }catch(error){
      console.log('error while fetching the URIComponent'.error);
      
      if(error){
        let message = 'Oops! Something went wrong. Please sign in again to continue';
        Swal.fire({
          title: "Unexpected Behaviour",
          text: message,
          icon: "question"
        })
      }
    }
    
      
}, [location]);


console.log(loginInfo);

  let loadingText = '';

  if(loading){
    loadingText = (
      <div>
        <h2>Loading please wait...</h2>
      </div>
    )
  }


  return (
    <div>
      {loadingText}

      <h2>Sign Up</h2>
      <button onClick={handleGoogleSignUp}>SignUp with Google</button>


    </div>
  );


};




export default LoginPage;
