import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // State to hold form data and errors
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    organization: '',
  });

  const [signinData, setSigninData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [user, setUser] = useState(null); // To store authenticated user info

  // Handle input changes for signup and signin forms
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSigninChange = (e) => {
    const { name, value } = e.target;
    setSigninData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/users/signup', signupData);
      console.log('Signup Success:', response.data);
      alert('Signup successful! Please sign in.');
    } catch (err) {
      console.error('Signup Error:', err);
      setError('Signup failed. Please try again.');
    }
  };

  // Handle signin
  const handleSignin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/users/signin', signinData);
      console.log('Signin Success:', response.data);
      setUser(response.data); // Store authenticated user info

      // Optionally, store JWT token in localStorage for authenticated requests
      localStorage.setItem('token', response.data.access_token);
      alert('Signin successful! Welcome to your Dashboard.');
    } catch (err) {
      console.error('Signin Error:', err);
      setError('Signin failed. Please check your credentials.');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <div className="App">
      <h1>React + NestJS Authentication</h1>

      {user ? (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <button onClick={handleLogout}>Logout</button>
          <div>
            <h3>Dashboard</h3>
            <p>Welcome to your dashboard, {user.name}. You are successfully logged in.</p>
          </div>
        </div>
      ) : (
        <>
          <h2>Signup</h2>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={signupData.name}
              onChange={handleSignupChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signupData.email}
              onChange={handleSignupChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupData.password}
              onChange={handleSignupChange}
              required
            />
            <input
              type="text"
              name="organization"
              placeholder="Organization"
              value={signupData.organization}
              onChange={handleSignupChange}
              required
            />
            <button type="submit">Signup</button>
          </form>

          <h2>Signin</h2>
          <form onSubmit={handleSignin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signinData.email}
              onChange={handleSigninChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signinData.password}
              onChange={handleSigninChange}
              required
            />
            <button type="submit">Signin</button>
          </form>
        </>
      )}

      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;
