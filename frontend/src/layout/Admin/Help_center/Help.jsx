import React from 'react';
import { Link } from 'react-router-dom';

const Help = () => {
    return (
        <div>
            <div className="page-content">
                {/*breadcrumb*/}
                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">Help Center</div>
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
                {/*end breadcrumb*/}

                <hr />
                {/* <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-4">
                    <div className="col">
                        <div className="card radius-15 helpcard">
                            <div className="card-body">


                                <div className="p-4 border radius-15">

                                    <form className="row g-3">

                                        <div className="col-md-12">
                                            <label htmlFor="input3" className="form-label">
                                                Client Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="input3"
                                                placeholder="Enter your name"
                                            />
                                        </div>

                                        <div className="col-md-12">
                                            <label htmlFor="input6" className="form-label">
                                                Date
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="input6"
                                                placeholder="Date of Birth"
                                            />
                                        </div>


                                        <div className="col-md-12">
                                            <label htmlFor="input6" className="form-label">
                                                Subject
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="input6"
                                                placeholder="Enter Subject"
                                            />
                                        </div>




                                        <div className="col-md-12">
                                            <label htmlFor="input11" className="form-label">
                                                Message
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="input11"
                                                placeholder="Message ..."
                                                rows={3}
                                                defaultValue={""}
                                            />
                                        </div>

                                        <div className="col-md-12">
                                            <div className="d-md-flex d-grid align-items-center gap-3">
                                                <button type="button" className="btn btn-primary px-4">
                                                    Submit
                                                </button>

                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>

                </div> */}
                {/*end row*/}


                <div className="row">
                    <div className="col-lg-4">
                        <div className="card radius-15">
                            <div className="card-body">
                                <div className='p-0 border radius-15'>

                                    <div className="row">
                                        <div className="card-body col-md-6">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">Client</h6>
                                                    <span className="text-secondary">
                                                        dffgdg
                                                    </span>
                                                </li>

                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">Phone No</h6>
                                                    <span className="text-secondary">987653240</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">Email</h6>
                                                    <span className="text-secondary">dsfffd@gmail.com</span>
                                                </li>

                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">Description</h6>
                                                    <span className="text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni iste itaque quidem consequatur. Voluptatem unde, animi reiciendis officia corporis error.</span>
                                                </li>


                                            </ul>
                                        </div>


                                    </div>








                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card radius-15">
                            <div className="card-body">
                                <div className='p-0 border radius-15'>

                                    <div className="row">
                                        <div className="card-body col-md-6">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">Client</h6>
                                                    <span className="text-secondary">
                                                        dffgdg
                                                    </span>
                                                </li>

                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">Phone No</h6>
                                                    <span className="text-secondary">987653240</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">Email</h6>
                                                    <span className="text-secondary">dsfffd@gmail.com</span>
                                                </li>

                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">Description</h6>
                                                    <span className="text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni iste itaque quidem consequatur. Voluptatem unde, animi reiciendis officia corporis error.</span>
                                                </li>


                                            </ul>
                                        </div>


                                    </div>








                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card radius-15">
                            <div className="card-body">
                                <div className='p-0 border radius-15'>

                                    <div className="row">
                                        <div className="card-body col-md-6">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">Client Name</h6>
                                                    <span className="text-secondary">
                                                        dffgdg
                                                    </span>
                                                </li>

                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">Phone No</h6>
                                                    <span className="text-secondary">987653240</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">Email</h6>
                                                    <span className="text-secondary">dsfffd@gmail.com</span>
                                                </li>

                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">Description</h6>
                                                    <span className="text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni iste itaque quidem consequatur. Voluptatem unde, animi reiciendis officia corporis error.</span>
                                                </li>


                                            </ul>
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

export default Help;
