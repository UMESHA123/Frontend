import React from 'react'
import NavBar from '../appBar/NavBar'
import { RiHome3Fill } from "react-icons/ri";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineHistory } from "react-icons/ai";
import { GoDeviceCameraVideo } from "react-icons/go";
import { BsCollectionPlayFill } from "react-icons/bs";
import { FaUserCheck } from "react-icons/fa";
import "./Layout.css"
import { useAuth } from '../../contextAPI/auth';

const Layout = (props) => {

  const {sidebarState} = useAuth();
  let temp = sidebarState ? "sidebar" : "newsidebar";
  return (
    <div>
        <NavBar/>
        <main>
            <div className='main-body'>
              <div className={temp}>
                <div>
                    <span className='sidebar-icons-text'><RiHome3Fill className='icons'/><span className='sidebar-text'>Home</span></span>
                    <span className='sidebar-icons-text'><AiFillLike className='icons'/><span className='sidebar-text'>Liked Videos</span></span>
                    <span className='sidebar-icons-text'><AiOutlineHistory className='icons'/><span className='sidebar-text'>History</span></span>
                    <span className='sidebar-icons-text'><GoDeviceCameraVideo className='icons'/><span className='sidebar-text'>My Content</span></span>
                    <span className='sidebar-icons-text'><BsCollectionPlayFill className='icons'/><span className='sidebar-text'>Collections</span></span>
                    <span className='sidebar-icons-text'><FaUserCheck className='icons'/><span className='sidebar-text'>Subscribers</span></span>
                </div>
                <div>
                    <span className='sidebar-icons-text'><RiHome3Fill className='icons'/>Home</span>
                    <span className='sidebar-icons-text'><RiHome3Fill className='icons'/>Home</span>
                </div>
              </div>
              <div className='main-body-container'>
                {props.children}
              </div>
            </div>
        </main>
    </div>
  )
}

export default Layout