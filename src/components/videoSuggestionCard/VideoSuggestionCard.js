import React from 'react'
import './VideoSuggestionCard.css'
import { useAuth } from '../../contextAPI/auth';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const VideoSuggestionCard = ({thumbnail, title, owner, views, videoId}) => {

  const {setVideoObj, auth, setVideoId} = useAuth();
  const navigate = useNavigate()
  
  const videoCardClickHandler = async() => {
    try{
      const res = await axios.get(`http://localhost:8000/api/v1/videos/${videoId}`, {
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
  });
      if(res.status === 200){
        console.log(res)
        setVideoId(videoId)
        setVideoObj(res.data.data)
        navigate("/playVideo")
      }
      
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className='suggested-video-card-container' onClick={videoCardClickHandler}>
        <div className='suggested-video-card-img'>
          <img src={thumbnail} alt='video thumbnail'/>
        </div>
        <div className='suggested-video-card-info'>
          <p className='suggested-vidoe-title'>{title}</p>
          <span className='video-owner'>{owner}</span>
          
          <div className='flex-views-day'>
            <span className='suggested-video-views'>{views} views</span>
            <span className='suggested-video-date-ago'>3 days agp</span>
          </div>
        </div>
    </div>
  )
}

export default VideoSuggestionCard