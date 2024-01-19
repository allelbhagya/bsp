import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('https://t-bsp-api.vercel.app/profile', {
          credentials: 'include',
        });

        if (response.ok) {
          const userData = await response.json();
          setUserInfo(userData);
        } else {
          console.error('Failed to fetch user profile:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setUserInfo]);

  function logout() {
    fetch("https://t-bsp-api.vercel.app/logout", {
      credentials: 'include',
      method: 'POST',
    }).then(() => {
      setUserInfo(null);
    });
  }

  const username = userInfo?.username;

  if (loading) {
    // You might want to display a loading indicator here
    return <div>Loading...</div>;
  }

  return (
    <header>
      <Link to="/" className="logo">
        cobble logs
      </Link>
      <nav>
        {username ? (
          <>
            <h2>Hi! {username}</h2>
            <Link to="/analysis" className="nav-button">
              Analysis
            </Link>
            <Link to="/create" className="nav-button">
              Create new log
            </Link>
            <Link onClick={logout} className="nav-button">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/analysis" className="nav-button">
              Analysis
            </Link>
            <Link to="/login" className="nav-button">
              Login
            </Link>
            <Link to="/register" className="nav-button">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
