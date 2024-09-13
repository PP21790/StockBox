import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';
import { Addbasketplan, GetService, GetStockDetail } from '../../../Services/Admin';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Addbasket = () => {
  const navigate = useNavigate();
  const user_id = localStorage.getItem('id');
  const token = localStorage.getItem('token');

  const [serviceList, setServiceList] = useState([]);
  const [stockList, setStockList] = useState([]);
  const [dynamicSections, setDynamicSections] = useState([{ id: Date.now(), values: {} }]);

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
    if (!values.title) errors.title = 'Please enter Title';
    if (!values.description) errors.description = 'Please enter Description';
    if (!values.accuracy) errors.accuracy = 'Please enter Accuracy';
    if (!values.price) errors.price = 'Please enter Price';
    if (!values.mininvamount) errors.mininvamount = 'Please enter Minimum Investment Amount';
    if (!values.portfolioweightage) errors.portfolioweightage = 'Please enter Portfolio Weightage';

    // Validate dynamic sections
    values.dynamicSections.forEach((section, index) => {
      if (!section.stocks) errors[`dynamicSections.${index}.stocks`] = 'Please enter Stocks';
      if (!section.pricerange) errors[`dynamicSections.${index}.pricerange`] = 'Please enter Price Range';
      if (!section.stockweightage) errors[`dynamicSections.${index}.stockweightage`] = 'Please enter Stock Weightage';
      if (!section.entryprice) errors[`dynamicSections.${index}.entryprice`] = 'Please enter Entry Price';
      if (!section.exitprice) errors[`dynamicSections.${index}.exitprice`] = 'Please enter Exit Price';
      if (!section.comment) errors[`dynamicSections.${index}.comment`] = 'Please enter Comment';
      if (!section.retunpercentage) errors[`dynamicSections.${index}.retunpercentage`] = 'Please enter Return Percentage';
      if (!section.holdingperiod) errors[`dynamicSections.${index}.holdingperiod`] = 'Please enter Holding Period';
      if (!section.potentialleft) errors[`dynamicSections.${index}.potentialleft`] = 'Please enter Potential Left';
    });
    if (!values.themename) errors.themename = 'Please enter Theme Name';
    return errors;
  };

  const onSubmit = async (values) => {
    const req = {
      add_by: user_id,
      ...values,
    };

    try {
      const response = await Addbasketplan(req, token);
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
      title: '',
      description: '',
      accuracy: '',
      price: '',
      mininvamount: '',
      portfolioweightage: '',
      dynamicSections: [{ stocks: '', pricerange: '', stockweightage: '', entryprice: '', exitprice: '', comment: '', retunpercentage: '', holdingperiod: '', potentialleft: '' }],
      themename: '',
      add_by: '',
    },
    validate,
    onSubmit,
  });

  // Functions to handle adding/removing sections
  const addSection = () => {
    const newSection = { id: Date.now(), values: {} };
    setDynamicSections([...dynamicSections, newSection]);
    formik.setFieldValue('dynamicSections', [...formik.values.dynamicSections, { stocks: '', pricerange: '', stockweightage: '', entryprice: '', exitprice: '', comment: '', retunpercentage: '', holdingperiod: '', potentialleft: '' }]);
  };

  const removeSection = (id) => {
    const updatedSections = dynamicSections.filter(section => section.id !== id);
    setDynamicSections(updatedSections);
    formik.setFieldValue('dynamicSections', updatedSections.map((_, index) => formik.values.dynamicSections[index]));
  };

  const fields = [
    { name: 'title', label: 'Title', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: 'description', label: 'Description', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: 'accuracy', label: 'Accuracy', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: 'price', label: 'Price', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: 'mininvamount', label: 'Min Investment Amount', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: 'portfolioweightage', label: 'Portfolio Weightage', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: 'themename', label: 'Theme Name', type: 'text', label_size: 12, col_size: 6, disable: false },

    ...dynamicSections.map((section, index) => [
      { name: `dynamicSections[${index}].stocks`, label: 'Stocks', type: 'text', label_size: 12, col_size: 6, disable: false },
      { name: `dynamicSections[${index}].pricerange`, label: 'Price Range', type: 'text', label_size: 12, col_size: 6, disable: false },
      { name: `dynamicSections[${index}].stockweightage`, label: 'Stock Weightage', type: 'text', label_size: 3, col_size: 6, disable: false },
      { name: `dynamicSections[${index}].entryprice`, label: 'Entry Price', type: 'text', label_size: 12, col_size: 6, disable: false },
      { name: `dynamicSections[${index}].exitprice`, label: 'Exit Price', type: 'text', label_size: 12, col_size: 6, disable: false },
      { name: `dynamicSections[${index}].comment`, label: 'Comment', type: 'text', label_size: 12, col_size: 6, disable: false },
      { name: `dynamicSections[${index}].retunpercentage`, label: 'Return Percentage', type: 'text', label_size: 3, col_size: 6, disable: false },
      { name: `dynamicSections[${index}].holdingperiod`, label: 'Holding Period', type: 'text', label_size: 12, col_size: 6, disable: false },
      { name: `dynamicSections[${index}].potentialleft`, label: 'Potential Left', type: 'text', label_size: 12, col_size: 6, disable: false },
    ]).flat(),
  ];

  return (
    <div>
      <div style={{ marginTop: '100px' }}>
        <DynamicForm
          fields={fields}
          page_title="Add Basket"
          btn_name="Add Basket"
          btn_name1="Cancel"
          formik={formik}
          btn_name1_route="/admin/basket"
          additional_field={
            <>
              {dynamicSections.map((section) => (
                <div
                  key={section.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '30px', // Spacing between sections
                    padding: '20px',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9',
                    position: 'relative',
                  }}
                >
                  <DynamicForm
                    fields={fields.filter(field => field.name.startsWith(`dynamicSections[${dynamicSections.indexOf(section)}]`))}
                    formik={{
                      ...formik,
                      values: {
                        ...formik.values,
                        dynamicSections: formik.values.dynamicSections.map((sec, idx) =>
                          idx === dynamicSections.indexOf(section) ? section : sec
                        ),
                      },
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeSection(section.id)}
                    style={{
                      position: 'absolute',
                      bottom: '30px',
                      right: '40px',
                      backgroundColor: '#f44336',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '5px 10px',
                      cursor: 'pointer',
                    }}
                  >
                    Remove Section
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSection}
                style={{
                  marginTop: '20px',
                  backgroundColor: '#4caf50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '10px 20px',
                  cursor: 'pointer',
                }}
              >
                Add Section
              </button>
            </>
          }
        />
      </div>
    </div>
  );
};

export default Addbasket;
