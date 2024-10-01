import React from 'react';

const History = () => {
    return (
        <div>
            <div>
                <div className="page-content">
                    {/*breadcrumb*/}
                    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                        <div className="breadcrumb-title pe-3">Payment History</div>
                        <div className="ps-3">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0 p-0">
                                    <li className="breadcrumb-item">
                                        <a href="javascript:;">
                                            <i className="bx bx-home-alt" />
                                        </a>
                                    </li>

                                </ol>
                            </nav>
                        </div>

                    </div>
                    {/*end breadcrumb*/}
                    <div className="card">
                        <div className="card-body">
                            <div className="d-lg-flex align-items-center mb-4 gap-3">
                                <div className="position-relative">
                                    <input
                                        type="text"
                                        className="form-control ps-5 radius-10"
                                        placeholder="Search Order"
                                    />{" "}
                                    <span className="position-absolute top-50 product-show translate-middle-y">
                                        <i className="bx bx-search" />
                                    </span>
                                </div>

                            </div>
                            <div className="table-responsive">
                                <table className="table mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>S.No</th>
                                            <th>Client Name</th>
                                            <th>Phone No.</th>
                                            <th>Service Name</th>
                                            <th>Validity</th>
                                            <th>Amount</th>
                                            <th>Purchased By</th>
                                            <th>Purchase Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                1
                                            </td>
                                            <td>RD Burman</td>
                                            <td>7893216540</td>
                                            <td>Cash</td>
                                            <td>10/06/25</td>
                                            <td>
                                                450000
                                            </td>

                                            <td>Admin</td>
                                            <td>05/05/2023</td>
                                          


                                        </tr>
                                        <tr>
                                            <td>
                                                2
                                            </td>
                                            <td>RD Burman</td>
                                            <td>7893216540</td>
                                            <td>Stock</td>
                                            <td>10/06/25</td>
                                            <td>
                                                450000
                                            </td>

                                            <td>App</td>
                                            <td>05/05/2023</td>
                                            

                                        </tr>
                                        <tr>
                                            <td>
                                                3
                                            </td>
                                            <td>RD Burman</td>
                                            <td>7893216540</td>
                                            <td>Future</td>
                                            <td>10/06/25</td>
                                            <td>
                                                450000
                                            </td>

                                            <td>Admin</td>
                                            <td>05/05/2023</td>
                                            


                                        </tr>
                                        <tr>
                                            <td>
                                                4
                                            </td>
                                            <td>RD Burman</td>
                                            <td>7893216540</td>
                                            <td>Cash</td>
                                            <td>10/06/25</td>
                                            <td>
                                                450000
                                            </td>

                                            <td>App</td>
                                            <td>05/05/2023</td>
                                          


                                        </tr>
                                        <tr>
                                            <td>
                                                5
                                            </td>
                                            <td>RD Burman</td>
                                            <td>7893216540</td>
                                            <td>Stock</td>
                                            <td>10/06/25</td>
                                            <td>
                                                450000
                                            </td>

                                            <td>Admin</td>
                                            <td>05/05/2023</td>
                                           


                                        </tr>
                                        <tr>
                                            <td>
                                                6
                                            </td>
                                            <td>RD Burman</td>
                                            <td>7893216540</td>
                                            <td>cash</td>
                                            <td>10/06/25</td>
                                            <td>
                                                450000
                                            </td>

                                            <td>App</td>
                                            <td>05/05/2023</td>
                                         


                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default History;
