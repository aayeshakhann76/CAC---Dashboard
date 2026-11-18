import React, { useState } from 'react';
import './UploadForm.css';

export default function UploadForm({ onDataUploaded }) {
  const [channel, setChannel] = useState('');
  const [spend, setSpend] = useState('');
  const [customers, setCustomers] = useState('');
  const [cltv, setCltv] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!channel || !spend || !customers || !cltv) {
      setMessage('Please fill all fields');
      return;
    }

    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const response = await fetch('http://127.0.0.1:5000/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel,
          spend: parseFloat(spend),
          customers: parseInt(customers),
          cltv: parseFloat(cltv),
          user_email: currentUser?.email
        })
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        if (onDataUploaded) onDataUploaded();
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }

    setChannel('');
    setSpend('');
    setCustomers('');
    setCltv('');
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2 className="upload-title">Upload Campaign Data</h2>
        <form onSubmit={handleSubmit} className="upload-form">
          <label>Channel</label>
          <input type="text" value={channel} onChange={(e) => setChannel(e.target.value)} placeholder="e.g., Facebook" required />
          <label>Spend (₹)</label>
          <input type="number" value={spend} onChange={(e) => setSpend(e.target.value)} placeholder="Amount spent" required min="0" step="0.01" />
          <label>Customers Acquired</label>
          <input type="number" value={customers} onChange={(e) => setCustomers(e.target.value)} placeholder="Number of customers" required min="0" />
          <label>CLTV (₹)</label>
          <input type="number" value={cltv} onChange={(e) => setCltv(e.target.value)} placeholder="Customer Lifetime Value" required min="0" step="0.01" />
          <button type="submit" className="upload-btn">Upload</button>
          {message && <p className="upload-message">{message}</p>}
        </form>
      </div>
    </div>
  );
}
