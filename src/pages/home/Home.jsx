import React, { useState } from 'react';
import './Home.css';
import SWLogo from '../../assets/images/StageWood_logo.png';
import Login from '../../components/Login';
import SignupComp from '../../components/SignupComp';

const Signup = ({history}) => {
  const [isHidden, setIsHidden] = useState(true);
  
  const toggleSignUpLogIn = () =>{
    setIsHidden(!isHidden)
  }

  return (
    <div className='page-container'>
      <img src={SWLogo} alt='SW logo' />
      <div className='components-container'>
        { isHidden ?  <Login history={history}/> : <SignupComp history={history}/>}

        { isHidden ? <p onClick={toggleSignUpLogIn}>Need an Account? <strong>Sign up</strong></p> : <p onClick={toggleSignUpLogIn}>Already an User? <strong>Log In</strong></p>}
      </div>
    </div>
  )
}

export default Signup;
