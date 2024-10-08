import React from 'react';

const FreetrialStatus = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', 
    height: '100vh', 
    backgroundColor: '#f5f5f5', 
    borderRadius: '8px', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
    padding: '20px',
  };

  const selectStyle = {
    padding: '10px',
    marginTop: '15px', 
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px', 
    width: '150px', 
  };

  return (
    <div style={containerStyle}>
      <h2>Free Trial Status</h2>
      <select style={selectStyle}>
        <option value="" selected>
          Select days
        </option>
        {[...Array(7)].map((_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1} day{index > 0 ? 's' : ''}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FreetrialStatus;
