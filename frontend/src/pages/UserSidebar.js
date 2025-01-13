import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// Import icons
import { IoMdArrowForward } from 'react-icons/io';
// Import User context
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';

const UserSidebar = () => {

  const handlelogout = async () => {
    try {
      // Make a POST request to the logout endpoint
      const response = await axios.get('http://localhost:3500/logout');
  
      if (response.status === 200) {
        // Clear client-side storage
        localStorage.removeItem('token');
        sessionStorage.removeItem('user');
  
        // Redirect to login or home page
        window.location.href = '/login';
      } else {
        alert('Failed to log out. Please try again.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  const { user } = useContext(UserContext); // Access user information from UserContext

  return (
    <div className="w-full h-full bg-green-50 shadow-lg z-50 fixed top-0 left-0 flex flex-col px-6 py-4 lg:px-[35px]">
      {/* Header */}
      <div className="flex items-center justify-between py-6 border-b border-green-400">
        <div className="uppercase text-sm font-semibold text-green-700">User Information</div>
        {/* Close icon */}
        <div className="cursor-pointer w-8 h-8 flex justify-center items-center text-green-700">
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>

      {/* User Details */}
      <div className="flex flex-col gap-y-4 py-4 overflow-auto">
        {user ? (
          <>
            <div className="text-lg font-semibold text-green-700">Welcome, {user.firstname}!</div>
            <div className="text-sm text-green-600">
              <span className="font-semibold">Email:</span> {user.email}
            </div>
            <div className="text-sm text-green-600">
              <span className="font-semibold">Role:</span> {user.role}
            </div>
            {/* Add more user details as needed */}
          </>
        ) : (
          <div className="text-sm text-green-600">No user information available.</div>
        )}
      </div>

      {/* Additional Links */}
      <Link to={'/postpage'}
                  className="bg-green-600 text-white text-center py-2 px-4 rounded hover:bg-green-700"
                >
                  Post Products
                </Link>
      <div className="flex flex-col gap-y-3 py-4 mt-4">
        
        <button onClick={handlelogout} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
          Logout
        </button>

      </div>
    </div>
  );
};

export default UserSidebar;
