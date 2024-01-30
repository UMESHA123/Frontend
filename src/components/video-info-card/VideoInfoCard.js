import React, {useEffect} from 'react'
import "./VideoInfoCard.css";
import { useAuth } from '../../contextAPI/auth';
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import { TfiDownload } from "react-icons/tfi";
import axios from 'axios';

const VideoInfoCard = () => {
    const {videoObj,user, videoId, auth} = useAuth();
    console.log(user)
    const getVideoLike = async () => {
      const res = await axios.post(`http://localhost:8000/api/v1/likes/toggle/v/${videoId}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        }
      })
      if(res.status === 200){
        console.log("like",res)
      }
    }
  return (
    <div className='video-card-info'>
        <h2>{videoObj.title}</h2>
        <div className='user-info-bar'>
          <div className='user-subscribe '>
          <button className='video-owner-icon'><img src={videoObj.owner.avatar} alt={videoObj.id}/></button>
          <button className='channel-name'>{videoObj.owner.username}</button>
          <button className='subscribe-btn default' >subscrib</button>
          </div> 
          <div className='flex-share-like'>
            <button className='likes' onClick={getVideoLike} ><div className='flex-content'><BiLike /><span>{videoObj.likes}</span>|<button className='dislike'><BiDislike/></button></div></button>
            <button className='video-share'><FaShare /><span>Share</span></button>
            <button className='download' ><TfiDownload/><span>Download</span></button>
         </div> 
                 
        </div>
        <div className='description'>
          {videoObj.description}
        </div> 
    </div>
  )
}

export default VideoInfoCard