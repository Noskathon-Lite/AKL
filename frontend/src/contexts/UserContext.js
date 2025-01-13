import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  // User state
  const [user, setUser] = useState(null); // Assuming single user object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken'); // Ensure token exists

        console.log("user provider",token)
        const response = await axios.get('http://localhost:3500/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("user provider", response.data);
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch user');
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;