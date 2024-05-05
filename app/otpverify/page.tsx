"use client"

import React, { useState, useEffect } from 'react';
import styles from './otpVerify.module.css';

function OtpVerify() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!sessionStorage.getItem('userid')) {
      window.location.href = '/login';
    }
  }, [])

  const handleOtpVerification = async () => {
    const userid = sessionStorage.getItem('userid')
    try {
      const response = await fetch('https://assignment-server-zx9x.onrender.com/verifyotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp,userid : userid }),
      });

      if (!response.ok) {
        throw new Error('Failed to verify OTP');
      }

      const data = await response.json();

      if(data.condition == false){
        setError('Failed to verify OTP');
      }else{
        console.log('OTP verification response:', data);
        setError('')
        window.location.href = '/login'
      }
      // Handle OTP verification success
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Failed to verify OTP');
    }
  };

  return (
    <div className={styles.otpVerifyContainer}>
      <h1 className={styles.otpVerifyHeader}>Enter the OTP</h1>
      <div className={styles.otpVerifyForm}>
        <div className={styles.inputField}>
          <input
            type='text'
            placeholder='Enter OTP'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={4}
            pattern="[0-9]*"
          />
        </div>
        {error && <p className={styles.errorMsg}>{error}</p>}
        <input
          type='button'
          value='Verify'
          onClick={handleOtpVerification}
        />
      </div>
    </div>
  );
}

export default OtpVerify;
