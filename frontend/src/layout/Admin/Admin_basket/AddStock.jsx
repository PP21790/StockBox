// import React from 'react';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import DynamicForm from '../../../components/DynamicForm';
// import { Addbasketplan } from '../../../Services/Admin';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';

// const fieldConfigurations = [
//     {
//       col_size: 12,
//       name: 'Stock',
//       label: 'Stock',
//       type: 'Stock',
//       placeholder: 'Add Stock',
//       data: [
//         {
//           stocks: '',
//           type: '', // Dropdown for Type (buy, sell, hold)
//           typeOptions: [ // Options for the select field
//             { label: 'Buy', value: 'buy' },
//             { label: 'Sell', value: 'sell' },
//             { label: 'Hold', value: 'hold' },
//           ],
//           suggestedPrice: { min: '', max: '' }, // Two input fields for Suggested Price
//           stockWeightage: '', // Input for Weightage
//           quantity: '', // Input for Quantity
//         },
//       ],
//     },
//   ];
  

// const initialValues = {

//   Stock: [
//     { stocks: '', pricerange: '', stockweightage: '', entryprice: '', exitprice: '', exitdate: '', comment: '' }],
// };

// const validationSchema = Yup.object().shape({
 
//   Stock: Yup.array().of(
//     Yup.object().shape({
//       stocks: Yup.string().required('Stocks are required'),
//       pricerange: Yup.string().required('Price range is required'),
//       stockweightage: Yup.string().required('Stock weightage is required'),
//       entryprice: Yup.string().required('Entry price is required'),
//       exitprice: Yup.string().required('Exit price is required'),
//       exitdate: Yup.string().required('Exit date is required'),
//       comment: Yup.string().required('Comment is required'),
//     })
//   ),
// });

// const AddStock = () => {


//   const navigate = useNavigate();
//   const user_id = localStorage.getItem("id");
//   const token = localStorage.getItem("token");

//   const onSubmit = async (values) => {

//     const req = {
     
//       Stock: values.Stock
//     };


  
//     try {
//       const response = await AddStock(req, token);
//       console.log(response);
      
//       if (response.status) {
//         Swal.fire({
//           title: "Create Successful!",
//           text: response.message,
//           icon: "success",
//           timer: 1500,
//           timerProgressBar: true,
//         });
//         setTimeout(() => {
//           navigate("/admin/basket");
//         }, 1500);
//       } else {
//         Swal.fire({
//           title: "Error",
//           text: response.message,
//           icon: "error",
//           timer: 1500,
//           timerProgressBar: true,
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         title: "Error",
//         text: "An unexpected error occurred. Please try again later.",
//         icon: "error",
//         timer: 1500,
//         timerProgressBar: true,
//       });
//     }
//   };

//   return (


//     <div className='page-content'>
        
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={onSubmit}
//     >
//       {formikProps => (
//         <DynamicForm
//           fields={fieldConfigurations}
//           formik={formikProps}
//           btn_name="Submit"
//           sumit_btn={true}
//           page_title="Add Stock"
//           btn_name1="Cancel"
//           btn_name1_route="/admin/basket"
//           showAddRemoveButtons={true} 
//         />
//       )}
//     </Formik>
//   </div>
//   );
// };

// export default AddStock;


import {React, useState, useEffect} from 'react'
import { getStock } from '../../../Services/Admin'


const AddStock = () => {

  const [stockdata, setStockdata] = useState([]);
  
  const fetchstock=  async () => {
    try{
      const res= await getStock();
      console.log(res);
      if(res.status){
        setStockdata(res.data);
      }
      else{
        
        console.log(res.message);
      }
    }catch(err){
      {
        console.log(err);
      }
  }};
  useEffect(() => {
    fetchstock();
  }, [])

  return (
    <div className='page-content'>

<div className="card">
    
    <div className="card-body">
      <input type="search" className="form-control" placeholder="Stock Name" />
<ul>
  {stockdata.map((stock, index) => (
    <li key={index}>{stock}</li>
  ))}
</ul>
      </div>
      </div>
    </div>
  )
}

export default AddStock