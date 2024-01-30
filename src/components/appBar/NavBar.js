import React, {useState} from 'react'
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { RiMenu3Line } from "react-icons/ri";
import "./NavBar.css"
import { useAuth } from '../../contextAPI/auth';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RiVideoAddFill } from "react-icons/ri";
import VideoUpload from '../videoUploadModel/VideoUpload';

const NavBar = () => {

  const {auth, setAuth, setSidebarState, sidebarState} = useAuth();
  const navigate = useNavigate();

  const [show, setShow] = useState(false)

  const logoutHandler = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/users/logout",{},
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        }
      });
      if(res.status === 200){
        alert("User logged Out")
        setAuth({
          user: null,
          accessToken: ""
        })
        localStorage.removeItem("auth")
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }

  }
 
  const closeShow = () => setShow(false)

  return (
    <div>
      <nav className='flex'>
        <div className='logo'>
          <span className='logo-icon' onClick={() => setSidebarState(!sidebarState)}><RiMenu3Line/></span>
          <span>YouTube</span>
        </div>
        <div className='input'>
          <input type='text'/>
          <button><FaSearch /></button>
        </div>
        <div className='flex'>
          {auth.user ? <span className='uploadButton' title='Upload Video' onClick={(e) => setShow(true)}><RiVideoAddFill/></span>: ""}
          {auth.user ? <span className='user-name'><span className='user-icon'><FaUserCircle/></span>{auth.user}</span> : ""}
          {auth.user ? <Link><button onClick={logoutHandler} className='button'>Logout</button></Link> : <Link to="/login"><button className='button'>Login</button></Link>}
        </div>
      </nav>
      {show && <VideoUpload closeShow = {closeShow}/>}
    </div>
  )
}

export default NavBar