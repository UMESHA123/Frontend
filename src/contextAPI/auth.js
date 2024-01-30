import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();



const AuthProvider = ({children}) =>{

    const [videoId, setVideoId] = useState('');
    const [videoObj, setVideoObj] = useState({});
    const [sidebarState, setSidebarState] = useState(false);
    const [userDetailes, setUserDetailes] = useState({userDetail: null})
    const [videos, setVideos] = useState([]);
    const [userid, setUserid] = useState(0);
    const [auth, setAuth] = useState({
        user: null,
        accessToken: null
    })
    useEffect( () => {
        const data = localStorage.getItem("auth")
        if(data){
            const getData = JSON.parse(data)
            setAuth({
                ...auth,
                user: getData.user.username,
                accessToken: getData.accessToken
            })
        }
    }, [])
    return (    
        <AuthContext.Provider value={{userid, setUserid, auth, setAuth, videoId, setVideoId, videoObj, setVideoObj, sidebarState, setSidebarState, userDetailes, setUserDetailes, videos, setVideos} }>
            {children}
        </AuthContext.Provider>
    )
}
const useAuth = () => useContext(AuthContext)

export {useAuth, AuthProvider}