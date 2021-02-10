import React, { useContext, useEffect, useState} from 'react';
import { AppContext } from '../../context/AppContext';
import SWLogo from '../../assets/images/StageWood_logo.png';
import './Welcome.css';
import NoImage from '../../assets/images/NoProfileImage.png';

const Welcome = ({history}) => {
  const {userInfo, setUserInfo} = useContext(AppContext);

  useEffect(() => {
    if(!userInfo){
      history.push("/")
    }
  }, [userInfo])

  return (
    <div className='welcome-container'>
      <div className='welcome-message'>
        <img src={SWLogo} alt='StageWood logo' />
        <h3>Welcome <span>{userInfo?.name}</span></h3>
      </div>
      <input type="button" value='&#x3c; Back' className='backBtn' onClick={()=>{history.push('/')}}/>
      <div className='userInfo-container'>
        <div>
          <img src={userInfo?.picture ? userInfo.picture : NoImage} alt='Profile' />
        </div>
        <div className='userInfo-data-container'>
          <div className='Info-container'>
            <p className='label'>Name:</p>
            <p>{userInfo?.name}</p>
          </div>
          <div className='Info-container'>
            <p className='label'>Username:</p>
            <p>{userInfo?.username}</p>
          </div>
          <div className='Info-container'>
            <p className='label'>Email:</p>
            <p className='userInfo'>{userInfo?.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome