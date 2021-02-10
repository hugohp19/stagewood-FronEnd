import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useMutation } from '@apollo/client';
import { Login_Mutation}  from '../GraphQL/Mutations';
import swal from 'sweetalert';
import wrong from '../assets/images/wrong.svg';

const Login = ({history}) => {
  const [inputData, setInputData ] = useState({email: '', password: ''});
  const {userInfo, setUserInfo} = useContext(AppContext);
  const [login, {error}] = useMutation(Login_Mutation);


  const HandleLogIn = async (e) =>{
    e.preventDefault();
    try {
      const {data} = await login({
        variables: {
          email: inputData.email,
          password: inputData.password
        }
      })
      sessionStorage.setItem('user', data.login.user);
      setUserInfo(data.login.user);
      history.push('/welcome');
    } catch (error) {
      swal({ text: 'Invalid Login or password.', icon: wrong });
    }
  }

  return (
    <div className='login-container'>
      <form>
        <label htmlFor='email'>Email</label>
        <input type='text' placeholder='Email' id='email' value={inputData.email} onChange={e => setInputData({...inputData, email: e.target.value})}/>
        
        <label htmlFor='password'>Password</label>
        <input type='password' placeholder='Password' id='password' value={inputData.password}  onChange={e => setInputData({...inputData, password: e.target.value})}/>

        <input type='button' value='Log In' onClick={HandleLogIn}/>
      </form>
      {/* <p onClick={toggleSignUpLogIn}>You can <strong>Sing Up</strong> here</p> */}
    </div>
  )
}

export default Login
