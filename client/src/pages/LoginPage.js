import { useContext, useState } from "react";
import {Navigate} from 'react-router-dom';
import { UserContext } from "../UserContext";

export default function LoginPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);
    async function login(ev) {
        ev.preventDefault();
      
        try {
          const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',

          });
      
          if (!response.ok) {
            alert('wrong credentials')
            const errorMessage = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
          }
          if(response.ok){
            response.json().then(userInfo =>{
              setUserInfo(userInfo);
              setRedirect(true);
            })

          }
      
          const data = await response.json();
          console.log('Registration successful:', data);
        } catch (error) {
          console.error('Error during registration:', error.message);
        }
      }
      if(redirect){
        return <Navigate to={'/'} />
      }
    return(
        <form className="login" onSubmit={login}>
            <h1>login</h1>
            <input type = "text" 
            placeholder="username" 
            value = {username}
            onChange={ev=> setUsername(ev.target.value)}/>
            <input type="password" 
            placeholder="password"
            value = {password}
            onChange={ev=> setPassword(ev.target.value)}/>
            <button>login</button>
        </form>
    );
}