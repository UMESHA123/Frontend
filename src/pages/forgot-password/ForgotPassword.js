import React, { useState } from 'react'
import './ForgotPassword.css'
import Layout from '../../components/Layout/Layout'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contextAPI/auth';

const ForgotPassword = () => {

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [error, setError] = useState('');
  const { auth } = useAuth();
  const navigate = useNavigate();

  const updatePasswordHandler = async () => {
    try{
        const res = await axios.post("http://localhost:8000/api/v1/users/change-password", {
        oldPassword, 
        newPassword
      },
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        }
      }
      )
      if(res.status === 200){
        alert('Password changed successfully')
        navigate('/login')
      }
    }catch(error){
      if(error.response.status === 400){
        setError("Invalid old password")
      }if(error.response.status === 401){
        setError("Unauthorized")
      }
    }
    
  }

  return (
    <Layout>
        <div className='form'>
            <div className='registor-container'>
                <div className='form-heading'><h2>Update Password</h2></div>
                <p className='error'>{error}</p>
                <div className='inout-fields'>
                    <div><input type='text' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder='Old Password' required /></div>
                    <div><input type='text' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='New Password' required/></div>
                    <div><button onClick={updatePasswordHandler}>Update Password</button></div>
                    <div className='link'>or Sign in: <Link to="/login">Signin</Link></div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default ForgotPassword