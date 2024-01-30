import React, {useEffect, useState} from 'react'
import "./VideoComment.css"
import { useAuth } from '../../contextAPI/auth'
import axios from 'axios';
import userImage from './img1.png'
import { MdDelete } from "react-icons/md";
import { FaPenToSquare } from "react-icons/fa6";
const VideoComment = () => {
  const {userDetailes, videoId, auth, userid} = useAuth();
  const [allComment, setAllComment] = useState([]);
  const [content, setContent] = useState('');
  const [updateCommentFlag, setUpdateCommentFlag] = useState(false);
  const [commentId, setCommentId] = useState();
  const [deleteFlag, setDeleteFlag] = useState(false);

console.log('videoId',videoId)
  useEffect(() => {
    try {
      const getAllComment = async () => {
        const res = await axios.get(`http://localhost:8000/api/v1/comments/${videoId}`,{
          headers: {
            Authorization: `Bearer ${auth.accessToken}`
          }
        })
        if(res.status === 200){
          console.log("all comments", res)
          setAllComment(res?.data?.data)
        }
      }
      getAllComment()
    } catch (error) {
      console.log(error)
    }
  },[videoId, updateCommentFlag, deleteFlag])
  const addComment = async () => {
      try{
        const res = await axios.post(`http://localhost:8000/api/v1/comments/${videoId}`, {
          content: content
        }, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`
          }
        })
        if(res.status === 200){
          console.log(res)
        }
      }catch(error){
        console.log(error)
      }
  }
  const updateComment = async () => {
    try{
      
      const res = await axios.patch(`http://localhost:8000/api/v1/comments/c/${commentId}`, {
        content: content
      }, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        }
      })
      if(res.status === 200){
        setUpdateCommentFlag(false)
        setContent('')
        console.log(res)
      }
    }catch(error){
      // setUpdateCommentFlag(false)
      console.log(error)
    }
}
const updateCommentHandler = (comment_id, commentOwner) => {
  if(userid === commentOwner){
    setCommentId(comment_id)
    setUpdateCommentFlag(true)
  }
  return;
 
  
} 
const deleteComment = async (deleteCommentId) => {
  try {
    const res = await axios.delete(`http://localhost:8000/api/v1/comments/c/${deleteCommentId}`, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`
      }
    })
    if(res.status === 200){
      alert(`Comment is deleted`)
      setDeleteFlag(!deleteFlag)
      console.log(res)
    }
  } catch (error) {
    console.log(error)
  }
}
// useEffect( () => {
  //   const getCommentOwner = async() => {
  //     const res = await axios.get(``)
  //     if(res.staus === 200) {

  //     } 
  //   }
  // }, [])
  // console.log(userDetailes)
  return (
    <div className='video-comment-container'>
        <div className='video-comment-input-container'>
            <h2>Comments</h2>
            <div className='comment-input-container'>
              <div className='login-user'><img src={userDetailes.userDetail.avatar}/></div>
              <div className='comment-input' value = {content} onChange={(e) => setContent(e.target.value)}><input type='text' placeholder='Add a comment...'/></div>
              {updateCommentFlag ? <button className='add-button' onClick={updateComment}>Update</button> : <button className='add-button' onClick={addComment}>Add</button>}
            </div>
            <div className='all-comment'>
              {allComment.map(comment => {
                console.log("comment",comment)
                
                return (
                  <>
                 
                    <div className='comments'>
                      <div className='login-user'><img  src={userImage}/></div>
                      <div className='comments-info'>
                        <div className='comment-userid'>@smapleUser</div>
                        <div className='user-comment-content'>{comment.content}</div>
                        <div className='delete-update-comment'>
                          <div className='updateComment' onClick={() => updateCommentHandler(comment._id, comment.owner)} ><FaPenToSquare /></div>
                          <div className='deleteComment' onClick={() => deleteComment(comment._id)}><MdDelete /></div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })}
            </div>
        </div>
    </div> 
  )
}

export default VideoComment