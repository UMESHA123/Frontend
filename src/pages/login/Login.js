import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import "./Login.css"
import Layout from '../../components/Layout/Layout'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { useAuth } from '../../contextAPI/auth.js'

const Login = () => {
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const {auth, setAuth, setUserDetailes, setUserid} = useAuth();

  const navigate = useNavigate();
  const loginHandler = async () => {
    try{
      const res = await axios.post('http://localhost:8000/api/v1/users/login',{email,username, password})
      if(res.status === 200){
        console.log(res)
        setUserDetailes({userDetail: res?.data?.data?.user})
        console.log(res.data.data.user)
        setAuth({
          user: res?.data?.data?.user?.username,
          accessToken: res?.data?.data?.accessToken
        })
        setUserid(res?.data?.data?.user._id)
        localStorage.setItem("auth", JSON.stringify(res.data?.data))
        alert('User logged In Successfully')
        navigate('/')
      }
    }catch(error){
      if(error.response.status === 400){
        setError('username or email is required')
      }
      if(error.response.status === 404){
        setError('User does not exist')
      }
      if(error.response.status === 401){
        setError('Invalid user credentials')
      }
    }
  }
  return (
    <Layout>
        <div className='form'>
            <div className='registor-container'>
                <div className='form-heading'><h2>Login</h2></div>
                <p className='error'>{error}</p>
                <div className='inout-fields'>
                    <div><input type='text' value={username} onChange={(e => setUsername(e.target.value))} placeholder='Username' required /></div>
                    <div><input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' required/></div>
                    <div><input type='text' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' required/></div>
                    <div className='forgot-link'><Link to="/forgetpassword">forgot password</Link></div>
                    <div><button onClick={loginHandler}>Login</button></div>
                    <div className='link'>if not have a account:<Link to="/registor">Registor</Link></div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Login