import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useMutation } from '@apollo/client';
import {SignUp_Mutation} from '../GraphQL/Mutations';
import swal from 'sweetalert';
import wrong from '../assets/images/wrong.svg';

const SignupComp = ({history}) => {
  const [signupData, setSignupData ] = useState({});
  const {userInfo, setUserInfo} = useContext(AppContext);
  const [signup, {err}] = useMutation(SignUp_Mutation);
  const [previewSource, setPreviewSource] = useState();
  const [confirmPassword, setConfirmPassword] = useState('');

  const onChangePicture = (e) => {
    const file = e.target.files[0];
    previewFile(file) 
  };

  const previewFile = (file) =>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>{
      setPreviewSource(reader.result)
    }
  }

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const HandleSignUp = async (e) =>{
    e.preventDefault();
    
    if(!signupData.name || !signupData.username || !signupData.email || !signupData.password || !previewSource){
      swal({ text: 'All fields are Required!', icon: "warning" });
      return
    }

    if(!validateEmail(signupData.email)){
      swal({ text: 'Invalid Email', icon: wrong});
      return
    }

    if(signupData.password.length < 8){
      swal({ text: "Password must be 8 or more characters", icon: "warning" });
      return ;
    } else if(signupData.password !== confirmPassword){
      swal({ text: "Passwords do NOT match", icon: "warning" });
      return ;
    }

    try {
      const {data} = await signup({
        variables: {
          name: signupData.name,
          username: signupData.username,
          email: signupData.email,
          password: signupData.password,
          picture: previewSource
        }
      })
      sessionStorage.setItem('user', data.signup.user);
      setUserInfo(data.signup.user);
      swal({icon: "success"});
        history.push('/welcome');
    } catch (error) {
      swal({ text: 'Something Went Wrong', icon: wrong });
    }
  }

  return (
    <div className='signup-container' >
    <form>
      <label htmlFor='Name'>Name</label>
      <input type='text' placeholder='Name' id='name' value={signupData.name} onChange={e => setSignupData({...signupData, name: e.target.value})}/>
      
      <label htmlFor='username'>Username</label>
      <input type='text' placeholder='Username' id='username'  value={signupData.username}  onChange={e => setSignupData({...signupData, username: e.target.value})}/>
      
      <label htmlFor='email'>Email</label>
      <input type='text' placeholder='Email' id='email'  value={signupData.email} onChange={e => setSignupData({...signupData, email: e.target.value})}/>
      
      <label htmlFor='password'>Password</label>
      <input type='password' placeholder='Password' id='password' value={signupData.password} onChange={e => setSignupData({...signupData, password: e.target.value})}/>
      
      <label htmlFor='confirmPassword'>Confirm Password</label>
      <input type='password' placeholder='Confirm Password' id='confirmPassword' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>

      <label htmlFor='propic'>Profile Picture</label>
      <input type='file' accept='image/*' id='propic' onChange={onChangePicture}/>

      {previewSource && (
        <img src={previewSource} alt='chosen' style={{maxWidth: '50px', height: '50px'}}/>
      )}
      

      <input type='button' value='Sign Up' onClick={HandleSignUp}/>
    </form>
    
  </div>
  )
}

export default SignupComp;
