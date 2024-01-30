import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../contextAPI/auth';
import "./PlayVideo.css"
import VideoComment from '../../components/videoComment/VideoComment';
import VideoInfoCard from '../../components/video-info-card/VideoInfoCard';
import VideoSuggestionCard from '../../components/videoSuggestionCard/VideoSuggestionCard';
import axios from 'axios';
const PlayVideo = () => {
  const {videoObj, videos}   = useAuth();
  console.log("vides",videos)
  console.log("----->",videoObj)
  
  return (
    <Layout>
      <div className='video-paly-page-container'>
        
        <div className='page-left-side'>
          <div className='video-container'>
            <video  src={videoObj.videoFile} controls></video>
          </div>
          <div>
            <VideoInfoCard/>
          </div>
          <div>
            <VideoComment/>
          </div>
        </div>
        <div className='page-right-side'>
          {
            videos.length === 0 ? "No videos yet" 
            : videos.map(video => <VideoSuggestionCard thumbnail={video.thumbnail} title={video.title} owner={video.owner.fullName} views={video.views} videoId = {video._id}/>) 

          }
        </div>

      </div>
    </Layout>
  )
}

export default PlayVideo