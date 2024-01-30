import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import Card from '../../components/card/Card'
import { useAuth } from '../../contextAPI/auth';
import axios from 'axios';

import "./HomePage.css"
const HomePage = () => {

  const { auth, videos, setVideos } = useAuth();

  //const [videos, setVideos] = useState([]);

  useEffect( () => {
    const featchAllVideos = async () => {
      const res = await axios.get("http://localhost:8000/api/v1/videos",
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        }
      });
      console.log("videos",res);
      setVideos(res?.data?.data)
    }
    featchAllVideos()
  },[])

  return (
    <Layout>
       <div className='card-container'>
          {
            videos.length === 0 ? <span className='no-video'>"No Videos are present"</span> 
            :videos.map( (video) => {
              return (
                <>
                  
                  <Card duration={video.duration} owner = {video.owner} thumbnail = {video.thumbnail} title = {video.title} videoFile = {video.videoFile} views = {video.views} videoId = {video._id}/>
                  
                </>
              )
            })
          }
       </div>
    </Layout>
  )
}

export default HomePage