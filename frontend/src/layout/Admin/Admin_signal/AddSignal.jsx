import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';
import { AddSignalByAdmin, GetService, GetStockDetail } from '../../../Services/Admin';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddSignal = () => {
  const navigate = useNavigate();
  const user_id = localStorage.getItem('id');
  const token = localStorage.getItem('token');

  const [serviceList, setServiceList] = useState([]);
  const [stockList, setStockList] = useState([]);

  useEffect(() => {
    fetchAdminServices();
    fetchStockList();
  }, []);

  const fetchAdminServices = async () => {
    try {
      const response = await GetService(token);
      if (response.status) {
        setServiceList(response.data);
      }
    } catch (error) {
      console.log('Error fetching services:', error);
    }
  };

  const fetchStockList = async () => {
    try {
      const response = await GetStockDetail(token);
      if (response.status) {
        setStockList(response.data);
      }
    } catch (error) {
      console.log('Error fetching stock list:', error);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.service) errors.service = 'Please select a service';
    if (!values.stock) errors.stock = 'Please select a stock';
    if (!values.rate) errors.rate = 'Please select a rate';
    if (!values.target1) errors.target1 = 'Please enter Target-1';
    if (!values.target2) errors.target2 = 'Please enter Target-2';
    if (!values.target3) errors.target3 = 'Please enter Target-3';
    if (!values.stoploss) errors.stoploss = 'Please enter Stoploss';
    if (!values.report) errors.report = 'Please upload a report';
    if (!values.description) errors.description = 'Please enter description';
    if (!values.callduration) errors.callduration = 'Please enter Call duration';
    if (!values.calltype) errors.calltype = 'Please enter Call Calltype';
    return errors;
  };

  const onSubmit = async (values) => {
    const req = {
      add_by: user_id,
      service: values.service,
      stock: values.stock,
      price: values.rate,
      tag1: values.target1,
      tag2: values.target2,
      tag3: values.target3,
      stoploss: values.stoploss,
      description: values.description,
      report: values.report,
      calltype: values.calltype,
      callduration: values.callduration
    };

    try {
      const response = await AddSignalByAdmin(req, token);
      if (response.status) {
        Swal.fire({
          title: 'Create Successful!',
          text: response.msg,
          icon: 'success',
          timer: 1500,
          timerProgressBar: true,
        });
        setTimeout(() => {
          navigate('/admin/signal');
        }, 1500);
      } else {
        Swal.fire({
          title: 'Error',
          text: response.msg,
          icon: 'error',
          timer: 1500,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'An unexpected error occurred. Please try again later.',
        icon: 'error',
        timer: 1500,
        timerProgressBar: true,
      });
    }
  };



  const formik = useFormik({
    initialValues: {
      service: '',
      action: '',
      stock: '',
      rate: '',
      target1: '',
      target2: '',
      target3: '',
      stoploss: '',
      report: null,  
      description: '',
      callduration: '',
      calltype: '' 
    },
    validate,
    onSubmit,
  });

  const fields = [
    {
      name: 'service',
      label: 'Select Service',
      type: 'select',
      options: serviceList.map((item) => ({
        label: item.title,
        value: item._id,
      })),
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: 'stock',
      label: 'Select Stock',
      type: 'select',
      options: stockList.map((item) => ({
        label: item.title,
        value: item._id,
      })),
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: 'calltype',
      label: 'Type',
      type: 'select',
      options: [
        { label: 'Buy', value: 'buy' },
        { label: 'Sell', value: 'sell' },
        { label: 'Hold', value: 'hold' },
      ],
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: 'rate',
      label: 'Rate',
      type: 'select',
      options: [
        { label: '5%', value: '1' },
        { label: '10%', value: '0' },
        { label: '50%', value: '2' },
      ],
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: 'target1',
      label: 'Target-1',
      type: 'number',
      label_size: 6,
      col_size: 6,
      disable: false,
    },
    {
      name: 'target2',
      label: 'Target-2',
      type: 'number',
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: 'target3',
      label: 'Target-3',
      type: 'number',
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: 'stoploss',
      label: 'Stoploss',
      type: 'number',
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: 'callduration',
      label: 'Call duration',
      type: 'text',
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: 'report',
      label: 'Report',
      type: 'file2', 
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      label_size: 12,
      col_size: 15,
      disable: false,
    },
   
  ];

  return (
    <div>
      <div style={{ marginTop: '100px' }}>
        <DynamicForm
          fields={fields}
          page_title="Add Signal"
          btn_name="Add Signal"
          btn_name1="Cancel"
          formik={formik}
          btn_name1_route="/admin/signal"
          additional_field={<></>}
        />
      </div>
    </div>
  );
};

export default AddSignal;
