import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import Profile from './components/Profile';
function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(storedUser);
      console.log(`previous user without login ${user}`)
    }
  }, []);
  
  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
      //  console.log("response ok")
      //  console.log(data);
        localStorage.setItem('user', JSON.stringify(data));
        setIsAuthenticated(true);
        setUser(data);
      //  console.log(user);
        setError('');
      } else {
        //console.log("response not ok")
        setError(data.message);
      }
    } catch (err) {
     // console.log("error while handle login")
      setError('Something went wrong. Please try again.');
    }
  };
  const handleLogout = () => {
 // console.log("log-out click")
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };
  if (isAuthenticated && user) {
    return <Profile onLogout={handleLogout} />;
  }
  return (
     <Login onLogin={handleLogin} error={error} />
  )
}

export default App;
