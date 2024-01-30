import React, {useRef, useState} from 'react';
import "./VideoUpload.css";
import axios from 'axios';
import { useAuth } from '../../contextAPI/auth';

const VideoUpload = ({closeShow}) => {
  const [files, setFiles] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [showProgress, setShowProgress] = useState(false);

  const [auth, setAuth] = useAuth();

  const DragOverHandler = (e) => {
    e.preventDefault();
  };

  const dropHandler = (e) => {
    e.preventDefault();
    
    setFiles(e.dataTransfer.files)
    console.log(files)
  }
  
  const inputRef = useRef()

  const videoUploadHandler = async (e) => {
    try{
      const formData = new FormData();
      formData.append("videoFile", files)
      formData.append("thumbnail", thumbnail)
      formData.append("title", title)
      formData.append("description", description)

      const res = await axios.post("http://localhost:8000/api/v1/videos", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.accessToken}`,
        }
      })
      console.log(res);
      if(res.status === 200){
        alert("video uploaded successfully")
        closeShow(false);
      }

    }catch(error){
      console.log(error);
    }

  }
  
  return (
    
    <div>
      <div className="bg-wrraper"></div>
      <div className="model">
        <div className='drag-drop-container'
          onDragOver={DragOverHandler}
          onDrop={dropHandler}
        >
          <h1>Drag and Drop to upload</h1>
          <h1 className='or'>or</h1>
          <input type='file' onChange={(e) => setFiles(e.target.files[0])} hidden ref={inputRef}/>
          <button className='button' onClick={() => inputRef.current.click()}>Upload</button>
          <p>{files?.name}</p>
        </div>
        <div>
          <input className='file-input' type="file" onChange={(e) => setThumbnail(e.target.files[0])} placeholder='Upload video thumbnail'/>
        </div>
        <div className='title-input'>
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Title of Video'/>
        </div>
        <div className='text-area'>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter the video description'></textarea>
        </div>
        <div className='button-group'>
        <button className='button space' onClick={() => closeShow()}>close</button>
        <button className='button' onClick={videoUploadHandler}>Upload</button>
        </div>
      </div>
    </div>
    
  )
}

export default VideoUpload