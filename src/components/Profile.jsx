import React, { useEffect, useState } from 'react';

const Profile = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (storedUser && storedUser.id) {
        try {
          const response = await fetch(`https://dummyjson.com/users/${storedUser.id}`);

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            console.log("response ok for profile page")
          } else {
            console.log("response not ok for profile page")
            setError('Failed to fetch user data.');
          }
        } catch (error) {
            console.log("error in profile page")
          setError('An unexpected error occurred.');
        }
      } else {
        console.log("problem in local storage")
        setError('No user data found. Please log in.');
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='profile-container'>
      <h2>Profile</h2>
      <p>Name: {user.firstName} {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      <p></p>
      {/* Add more user details here if needed */}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Profile;