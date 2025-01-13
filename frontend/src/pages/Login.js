import React, { useState } from "react";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const goToSignup=()=>{
    navigate('/');
  }

  // Validate email format
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Validation checks
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError(""); // Clear error before API call

    try {
      const response = await axios.post("http://localhost:3500/auth", formData);
      const { accessToken } = response.data;

      // Save the access token
      localStorage.setItem("accessToken", accessToken);

      // Redirect to home or dashboard
      alert(`Welcome, ${email}!`);
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter your email"
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" style={styles.button}>Login</button>
        <button style={styles.button} onClick={goToSignup}>Don't have an account? SignUp</button>
      </form>
    </div>
  );
}

export default LoginPage;

// Styling
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
    height:'100vh',
    justifyContent:'center',
  },
  form: {
    width:'100%',
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
    textAlign: "center",
  },
  
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
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
  error: {
    color: "red",
    marginBottom: "10px",
    textAlign: "center",
  },
};