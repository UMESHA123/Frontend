import { useAuth } from "../../contextAPI/auth"
import { useNavigate } from "react-router-dom";
import "./Card.css"
import axios from "axios";

const Card = ({duration, owner, thumbnail, title, videoFile, views, videoId}) => {
  
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
    <div className='card' onClick={videoCardClickHandler}>
        <div className='card-img'>
            <img src={thumbnail} alt='image of user'/>
            <p className='duration'>{duration}</p>
        </div>
        <div className='card-info'>
          <div className='card-info-left'>
            <img src={owner.avatar} alt='images'/>
          </div>
          <div className='card-info-right'>
            <p className='card-title'>{title}</p>
            <span className='views-and-time'>
              <p className='views'>{views} Views</p>
              <p className='time'>44 min ago</p>
            </span>
            <span className='userId'>
              <p>umesha@123</p>
            </span>
          </div>
        </div>
    </div>
  )
}

export default Card