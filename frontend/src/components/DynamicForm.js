import React from 'react';
import { Field, ErrorMessage, FieldArray } from 'formik';
import { Link } from 'react-router-dom';

const FormField = ({ name, label, type, placeholder, col_size, label_size, disable }) => (
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
    />
    <ErrorMessage name={name} component="div" className="text-danger" />
  </div>
);

const BasketField = ({ push, remove, Stock }) => (
  <div className="content container-fluid" data-aos="fade-left">
    <div className="card mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">
          <i className="fa-regular fa-circle-user pe-2"></i> Stock
        </h5>
      </div>
      <div className="card-body">
        {Stock.length > 0 ? (
          Stock.map((BasketData, index) => (
            <div className="card Stock-group mb-3" key={index}>
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Stock {index + 1}</h6>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-4 form-group mb-2">
                    <label htmlFor={`Stock.${index}.stocks`}>Stocks</label>
                    <Field
                      name={`Stock.${index}.stocks`}
                      placeholder="Enter Stocks"
                      className="form-control mb-2"
                    />
                    <ErrorMessage name={`Stock.${index}.stocks`} component="div" className="text-danger" />
                  </div>
                  <div className="col-lg-4 form-group mb-2">
                    <label htmlFor={`Stock.${index}.pricerange`}>Price Range</label>
                    <Field
                      name={`Stock.${index}.pricerange`}
                      placeholder="Enter Price Range"
                      className="form-control mb-2"
                      type='number'
                    />
                    <ErrorMessage name={`Stock.${index}.pricerange`} component="div" className="text-danger" />
                  </div>
                  <div className="col-lg-4 form-group mb-2">
                    <label htmlFor={`Stock.${index}.stockweightage`}>Stock Weightage</label>
                    <Field
                      name={`Stock.${index}.stockweightage`}
                      placeholder="Enter Stock Weightage"
                      className="form-control mb-2"
                       type='number'
                    />
                    <ErrorMessage name={`Stock.${index}.stockweightage`} component="div" className="text-danger" />
                  </div>
                  <div className="col-lg-4 form-group mb-2">
                    <label htmlFor={`Stock.${index}.entryprice`}>Entry Price</label>
                    <Field
                      name={`Stock.${index}.entryprice`}
                      placeholder="Enter Entry Price"
                      className="form-control mb-2"
                       type='number'
                    />
                    <ErrorMessage name={`Stock.${index}.entryprice`} component="div" className="text-danger" />
                  </div>
                  <div className="col-lg-4 form-group mb-2">
                    <label htmlFor={`Stock.${index}.exitprice`}>Exit Price</label>
                    <Field
                      name={`Stock.${index}.exitprice`}
                      placeholder="Enter Exit Price"
                      className="form-control mb-2"
                       type='number'
                    />
                    <ErrorMessage name={`Stock.${index}.exitprice`} component="div" className="text-danger" />
                  </div>
                  <div className="col-lg-4 form-group mb-2">
                    <label htmlFor={`Stock.${index}.exitdate`}>Exit Date</label>
                    <Field
                      name={`Stock.${index}.exitdate`}
                      placeholder="Enter Exit Date"
                      className="form-control mb-2"
                       type='date'
                    />
                    <ErrorMessage name={`Stock.${index}.exitdate`} component="div" className="text-danger" />
                  </div>
                  <div className="col-lg-12 form-group mb-2">
                    <label htmlFor={`Stock.${index}.comment`}>Comment</label>
                    <Field
                      name={`Stock.${index}.comment`}
                      placeholder="Enter Comment"
                      className="form-control mb-2"
                    />
                    <ErrorMessage name={`Stock.${index}.comment`} component="div" className="text-danger" />
                  </div>
                </div>
                {Stock.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => remove(index)}
                  >
                    Remove Stock
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No Stock added yet.</p>
        )}
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => push({ stocks: '', pricerange: '', stockweightage: '', entryprice: '', exitprice: '', exitdate: '', comment: '' })}
        >
          Add Stock
        </button>
      </div>
    </div>
  </div>
);

const DynamicForm = ({ fields, page_title, btn_name1, btn_name1_route, formik, sumit_btn, btn_name, btn_name2, submitFunction }) => {
  const { values } = formik;

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

                if (type === "Stock") {
                  return (
                    <FieldArray name="Stock" key={index}>
                      {({ push, remove }) => (
                        <BasketField Stock={values.Stock} push={push} remove={remove} />
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
