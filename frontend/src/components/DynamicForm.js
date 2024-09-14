import React from 'react';
import { Field, ErrorMessage, FieldArray } from 'formik';
import { Link } from 'react-router-dom';

const FormField = ({ name, label, type, placeholder, col_size, label_size, disable, getFieldProps }) => (
  <div className={`form-group col-md-${col_size} mb-3`}>
    <label htmlFor={name} className={`col-md-${label_size} col-form-label`}>
      {label}
    </label>
    <Field
      name={name}
      type={type}
      placeholder={placeholder}
      className="form-control"
      readOnly={disable}
      {...getFieldProps(name)}
    />
    <ErrorMessage name={name} component="div" className="text-danger" />
  </div>
);

const BasketField = ({ push, remove, Basket }) => (
  <div className="content container-fluid" data-aos="fade-left">
    <div className="card mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">
          <i className="fa-regular fa-circle-user pe-2"></i> Basket
        </h5>
      </div>
      <div className="card-body">
        {Basket.length > 0 ? (
          Basket.map((BasketData, index) => (
            <div className="card Basket-group mb-3" key={index}>
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Basket {index + 1}</h6>
              </div>
              <div className="card-body">
                <div className="row">
                  {['stocks', 'pricerange', 'stockweightage', 'entryprice', 'exitprice', 'comment', 'returnpercentage', 'holdingperiod', 'potentialleft'].map(field => (
                    <div className="col-lg-6 form-group mb-3" key={field}>
                      <label htmlFor={`Basket.${index}.${field}`}>{field.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
                      <Field
                        name={`Basket.${index}.${field}`}
                        placeholder={`Enter ${field}`}
                        className="form-control"
                      />
                      <ErrorMessage
                        name={`Basket.${index}.${field}`}
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  ))}
                </div>
                {Basket.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No Basket added yet.</p>
        )}
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => push({ stocks: '', pricerange: '', stockweightage: '', entryprice: '', exitprice: '', comment: '', returnpercentage: '', holdingperiod: '', potentialleft: '' })}
        >
          Add Basket
        </button>
      </div>
    </div>
  </div>
);

const DynamicForm = ({ fields, page_title, btn_name1, btn_name1_route, formik, sumit_btn, btn_name, btn_name2, submitFunction }) => {
  const { getFieldProps, values } = formik;

  return (
    <div className="content container-fluid" data-aos="fade-left">
      <div className="card mb-0">
        {page_title && (
          <div className="card-header">
            <h5 className="card-title mt-2 mb-2 w-auto">
              <i className="fa-regular fa-circle-user pe-2"></i>
              {page_title}
            </h5>
          </div>
        )}
        <form onSubmit={formik.handleSubmit} autoComplete="off">
         
          <div className="card-body">
            <div className="row">
              {fields.map((field, index) => {
                const { name, label, type, placeholder, col_size, label_size, disable } = field;

                if (type === "Basket") {
                  return (
                    <FieldArray name="Basket" key={index}>
                      {({ push, remove }) => (
                        <BasketField Basket={values.Basket} push={push} remove={remove} />
                      )}
                    </FieldArray>
                  );
                } else {
                  return (
                    <FormField
                      key={name}
                      name={name}
                      label={label}
                      type={type}
                      placeholder={placeholder}
                      col_size={col_size}
                      label_size={label_size}
                      disable={disable}
                      getFieldProps={getFieldProps}
                    />
                  );
                }
              })}
            </div>
            <div className="add-customer-btns text-end mt-3">
              {btn_name1 && (
                <Link to={btn_name1_route} className="btn customer-btn-cancel btn btn-secondary">
                  {btn_name1}
                </Link>
              )}
              {sumit_btn && (
                <button
                  type="submit"
                  className="btn customer-btn-save btn btn-primary m-2"
                  onClick={submitFunction}
                >
                  {btn_name}
                </button>
              )}
              {btn_name2 && (
                <button
                  type="button"
                  className="btn customer-btn-save btn btn-primary"
                  onClick={submitFunction}
                >
                  {btn_name2}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DynamicForm;
