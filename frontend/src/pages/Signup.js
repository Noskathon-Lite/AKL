import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    role: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  // Validate email
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Validate password
  const isValidPassword = (password) => {
    return password.length >= 6; // Minimum password length is 6
  };

  //go to login
  const goToLogin=()=>{
    navigate('/login');
  }

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, role, email, password } = formData;

    if (!firstname || !lastname || !role || !email || !password) {
      setMessage("All fields are required!");
      return;
    }

    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!isValidPassword(password)) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    if (role !== "farmer" && role !== "customer") {
      setMessage("Please select a valid role.");
      return;
    }
    navigate('/login');
    setMessage("Sign up successful!");

    try {
        const response = await axios.post('http://localhost:3500/register', formData);
        const { accessToken } = response.data;

        // Save the access token (you can store it in localStorage or context)
        localStorage.setItem('accessToken', accessToken);
        console.log("Form Data:", formData);
        // Redirect to home or dashboard
        navigate('/login');
    } catch (error) {
        console.error('Signup error:', error);
        setMessage(error.response?.data?.message || 'An error occurred');
    }
    console.log("Form Data:", formData);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sign Up</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="firstname" style={styles.label}>First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="lastname" style={styles.label}>Last Name:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="role" style={styles.label}>Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Select Role</option>
            <option value="farmer">Farmer</option>
            <option value="customer">Customer</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Sign Up</button>
        <button style={styles.button} onClick={goToLogin}>Already have an account? Login</button>
        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#F5FFFA',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    width:'100%',
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "10px",
    width:'100%',
  },
  label: {
    display: 'block',
      fontSize: '16px',
      marginBottom: '5px',
      color: '#333',
  },
  input: {
    width: '100%',
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      outline: 'none',
  },
  button: {
    width: '100%',
    padding: '12px 20px ',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
    marginBottom: '10px',
    textAlign:'center',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  message: {
    color: '#ff0000',         
    marginTop: '10px',
    fontSize: '14px',
    textAlign: "center",
  },
};
export default SignUp;
