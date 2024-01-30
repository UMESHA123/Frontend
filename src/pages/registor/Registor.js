import React,{useState} from 'react'
import "./Registor.css"
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'

const Registor = () => {

  const [error, setError] = useState("");

  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  
  const navigate = useNavigate();

  const registorHandler = async (e) => {
    try{
      const formData = new FormData();
      formData.append('fullName', fullname);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('avatar', avatar);
      formData.append('coverImage', coverImage);

      const res = await axios.post('http://localhost:8000/api/v1/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res)
     
      if(res.status === 201){
        alert(`${res.data.message}`)
        navigate('/login')
      }
    }catch(error){
      console.log(error)
      if(error.response.status === 400){
        alert('')
        setError('All fields are required')
      }
      if(error.response.status === 409){
        setError('User with email and username already exist')
      }
      if(error.response.status === 500){
        setError('Something went wrong while creating a user')
      }
    }
  }
  return (
    <Layout>
        <div className='form'>
            <div className='registor-container'>
                <div className='form-heading'><h2>Registor</h2></div>
                <p className='error'>{error}</p>
                <div className='inout-fields'>
                    <div><input type='text' value={fullname} onChange={(e => setFullname(e.target.value))} placeholder='Fullname' required /></div>
                    <div><input type='text' value = {username} onChange={(e => setUsername(e.target.value))} placeholder='Username' required/></div>
                    <div><input type='email' value={email} onChange={(e => setEmail(e.target.value))} placeholder='Email' required/></div>
                    <div><input type="password" value={password} onChange={(e => setPassword(e.target.value))} placeholder='Password' required/></div>
                    <div><input className='input-file'  type='file' onChange={(e => setAvatar(e.target.files[0]))} placeholder='Upload avatar' required/></div>
                    <div><input className='input-file'  type='file' onChange={(e => setCoverImage(e.target.files[0]))} placeholder='Upload cover image'/></div>
                    <div><button onClick={registorHandler}>Registor</button></div>
                    <div className='link'>or Sign in: <Link to="/login">Signin</Link></div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Registor