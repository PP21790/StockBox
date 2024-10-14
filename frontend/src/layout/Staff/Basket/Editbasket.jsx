
import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DynamicForm from '../../../components/DynamicForm';
import { Updatebasket, Viewbasket } from '../../../Services/Admin';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';





const fieldConfigurations = [
  { col_size: 4, name: 'price', label: 'Price', type: 'number', placeholder: 'Enter price' },
  { col_size: 4, name: 'title', label: 'Title', type: 'text', placeholder: 'Enter title' },
  { col_size: 4, name: 'accuracy', label: 'Accuracy', type: 'number', placeholder: 'Enter accuracy' },
  { col_size: 4, name: 'mininvamount', label: 'Minimum Investment Amount', type: 'number', placeholder: 'Enter minimum investment amount' },
  { col_size: 4, name: 'portfolioweightage', label: 'Portfolio Weightage', type: 'number', placeholder: 'Enter portfolio weightage' },
  { col_size: 4, name: 'themename', label: 'Theme Name', type: 'text', placeholder: 'Enter theme name' },
  { col_size: 6, name: 'returnpercentage', label: 'Return Percentage', type: 'number', placeholder: 'Enter Return Percentage' },
  { col_size: 6, name: 'holdingperiod', label: 'Holding Period', type: 'text', placeholder: 'Enter Holding Period' },
  { col_size: 6, name: 'potentialleft', label: 'Potential Left', type: 'text', placeholder: 'Enter Potential Left' },
  { col_size: 6, name: 'description', label: 'Description', type: 'text', placeholder: 'Enter description' },
  {
    col_size: 12, name: 'Stock', label: 'Stock', type: 'Stock', placeholder: 'Add Stock',
    data: [{ stocks: '', pricerange: '', stockweightage: '', entryprice: '', exitprice: '', exitdate: '', comment: '' }]
  },
];




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
  Stock: Yup.array().of(
    Yup.object().shape({
      stocks: Yup.string().required('Stocks are required'),
      pricerange: Yup.string().required('Price range is required'),
      stockweightage: Yup.string().required('Stock weightage is required'),
      entryprice: Yup.string().required('Entry price is required'),
      exitprice: Yup.string().required('Exit price is required'),
      exitdate: Yup.string().required('Exit date is required'),
      comment: Yup.string().required('Comment is required'),
    })
  ),
});

const Editbasket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user_id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const [initialValues, setInitialValues] = useState({
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
    Stock: [{ stocks: '', pricerange: '', stockweightage: '', entryprice: '', exitprice: '', exitdate: '', comment: '' }],
  });

  useEffect(() => {
    getbasketdetail();
  }, []);

  const getbasketdetail = async () => {
    try {
      const response = await Viewbasket(id, token);
      if (response.status) {
        const basketData = response.data;
        const updatedInitialValues = {
          title: basketData.title || '',
          description: basketData.description || '',
          accuracy: basketData.accuracy || '',
          price: basketData.price || '',
          mininvamount: basketData.mininvamount || '',
          portfolioweightage: basketData.portfolioweightage || '',
          themename: basketData.themename || '',
          returnpercentage: basketData.returnpercentage || '',
          holdingperiod: basketData.holdingperiod || '',
          potentialleft: basketData.potentialleft || '',
          Stock: basketData.groupedData || [{ stocks: '', pricerange: '', stockweightage: '', entryprice: '', exitprice: '', exitdate: '', comment: '' }],
        };
        setInitialValues(updatedInitialValues);
      }
    } catch (error) {
      console.log("Error fetching basket details:", error);
    }
  };

  const onSubmit = async (values) => {
  
    const req = {
      title: values.title,
      description: values.description,
      accuracy: values.accuracy,
      price: values.price,
      mininvamount: values.mininvamount,
      portfolioweightage: values.portfolioweightage,
      themename: values.themename,
      id: id,
      Stock: values.Stock,
    };
   

    try {
      const response = await Updatebasket(req, token);
      if (response.status) {
        Swal.fire({
          title: "Update Successful!",
          text: response.message,
          icon: "success",
          timer: 1500,
          timerProgressBar: true,
        });
        setTimeout(() => {
          navigate("/staff/basket");
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
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}  
      >
        {formikProps => (
          <DynamicForm
            fields={fieldConfigurations}
            formik={formikProps}
            btn_name="Submit"
            sumit_btn={true}
            page_title="Edit Basket"
            btn_name1="Cancel"
            btn_name1_route="/staff/basket"
            showAddRemoveButtons={true} 
            
          />
        )}
      </Formik>
    </div>
  );
};

export default Editbasket;

