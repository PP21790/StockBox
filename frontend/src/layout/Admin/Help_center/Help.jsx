import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHelpMessagelist } from '../../../Services/Admin';
import Table from '../../../components/Table';
import { Tooltip } from 'antd';




const Help = () => {

    const token = localStorage.getItem('token');

    const [clients, setClients] = useState([]);
    const [searchInput, setSearchInput] = useState("");





    const getdemoclient = async () => {
        try {
            const response = await getHelpMessagelist(token);
            if (response.status) {
                const filterdata =  response.data.filter((item) =>
                    searchInput === "" ||
                    item.FullName.toLowerCase().includes(searchInput.toLowerCase()) ||
                    item.Email.toLowerCase().includes(searchInput.toLowerCase())
                );
                setClients(searchInput ? filterdata : response.data);
            }
        } catch (error) {
            console.log("error");
        }
    }





    useEffect(() => {
        getdemoclient();

    }, [searchInput]);





    const columns = [
        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '70px',
        },
        {
            name: 'Full Name',
            selector: row => row.clientDetails.FullName,
            sortable: true,
            width: '165px',
        },
        {
            name: 'Email',
            selector: row => row.clientDetails.Email,
            sortable: true,
            width: '243px',
        },
        {
            name: 'Subject',
            selector: row => row.subject,
            sortable: true,
            width: '243px',
        },
        {
            name: 'Message',
            selector: row => row.message,
            sortable: true,
            width: '243px',
        },
        {
            name: 'Phone No',
            selector: row => row.clientDetails.PhoneNo,
            sortable: true,
        },


        {
            name: 'CreatedAt',
            selector: row => row.created_at,
            sortable: true,
            width: '146px',
        },

    ];




    return (
        <div>
            {/* <div className="page-content">

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
                


                <div className="container py-2">

                    <div className="row g-0">
                        <div className="col-sm"></div>
                    
                        <div className="col-sm-1 text-center flex-column d-none d-sm-flex">
                            <div className="row h-50">
                                <div className="col">&nbsp;</div>
                                <div className="col">&nbsp;</div>
                            </div>
                            <h5 className="m-2">
                                <span className="badge rounded-pill bg-primary border">&nbsp;</span>
                            </h5>
                            <div className="row h-50">
                                <div className="col border-end">&nbsp;</div>
                                <div className="col">&nbsp;</div>
                            </div>
                        </div>
                        
                        <div className="col-sm py-2">
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
                    </div>
                  
                    <div className="row g-0">
                        <div className="col-sm py-2">
                            <div className="card border-primary shadow radius-15">
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
                        <div className="col-sm-1 text-center flex-column d-none d-sm-flex">
                            <div className="row h-50">
                                <div className="col border-end">&nbsp;</div>
                                <div className="col">&nbsp;</div>
                            </div>
                            <h5 className="m-2">
                                <span className="badge rounded-pill bg-primary">&nbsp;</span>
                            </h5>
                            <div className="row h-50">
                                <div className="col border-end">&nbsp;</div>
                                <div className="col">&nbsp;</div>
                            </div>
                        </div>
                        <div className="col-sm"></div>
                    </div>
                
                    <div className="row g-0">
                        <div className="col-sm"></div>
                        <div className="col-sm-1 text-center flex-column d-none d-sm-flex">
                            <div className="row h-50">
                                <div className="col border-end">&nbsp;</div>
                                <div className="col">&nbsp;</div>
                            </div>
                            <h5 className="m-2">
                                <span className="badge rounded-pill bg-primary border">&nbsp;</span>
                            </h5>
                            <div className="row h-50">
                                <div className="col border-end">&nbsp;</div>
                                <div className="col">&nbsp;</div>
                            </div>
                        </div>
                        <div className="col-sm py-2">
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
                    </div>
                  
                    <div className="row g-0">
                        <div className="col-sm py-2">
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
                        <div className="col-sm-1 text-center flex-column d-none d-sm-flex">
                            <div className="row h-50">
                                <div className="col border-end">&nbsp;</div>
                                <div className="col">&nbsp;</div>
                            </div>
                            <h5 className="m-2">
                                <span className="badge rounded-pill bg-primary border">&nbsp;</span>
                            </h5>
                            <div className="row h-50">
                                <div className="col">&nbsp;</div>
                                <div className="col">&nbsp;</div>
                            </div>
                        </div>
                        <div className="col-sm"></div>
                    </div>
                   
                </div>



            </div> */}

            <div>
                <div>
                    <div>
                        <div className="page-content">
                            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                                <div className="breadcrumb-title pe-3">Help Message</div>
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
                                    <div className="d-lg-flex align-items-center mb-4 gap-3">
                                        <div className="position-relative">
                                            <input
                                                type="text"
                                                className="form-control ps-5 radius-10"
                                                placeholder="Search Order"
                                                onChange={(e) => setSearchInput(e.target.value)}
                                                value={searchInput}
                                            />
                                            <span className="position-absolute top-50 product-show translate-middle-y">
                                                <i className="bx bx-search" />
                                            </span>
                                        </div>

                                    </div>

                                    <Table
                                        columns={columns}
                                        data={clients}
                                    />
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
