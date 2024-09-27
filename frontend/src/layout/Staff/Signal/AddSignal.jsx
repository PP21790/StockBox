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



  const formik = useFormik({
    initialValues: {
      add_by:user_id,
      service: '',
      price:'',
      stock: '',
      tag1: '',
      tag2: '',
      tag3: '',
      stoploss: '',
      report: '',
      description:'',
      callduration: '',
      calltype: '',
      // callperiod:''
    },
    validate:(values) => {
      const errors = {};
      if (!values.service) errors.service = 'Please select a service';
      if (!values.stock) errors.stock = 'Please select a stock';
      if (!values.price) errors.price = 'Please select a price';
      if (!values.tag1) errors.tag1 = 'Please enter Target-1';
      if (!values.tag2) errors.tag2 = 'Please enter Target-2';
      if (!values.tag3) errors.tag3 = 'Please enter Target-3';
      if (!values.stoploss) errors.stoploss = 'Please enter Stoploss';
      if (!values.callduration) errors.callduration = 'Please enter Call duration';
      if (!values.calltype) errors.calltype = 'Please enter Call Calltype';
      if (!values.callperiod) errors.callperiod = 'Please enter call Period';
      return errors;
    },

    
    onSubmit: async (values) => {
      const req = {
        add_by:user_id,
        service: values.service,
        stock: values.stock,
        price: values.price,
        tag1: values.tag1,
        tag2: values.tag2,
        tag3: values.tag3,
        stoploss: values.stoploss,
        description: values.description,
        report: values.report ,
        calltype: values.calltype,
        callduration: values.callduration,
        callperiod: values.callperiod
  
      };
      try {
        const response = await AddSignalByAdmin(req, token);
        if (response.status) {
          Swal.fire({
            title: 'Create Successful!',
            text: response.message,
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
          });
          setTimeout(() => {
            navigate('/admin/signal');
          },  2000);
        } else {
          Swal.fire({
            title: 'Error',
            text: response.message,
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
    }
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
      name: 'expirydate',
      label: 'Expiry Date',
      type: 'select',
      label_size: 12,
      col_size: 6,
      options: [
        { label: '01/02/24', value: '01/03/25' },
        { label: '01/04/24', value: '01/05/25' },
      ],
      disable: false,
    },
    {
      name: 'price',
      label: 'Price',
      type: 'text',
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
      ],
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: 'callduration',
      label: 'Trade duration',
      type: 'select',
      options: [
        { label: 'Long Term', value: 'Long Term' },
        { label: 'Medium Term', value: 'Medium Term' },
        { label: 'Short Term', value: 'Short Term' },
        { label: 'Intraday', value: 'Intraday' },
      ],
      options: [
        { label: 'Interaday', value: 'Interaday' },
        { label: 'Short Term', value: 'Short Term' },
        { label: 'Still Expiry Date', value: 'Still Expiry Date' },
       
      ],
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
     
     
      label_size: 12,
      col_size: 6,
      disable: false,
    },
    {
      name: 'tag1',
      label: 'Target-1',
      type: 'number',
      label_size: 6,
      col_size: 3,
      disable: false,
    },
    {
      name: 'tag2',
      label: 'Target-2',
      type: 'number',
      label_size: 12,
      col_size: 3,
      disable: false,
    },
    {
      name: 'tag3',
      label: 'Target-3',
      type: 'number',
      label_size: 12,
      col_size: 3,
      disable: false,
    },
    {
      name: 'stoploss',
      label: 'Stoploss',
      type: 'number',
      label_size: 12,
      col_size: 3,
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
      type: 'text5',
      label_size: 12,
      col_size: 6,
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
          sumit_btn={true}
          btn_name1_route="/admin/signal"
          additional_field={<></>}
        />
      </div>
    </div>
  );
};

export default AddSignal;
