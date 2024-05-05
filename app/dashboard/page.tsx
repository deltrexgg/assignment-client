"use client"

import React, { useState, useEffect } from 'react';
import styles from './dashboard.module.css'; // Import CSS module

function Dashboard() {
  const [loginHistory, setLoginHistory] = useState([]);
  const [username, setUsername] = useState('')

  useEffect(() => {
    if (!sessionStorage.getItem('userid')) {
      window.location.href = '/login';
      //redirect
    }

    const ws = new WebSocket('wss://assignment-server-zx9x.onrender.com');
    ws.onopen = () => {
      console.log('WebSocket connection established');
      ws.send(JSON.stringify({ type: 'get_login_history', uid: sessionStorage.getItem('userid') }));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'login_history') {
        console.log(message);
        setLoginHistory(message.data);
        setUsername(message.username+"'s")
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1>{username} Dashboard</h1>
      <input type="button" value="Log Out" onClick={handleLogout} />
      <div className={styles.historyContainer}>
        <h2>Login History</h2>
        <ul className={styles.historyList}>
          {loginHistory.map((login, index) => (
            <li key={index}>{login}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
