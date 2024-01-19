import { useEffect,useContext } from "react";
import {Link} from "react-router-dom";
import { UserContext } from "./UserContext";
import Cookies from 'js-cookie';

export default function Header(){
    const {setUserInfo, userInfo} = useContext(UserContext);
    useEffect(() => {
      console.log('useEffect triggered');
  
      const token = Cookies.get('token');
  
      if (!token) {
          console.log('No token found');
          return;
      }
  
      console.log('Fetching profile...');
  
      fetch('https://t-bsp-api.vercel.app/profile', {
          credentials: 'include',
      })
      .then(response => response.json())
      .then(userInfo => {
          console.log('Profile data:', userInfo);
          setUserInfo(userInfo);
      })
      .catch(error => {
          console.error('Error fetching profile:', error);
          // Handle the error as needed
      });
  }, []);
  

    function logout(){
        fetch("https://t-bsp-api.vercel.app/logout", {
            credentials:'include',
            method: 'POST',
        })
        setUserInfo(null);
    }
    const username = userInfo?.username;

    return (
        <header>
          <Link to="/" className="logo">cobble logs</Link>
          <nav>
            {username && (
              <>
              <h2>Hi! {username}</h2>
                <Link to="/analysis" className="nav-button">Analysis</Link>
                <Link to="/create" className="nav-button">Create new log</Link>
                <Link onClick={logout} className="nav-button">Logout</Link>
              </>
            )}
            {!username && (
              <>
                <Link to="/analysis" className="nav-button">Analysis</Link>
                <Link to="/login" className="nav-button">Login</Link>
                <Link to="/register" className="nav-button">Register</Link>
              </>
            )}
          </nav>
        </header>
      );
}