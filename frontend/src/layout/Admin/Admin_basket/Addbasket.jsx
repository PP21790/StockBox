import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DynamicForm from '../../../components/DynamicForm';

const fieldConfigurations = [
  { col_size: 4, name: 'title', label: 'Title', type: 'text', placeholder: 'Enter title' },

  { col_size: 4, name: 'accuracy', label: 'Accuracy', type: 'text', placeholder: 'Enter accuracy' },
  { col_size: 4, name: 'price', label: 'Price', type: 'text', placeholder: 'Enter price' },
  { col_size: 4, name: 'mininvamount', label: 'Minimum Investment Amount', type: 'text', placeholder: 'Enter minimum investment amount' },
  { col_size: 4, name: 'portfolioweightage', label: 'Portfolio Weightage', type: 'text', placeholder: 'Enter portfolio weightage' },
  { col_size: 4, name: 'themename', label: 'Theme Name', type: 'text', placeholder: 'Enter theme name' },
  { col_size: 6, name: 'description', label: 'Description', type: 'text5', placeholder: 'Enter description' },
  { col_size: 12, name: 'Basket', label: 'Basket', type: 'Basket', placeholder: 'Add Basket', data: [{ stocks: '', pricerange: '', stockweightage: '', entryprice: '', exitprice: '', comment: '', returnpercentage: '', holdingperiod: '', potentialleft: '' }] },
];

const initialValues = {
  title: '',
  description: '',
  accuracy: '',
  price: '',
  mininvamount: '',
  portfolioweightage: '',
  themename: '',
  add_by: '',
  Basket: [{ stocks: '', pricerange: '', stockweightage: '', entryprice: '', exitprice: '', comment: '', returnpercentage: '', holdingperiod: '', potentialleft: '' }],
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  accuracy: Yup.string().required('Accuracy is required'),
  price: Yup.string().required('Price is required'),
  mininvamount: Yup.string().required('Minimum Investment Amount is required'),
  portfolioweightage: Yup.string().required('Portfolio Weightage is required'),
  themename: Yup.string().required('Theme Name is required'),
  add_by: Yup.string().required('Added By is required'),
  Basket: Yup.array().of(
    Yup.object().shape({
      stocks: Yup.string().required('Stocks are required'),
      pricerange: Yup.string().required('Price range is required'),
      stockweightage: Yup.string().required('Stock weightage is required'),
      entryprice: Yup.string().required('Entry price is required'),
      exitprice: Yup.string().required('Exit price is required'),
      comment: Yup.string().required('Comment is required'),
      returnpercentage: Yup.string().required('Return percentage is required'),
      holdingperiod: Yup.string().required('Holding period is required'),
      potentialleft: Yup.string().required('Potential left is required'),
    })
  ),
});

const AddBasket = () => {


  const handleSubmit = (values) => {
   
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
            submitFunction={handleSubmit}
          />
        )}
      </Formik>
    </div>
  );
};

export default AddBasket;
