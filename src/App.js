import './App.css';
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/login/Login';
import Registor from './pages/registor/Registor';
import Default from './pages/default/Default';
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import PlayVideo from './pages/playVideo/PlayVideo';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/registor" element={<Registor/>}/>
        <Route path="*" element={<Default/>}/>
        <Route path="forgetpassword" element={<ForgotPassword/>}/>
        <Route path="/playVideo" element={<PlayVideo/>}/>
      </Routes>
    </>
  );
}

export default App;
