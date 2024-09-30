import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import DynamicForm from '../../../components/FormicForm';
import { AddSignalByAdmin, GetService, getstockbyservice } from '../../../Services/Admin';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';



const AddSignal = () => {
  const navigate = useNavigate();
  const user_id = localStorage.getItem('id');
  const token = localStorage.getItem('token');

  const [serviceList, setServiceList] = useState([]);
  const [stockList, setStockList] = useState([]);
  const [searchItem, setSearchItem] = useState("");





  const [showDropdown, setShowDropdown] = useState(true);
  useEffect(() => {
    fetchAdminServices();
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

console.log("searchItem",searchItem)

  // const fetchStockList = async () => {
  //   try {
  //     const response = await getstockbyservice(token);
  //     if (response.status) {
  //       setStockList(response.data);
  //     }
  //   } catch (error) {
  //     console.log('Error fetching stock list:', error);
  //   }
  // };



  const formik = useFormik({
    initialValues: {
      add_by: user_id,
      segment: '',
      price: '',
      stock: '',
      tag1: '',
      tag2: '',
      tag3: '',
      stoploss: '',
      report: '',
      description: '',
      callduration: '',
      calltype: '',
      expirydate: '',
      optiontype: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.segment) errors.segment = 'Please select a segment';
      if (!values.stock) errors.stock = 'Please select a stock';
      if (!values.price) errors.price = 'Please select a price';
      if (!values.tag1) errors.tag1 = 'Please enter Target-1';
      // if (!values.tag2) errors.tag2 = 'Please enter Target-2';
      // if (!values.tag3) errors.tag3 = 'Please enter Target-3';
      // if (!values.stoploss) errors.stoploss = 'Please enter Stoploss';
      if (!values.callduration) errors.callduration = 'Please enter Trade duration';
      if (!values.calltype) errors.calltype = 'Please enter Call Calltype';
      if (!values.callperiod) errors.callperiod = 'Please enter call Period';
      if (!values.description) errors.description = 'Please enter description';
      if (!values.expirydate) errors.expirydate = 'Please enter expirydate';
      if (!values.optiontype) errors.optiontype = 'Please enter optiontype';
      return errors;
    },
    onSubmit: async (values) => {
      const req = {
        add_by: user_id,
        stock: values.stock,
        price: values.price,
        tag1: values.tag1,
        tag2: values.tag2,
        tag3: values.tag3,
        stoploss: values.stoploss,
        description: values.description,
        report: values.report,
        calltype: values.calltype,
        callduration: values.callduration,
        expirydate: values.expirydate,
        segment: values.segment,
        optiontype: values.optiontype,

      };
      try {
        const response = await AddSignalByAdmin(req, token);

        console.log("response", response)

        return
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
          }, 2000);
        } else {
          Swal.fire({
            title: 'Alert',
            text: response.message,
            icon: 'warning',
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


  // console.log("formik.values.service :", formik.values.service)


  const fields = [
    {
      name: 'segment',
      label: 'Select Segment',
      type: 'select2',
      // options: serviceList.map((item) => ({
      //   label: item.title,
      //   value: item._id ,
      // })),
      options: [
        { label: 'Cash', value: 'C' },
        { label: 'Future', value: 'F' },
        { label: 'Option', value: 'O' },

      ],
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
      options: stockList.map((item) => ({
        label: item.expiry_str,
        value: item.expiry_str,
      })),
      showWhen: (values) => values.segment != "C",

      disable: false,
    },
    formik.values.segment != "O" ? {
      name: 'price',
      label: 'Price',
      type: 'number',
      label_size: 12,
      col_size: 6,
      showWhen: (values) => values.segment != "O",
      disable: false,
      optional: false
    } : {
      name: 'price',
      label: 'Strike Price',
      type: 'number',
      label_size: 12,
      col_size: 6,
      disable: false,
      optional: false
    },
    ,
    {
      name: 'optiontype',
      label: 'Option Type',
      type: 'select',
      options: [
        { label: 'Put', value: 'put' },
        { label: 'Call', value: 'call' },
      ],
      label_size: 12,
      col_size: 6,
      showWhen: (values) => values.segment === "O",
      disable: false,
    },
    {
      name: 'calltype',
      label: 'Call Type',
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
      label: 'Trade Duration',
      type: 'select',
      options: (() => {
        if (formik.values.segment === "C") {
          return formik.values.calltype === "sell" ? [
            { label: 'Intraday', value: 'Intraday' }
          ] : [
            { label: 'Long Term', value: 'Long Term' },
            { label: 'Medium Term', value: 'Medium Term' },
            { label: 'Short Term', value: 'Short Term' },
            { label: 'Intraday', value: 'Intraday' }
          ];
        } else if (formik.values.segment === "F") {
          return formik.values.calltype === "sell" ? [
            { label: 'Intraday', value: 'Intraday' }
          ] : [
            { label: 'Short Term', value: 'Short Term' },
            { label: 'Intraday', value: 'Intraday' },
            { label: 'Still Expiry Date', value: 'Still Expiry Date' }
          ];
        } else if (formik.values.segment === "O") {
          return [
            { label: 'Short Term', value: 'Short Term' },
            { label: 'Intraday', value: 'Intraday' },
            { label: 'Still Expiry Date', value: 'Still Expiry Date' }
          ];
        }
        return [];
      })(),
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
      optional: false
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
      col_size: 12,
      disable: false,
    },

  ];



  useEffect(() => {
    const fetchStockData = async () => {
     

      if (formik.values.segment && searchItem) {
        const data = { segment: formik.values.segment, symbol: searchItem };

        try {
          const res = await getstockbyservice(data);
          if (res.status) {
            setStockList(res.data)
          } else {
            console.log("Failed to fetch data", res);
          }
        } catch (error) {
          console.log("Error fetching stock by segment:", error);
        }
      }
    };

    fetchStockData();
  }, [formik.values.segment, formik.values.stock,searchItem]);


  useEffect(() => {
    // formik.setFieldValue("expirydate", "")
    // formik.setFieldValue("callduration", "")
    // formik.setFieldValue("stock", "")
  }, [formik.values])

  const dropdownStyles = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    maxHeight: '200px',
    overflowY: 'auto',
    zIndex: 1000,
  };
  
  const dropdownItemStyles = {
    padding: '8px 16px',
    cursor: 'pointer',
    borderBottom: '1px solid #ddd',
  };
  
  
  return (
    <div>
      <div style={{ marginTop: '100px' }}>
        <DynamicForm
          fields={fields.filter(field => !field.showWhen || field.showWhen(formik.values))}
          page_title="Add Signal"
          btn_name="Add Signal"
          btn_name1="Cancel"
          formik={formik}
          sumit_btn={true}
          btn_name1_route="/admin/signal"
          additional_field1={
            <>

<div className="mb-3">
  <div className="position-relative">
    <label className="form-label">
      Search Company
    </label>
    <input
      type="text"
      className="form-control"
      placeholder="Search Company"
      name="SearchCompany"
      onChange={(e) => setSearchItem(e.target.value)}
      value={searchItem}
      onClick={() => setShowDropdown(true)}
      style={{ cursor: "pointer" }}
    />
    
    {/* Show dropdown if there are search results and the dropdown is visible */}
    {searchItem && stockList.length > 0 && showDropdown ? (
      <div className="dropdown-list" style={dropdownStyles}>
        {stockList
          .filter((company) => 
            company.symbol.includes(searchItem.toUpperCase())
          )
          .map((company, index) => (
            <div
              key={index}
              onClick={() => {
                setSearchItem(company.symbol); // Update with the selected company's symbol
                setShowDropdown(false); // Hide dropdown on selection
              }}
              style={dropdownItemStyles}
            >
              {company.symbol}
            </div>
          ))
        }
      </div>
    ) : null}
  </div>
</div>

            </>
          }
        />
      </div>
    </div>
  );
};

export default AddSignal;
