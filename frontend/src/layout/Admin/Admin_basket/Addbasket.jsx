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
  const [dynamicSections, setDynamicSections] = useState([{ id: Date.now(), values: { stocks: '', pricerange: '', stockweightage: '', entryprice: '', exitprice: '', comment: '', retunpercentage: '', holdingperiod: '', potentialleft: '' } }]);

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
    const dynamicSectionErrors = values.dynamicSections.reduce((acc, section, index) => {
      const sectionErrors = {};
      
      if (!section.stocks) sectionErrors.stocks = 'Please enter Stocks';
      if (!section.pricerange) sectionErrors.pricerange = 'Please enter Price Range';
      if (!section.stockweightage) sectionErrors.stockweightage = 'Please enter Stock Weightage';
      if (!section.entryprice) sectionErrors.entryprice = 'Please enter Entry Price';
      if (!section.exitprice) sectionErrors.exitprice = 'Please enter Exit Price';
      if (!section.comment) sectionErrors.comment = 'Please enter Comment';
      if (!section.retunpercentage) sectionErrors.retunpercentage = 'Please enter Return Percentage';
      if (!section.holdingperiod) sectionErrors.holdingperiod = 'Please enter Holding Period';
      if (!section.potentialleft) sectionErrors.potentialleft = 'Please enter Potential Left';
      
      if (Object.keys(sectionErrors).length > 0) {
        acc[`dynamicSections[${index}]`] = sectionErrors;
      }

      return acc;
    }, {});

    if (!values.title) errors.title = 'Please enter Title';
    if (!values.description) errors.description = 'Please enter Description';
    if (!values.accuracy) errors.accuracy = 'Please enter Accuracy';
    if (!values.price) errors.price = 'Please enter Price';
    if (!values.mininvamount) errors.mininvamount = 'Please enter Minimum Investment Amount';
    if (!values.portfolioweightage) errors.portfolioweightage = 'Please enter Portfolio Weightage';
    if (!values.themename) errors.themename = 'Please enter Theme Name';

    return { ...errors, ...dynamicSectionErrors };
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

  const addSection = () => {
    const newSection = { stocks: '', pricerange: '', stockweightage: '', entryprice: '', exitprice: '', comment: '', retunpercentage: '', holdingperiod: '', potentialleft: '' };
    setDynamicSections([...dynamicSections, { id: Date.now(), values: newSection }]);
    formik.setFieldValue('dynamicSections', [...formik.values.dynamicSections, newSection]);
  };

  const removeSection = (id) => {
    if (dynamicSections.length > 1) { 
      const updatedSections = dynamicSections.filter(section => section.id !== id);
      setDynamicSections(updatedSections);
      formik.setFieldValue('dynamicSections', updatedSections.map(section => section.values));
    }
  };

  const mainFormFields = [
    { name: 'title', label: 'Title', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: 'description', label: 'Description', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: 'accuracy', label: 'Accuracy', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: 'price', label: 'Price', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: 'mininvamount', label: 'Min Investment Amount', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: 'portfolioweightage', label: 'Portfolio Weightage', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: 'themename', label: 'Theme Name', type: 'text', label_size: 12, col_size: 6, disable: false },
  ];

  const dynamicSectionFields = (index) => [
    { name: `dynamicSections[${index}].stocks`, label: 'Stocks', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: `dynamicSections[${index}].pricerange`, label: 'Price Range', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: `dynamicSections[${index}].stockweightage`, label: 'Stock Weightage', type: 'text', label_size: 3, col_size: 6, disable: false },
    { name: `dynamicSections[${index}].entryprice`, label: 'Entry Price', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: `dynamicSections[${index}].exitprice`, label: 'Exit Price', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: `dynamicSections[${index}].comment`, label: 'Comment', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: `dynamicSections[${index}].retunpercentage`, label: 'Return Percentage', type: 'text', label_size: 3, col_size: 6, disable: false },
    { name: `dynamicSections[${index}].potentialleft`, label: 'Potential Left', type: 'text', label_size: 12, col_size: 6, disable: false },
  ];

  return (
    <div>
      <div style={{ marginTop: '100px' }}>
        <DynamicForm
          fields={mainFormFields}
          page_title="Add Basket"
          btn_name="Add Basket"
          btn_name1="Cancel"
          formik={formik}
          btn_name1_route="/admin/basket"
          additional_field={
            <>
              {dynamicSections.map((section, index) => (
                <div
                  key={section.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '30px', 
                    padding: '10px 0px 0px',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9',
                    position: 'relative',
                  }}
                >
                  <DynamicForm
                    fields={dynamicSectionFields(index)}
                    formik={formik}
                  />
                  <div className='d-flex justify-content-end'>
                    <button
                      type="button"
                      onClick={addSection}
                      className='btn btn-success mt-2 ms-3'
                    // style={{
                    //   marginTop: '20px',
                    //   backgroundColor: '#4caf50',
                    //   color: '#fff',
                    //   border: 'none',
                    //   borderRadius: '4px',
                    //   padding: '10px 20px',
                    //   cursor: 'pointer',
                    //   width: '150px'
                    // }}
                    >
                      Add Section
                    </button>
                    <button
                      type="button"
                      onClick={() => removeSection(section.id)}
                      className='btn btn-danger me-2 ms-2 mt-2'
                    // style={{

                    // }}
                    >
                      Remove Section
                    </button>
                  </div>
                </div>
              ))}

            </>
          }
        />
      </div>
    </div>
  );
};

export default Addbasket;
