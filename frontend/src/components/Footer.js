import React from 'react';
import {Link} from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="bg-black text-white py-4">
      <div className="text-center">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
        <p className="mt-2">
          <Link to="/privacy" className="text-white hover:underline mx-2" aria-label="Privacy Policy">Privacy Policy</Link>
          |
          <Link to="/terms" className="text-white hover:underline mx-2" aria-label="Terms of Service">Terms of Service</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
