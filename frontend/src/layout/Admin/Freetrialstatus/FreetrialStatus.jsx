import React, { useEffect, useState } from 'react';
import { addfreeClient, basicsettinglist } from '../../../Services/Admin';
import Swal from 'sweetalert2';



const FreetrialStatus = () => {
  const token = localStorage.getItem('token');
 
  
  const [data, setData] = useState([]);
  const [addStatus, setAddStatus] = useState({
    id: "",
    freetrial: "" 
  });


  useEffect(() => {
    getApidetail();
  }, []);



  const getApidetail = async () => {
    try {
      const response = await basicsettinglist(token);
      if (response?.status && response?.data) {
        setData(response.data);
        const defaultTrial = response.data.length > 0 ? response.data[0].freetrial : "1";
        setAddStatus({ ...addStatus, freetrial: defaultTrial });
      }
    } catch (error) {
      console.error('Error fetching API details:', error);
    }
  };



  const UpdateClientstatus = async () => {
    try {
      const data = {
        freetrial: addStatus.freetrial
      };

      const response = await addfreeClient(data,token);
      if (response?.status) {
        Swal.fire({
          icon: 'success',
          title: response.message || 'Update Successful!',
          text: 'Your API information was updated successfully.',
          timer: 1500,
          timerProgressBar: true,
        });
  
        getApidetail(); 
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'There was an error updating the API information. Please try again.',
        timer: 1500,
        timerProgressBar: true,
      });
    }
  };





  const handleSelectChange = (event) => {
    setAddStatus({ ...addStatus, freetrial: event.target.value });
  };



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

  const buttonStyle = {
    padding: '10px 15px',
    marginTop: '20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  };





  return (
    <div style={containerStyle}>
      <h2>Free Trial Status</h2>
      <select style={selectStyle} value={addStatus.freetrial} onChange={handleSelectChange}>
        <option value="" disabled>
          Select days
        </option>
        {[...Array(7)].map((_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1} day{index > 0 ? 's' : ''}
          </option>
        ))}
      </select>
      <button style={buttonStyle} onClick={UpdateClientstatus}>
        Update
      </button>
    </div>
  );
};





export default FreetrialStatus;
