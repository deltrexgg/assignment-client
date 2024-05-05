"use client"

import React, { useState, useEffect } from 'react';
import styles from './login.module.css'; // Import CSS module
import Link from 'next/link';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const deviceStatus = async() => {
    let userAgent;
    if (typeof window !== 'undefined') {
      // Access the screen width and height
      const screenWidth = window.screen.width;      
      // Use screen width to infer device type
      if (screenWidth <= 480) {
        userAgent = 'Mobile'
      } else if (screenWidth <= 768) {
        userAgent = 'Tablet'
      } else {
        userAgent = 'Desktop'
      }
    }

    const now = new Date();
    const date = now.toDateString(); // Get current date in format: "DayOfWeek Month Day Year"
    const time = now.toLocaleTimeString(); // Get current time in format: "HH:MM:SS AM/PM"
    return `${date} ${time} - ${userAgent}`
  }

  const handleLogin = () => {
    setError('')

    const ws = new WebSocket('wss://assignment-server-zx9x.onrender.com');
    
    ws.onopen = () => {
      console.log('Connected to server');
      const data = { type: 'login', email, password };
      ws.send(JSON.stringify(data));
    };

    ws.onmessage = async (message) => {
      const data = JSON.parse(message.data);
      console.log(data)
      if (data.type === 'login_success') {
        console.log('Login successful');
        console.log(data.uid)

        sessionStorage.setItem('userid', data.uid)
        const devicestatus = await deviceStatus();

        ws.send(JSON.stringify({type : 'login_status', uid : data.uid, loginstatus : devicestatus}));

       window.location.href = '/dashboard'
      }else if(data.type === 'otpreverify'){
        sessionStorage.setItem('userid', data.uid)
        window.location.href = '/otpverify'
      } else if (data.type === 'Not registered Email') {
        console.log('Login failed:', data.message);
setError(data.message)      
}else{
  console.log(data.message)
  setError("Credentials Don't Match")      
}
      //ws.close();
    };
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginHeader}>Login Page</h1>
      <div className={styles.loginForm}>
        <div className={styles.inputField}>
          <label>Email:</label>
          <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles.inputField}>
          <label>Password:</label>
          <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p className={styles.errorMsg}>{error}</p>}
        <input type='button' value='Log In' onClick={handleLogin} /><br/>
        <Link href='/'>Sign Up ?</Link>
      </div>
    </div>
  );
}

export default Login;
