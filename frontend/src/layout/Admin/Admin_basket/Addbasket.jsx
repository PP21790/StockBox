import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DynamicForm from '../../../components/DynamicForm';
import { Addbasketplan } from '../../../Services/Admin';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const fieldConfigurations = [

 
  { col_size: 4, name: 'title', label: 'Basket Name', type: 'text', placeholder: 'Enter Basket Name' },
  { col_size: 4, name: 'themename', label: 'Theme Name', type: 'text', placeholder: 'Enter theme name' },
  { col_size: 4, name: 'cagr', label: 'CAGR', type: 'number', placeholder: 'Enter CAGR' },
  { col_size: 4, name: 'amount', label: 'Amount', type: 'number', placeholder: 'Enter Amount' },
  { 
    col_size: 4, 
    name: 'accuracy', 
    label: 'Frequency', 
    type: 'select', 
    placeholder: 'Select accuracy', 
    options: [
      { value: 'high', label: 'High' },
      { value: 'medium', label: 'Medium' },
      { value: 'low', label: 'Low' }
    ]
  },
   { col_size: 4, name: 'next_rebalance_date', label: 'Next Rebalance Date', type: 'number', placeholder: 'Enter Next Rebalance Date' },
  { col_size: 4, name: 'mininvamount', label: 'Minimum Investment Amount', type: 'number', placeholder: 'Enter minimum investment amount' },
  { col_size: 4, name: 'portfolioweightage', label: 'Portfolio Weightage', type: 'number', placeholder: 'Enter portfolio weightage' },
  { col_size: 4, name: 'validity', label: 'Validity', type: 'select', placeholder: 'Enter validity' },
  // { col_size: 6, name: 'returnpercentage', label: 'Return Percentage', type: 'number', placeholder: 'Enter Return Percentage' },
  // { col_size: 6, name: 'holdingperiod', label: 'Holding Period', type: 'text', placeholder: 'Enter Holding Period' },
  // { col_size: 6, name: 'potentialleft', label: 'Potential Left', type: 'text', placeholder: 'Enter Potential Left' },
  { col_size: 4, name: 'description', label: 'Description', type: 'text', placeholder: 'Enter description' },
  
];

const initialValues = {
  title: '',
  description: '',
  accuracy: '',
  price: '',
  mininvamount: '',
  portfolioweightage: '',
  themename: '',
  returnpercentage: '',
  holdingperiod: '',
  potentialleft: '',
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  accuracy: Yup.string().required('Accuracy is required'),
  price: Yup.string().required('Price is required'),
  mininvamount: Yup.string().required('Minimum Investment Amount is required'),
  portfolioweightage: Yup.string().required('Portfolio Weightage is required'),
  themename: Yup.string().required('Theme Name is required'),
  returnpercentage: Yup.string().required('Return percentage is required'),
  holdingperiod: Yup.string().required('Holding period is required'),
  potentialleft: Yup.string().required('Potential left is required'),
  
});

const AddBasket = () => {


  const navigate = useNavigate();
  const user_id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const onSubmit = async (values) => {

    const req = {
      title: values.title,
      description: values.description,
      accuracy: values.accuracy,
      price: values.price,
      mininvamount: values.mininvamount,
      portfolioweightage: values.portfolioweightage,
      themename: values.themename,
      add_by: user_id,
      Stock: values.Stock
    };


  
    try {
      const response = await Addbasketplan(req, token);
      console.log(response);
      
      if (response.status) {
        Swal.fire({
          title: "Create Successful!",
          text: response.message,
          icon: "success",
          timer: 1500,
          timerProgressBar: true,
        });
        setTimeout(() => {
          navigate("/admin/basket");
        }, 1500);
      } else {
        Swal.fire({
          title: "Error",
          text: response.message,
          icon: "error",
          timer: 1500,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred. Please try again later.",
        icon: "error",
        timer: 1500,
        timerProgressBar: true,
      });
    }
  };

  
  
  return (


    <div className='page-content'>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formikProps => (
        <DynamicForm
          fields={fieldConfigurations}
          formik={formikProps}
          btn_name="Submit"
          sumit_btn={true}
          page_title="Add Basket"
          btn_name1="Cancel"
          btn_name1_route="/admin/basket"
          showAddRemoveButtons={true} 
        />
      )}
    </Formik>
  </div>
  );
};

export default AddBasket;
