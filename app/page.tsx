"use client"

import React, { useState } from 'react';
import styles from './page.module.css'; 
import Link from 'next/link';

function Page() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSignUp = async () => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError('Password must contain at least 8 characters, including at least one letter and one number');
      return;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Clear error if validation passes
    setError('');

    try {
      const response = await fetch('https://assignment-server-zx9x.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then(response => response.json())
      .then(data => {
        if(data.condition == true){
          console.log("User Id - "+data.userid)
          sessionStorage.setItem("userid", data.userid)
          window.location.href = '/otpverify';
        }else if(data.condition == false){
          setError(data.message)
        }
      });


      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className={styles.registrationContainer}>
      <h1 className={styles.registrationHeader}>Register Page</h1>
      <div className={styles.registrationForm}>
        <div className={styles.inputField}>
          <label>Name:</label>
          <input type='text' name='name' value={formData.name} onChange={handleInputChange} />
        </div>
        <div className={styles.inputField}>
          <label>Email:</label>
          <input type='text' name='email' value={formData.email} onChange={handleInputChange} />
        </div>
        <div className={styles.inputField}>
          <label>Password:</label>
          <input type='password' name='password' value={formData.password} onChange={handleInputChange} />
        </div>
        <div className={styles.inputField}>
          <label>Confirm Password:</label>
          <input type='password' name='confirmPassword' value={formData.confirmPassword} onChange={handleInputChange} />
        </div>
        {error && <p className={styles.errorMsg}>{error}</p>}
        <input type='button' value="Sign Up" onClick={handleSignUp} /><br/>
        <Link href='/login'>Log In ?</Link>
      </div>
    </div>
  );
}

export default Page;
