import React from 'react';
import { Link } from 'react-router-dom';

const Message = () => {
    return (
        <div>
            <div className="page-content">

                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">Message Broadcast</div>
                    <div className="ps-3">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0 p-0">
                                <li className="breadcrumb-item">
                                    <Link to="/admin/dashboard">
                                        <i className="bx bx-home-alt" />
                                    </Link>
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <hr />
                <div className="card">
                    <div className="card-body">

                        <div className="d-flex justify-content-start">
                            <div className='me-2'>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                >
                                    <i className="bx bxs-plus-square" />
                                    Add Broadcast
                                </button>
                            </div>
                            <div
                                className="modal fade"
                                id="exampleModal"
                                tabIndex={-1}
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">
                                                Add Broadcast
                                            </h5>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            />
                                        </div>
                                        <div className="modal-body">
                                            <form>
                                                <div className="col-md-12">
                                                    <label htmlFor="service">Select Service</label>
                                                    <select
                                                        className="form-control mb-2"
                                                        id="service"

                                                    >
                                                        <option value="">
                                                            Select service
                                                        </option>
                                                        <option value="0">
                                                            Stock
                                                        </option>
                                                        <option value="1">
                                                            Cash
                                                        </option>
                                                        <option value="2">
                                                            Future
                                                        </option>

                                                    </select>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <label htmlFor="">Subject</label>
                                                        <input
                                                            className="form-control mb-3"
                                                            type="text"
                                                            placeholder='Enter Subject'

                                                        />
                                                    </div>
                                                </div>


                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <label htmlFor="">Measage</label>
                                                        <textarea
                                                            className="form-control mb-3"
                                                            type="text"
                                                            placeholder='Enter your Message'

                                                        />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                data-bs-dismiss="modal"
                                            >
                                                Close
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-primary"

                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container mt-3">

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="main-timeline">
                                        <div className="timeline">
                                            <a href="#" className="timeline-content">
                                                <div className='d-flex justify-content-between'>
                                                    <div className="timeline-year">Cash</div>
                                                    <div>29/08/2024</div>
                                                </div>
                                                <h3 className="title">Message for Cash payment</h3>
                                                <p className="description">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                                                    males uada tellus lorem, et condimentum neque commodo Integer
                                                    males uada tellus lorem, et condimentum neque commodo
                                                </p>
                                            </a>
                                        </div>
                                        <div className="timeline">
                                            <a href="#" className="timeline-content">
                                                <div className='d-flex justify-content-between'>
                                                    <div>29/08/2024</div>
                                                    <div className="timeline-year">Future</div>

                                                </div>
                                                <h3 className="title">Web Development</h3>
                                                <p className="description">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                                                    males uada tellus lorem, et condimentum neque commodo Integer
                                                    males uada tellus lorem, et condimentum neque commodo
                                                </p>
                                            </a>
                                        </div>
                                        <div className="timeline">
                                            <a href="#" className="timeline-content">
                                                <div className='d-flex justify-content-between'>
                                                    <div className="timeline-year">Option</div>
                                                    <div>29/08/2024</div>
                                                </div>
                                                <h3 className="title">Java Script</h3>
                                                <p className="description">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                                                    males uada tellus lorem, et condimentum neque commodo Integer
                                                    males uada tellus lorem, et condimentum neque commodo
                                                </p>
                                            </a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
}

export default Message;
