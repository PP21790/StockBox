import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GetClient } from '../../../Services/Admin';
import Table from '../../../components/Table';
import { Eye, RefreshCcw, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { GetSignallist, DeleteSignal, SignalCloseApi, GetService, GetStockDetail } from '../../../Services/Admin';
import { fDateTimeSuffix, fDateTime } from '../../../Utils/Date_formate'




const Closesignal = () => {

    const token = localStorage.getItem('token');
    const [searchInput, setSearchInput] = useState("");




    const [filters, setFilters] = useState({
        from: '',
        to: '',
        service: '',
        stock: '',
    });




    const [serviceList, setServiceList] = useState([]);
    const [stockList, setStockList] = useState([]);
    const [searchstock, setSearchstock] = useState("");



    const navigate = useNavigate();
    const [clients, setClients] = useState([]);



    const getAllSignal = async () => {
        try {
            const response = await GetSignallist(filters, token);
            if (response && response.status) {
                const filterdata = response.data.filter((item) => {
                    return item.close_status == true
                })
                const searchInputMatch = filterdata.filter((item) => {
                    const searchInputMatch =
                        searchInput === "" ||
                        item.stock.toLowerCase().includes(searchInput.toLowerCase()) ||
                        item.calltype.toLowerCase().includes(searchInput.toLowerCase());

                    const searchstockMatch =
                        searchstock === "" ||
                        item.stock.toLowerCase().includes(searchstock.toLowerCase());

                    return searchstockMatch && searchInputMatch;
                });

                setClients(searchInput || searchstock ? searchInputMatch : filterdata);
            }
        } catch (error) {
            console.log("error", error);
        }
    };




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



    useEffect(() => {
        fetchAdminServices()
        fetchStockList()
    }, []);




    useEffect(() => {
        getAllSignal();
    }, [filters, searchInput, searchstock]);


    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };


    const Signaldetail = async (_id) => {
        navigate(`/admin/signaldetaile/${_id}`)
    }



    let columns = [
        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '100px',
        },
        {
            name: 'Segment',
            selector: row => row.segment == "C" ? "CASH" : row.segment == "O" ? "OPTION" : "FUTURE",
            sortable: true,
            width: '132px',
        },
        {
            name: 'Symbol',
            selector: row => row.stock,
            sortable: true,
            width: '132px',
        },
        {
            name: 'Entry Type',
            selector: row => row.calltype,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Entry Price',
            selector: row => row.price,
            sortable: true,
            width: '200px',
        },

        {
            name: 'Exit Price',
            selector: row => row.closeprice ? row.closeprice : "-",
            sortable: true,
            width: '132px',

        },
        {
            name: 'Total P&L',
            cell: row => {
                const totalPL = (row.closeprice - row.price).toFixed(2);
                const style = {
                    color: totalPL < 0 ? 'red' : 'green',
                };
                return <span style={style}>{totalPL}</span>;
            },
            sortable: true,
            width: '200px',
        },
        {
            name: 'Entry Date',
            selector: row => fDateTimeSuffix(row.created_at),
            sortable: true,
            width: '190px',
        },
        {
            name: 'Exit Date',
            selector: row => fDateTimeSuffix(row.closedate),
            sortable: true,
            width: '180px',
        },
       


        {
            name: 'Actions',
            cell: row => (
                <>
                    <div>
                        <Eye onClick={() => Signaldetail(row._id)} />
                    </div>
                    {/* <div>
                        <Trash2 onClick={() => DeleteSignals(row._id)} />
                    </div> */}
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,

        },
        
    ];



    const resethandle = () => {
        setFilters({
            from: '',
            to: '',
            service: '',
            stock: '',
        });
        setSearchstock("")
        setSearchInput("")
        fetchAdminServices()
        fetchStockList()
        getAllSignal();

    }



    return (
        <div>
            <div>
                <div className="page-content">
                    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                        <div className="breadcrumb-title pe-3">Close Signal</div>
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
                    <div className="card">
                        <div className="card-body">
                            <div className="d-lg-flex align-items-center mb-4 gap-3">
                                <div className="position-relative">
                                    <input
                                        type="text"

                                        className="form-control ps-5 radius-10"
                                        placeholder="Search Signal"
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}

                                    />
                                    <span className="position-absolute top-50 product-show translate-middle-y">
                                        <i className="bx bx-search" />
                                    </span>
                                </div>

                            </div>

                            <div className="row">

                                <div className="col-md-3">
                                    <label>From Date</label>
                                    <input
                                        type="date"
                                        name="from"
                                        className="form-control radius-10"
                                        placeholder="From"
                                        value={filters.from}
                                        onChange={handleFilterChange}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label>To Date</label>
                                    <input
                                        type="date"
                                        name="to"
                                        className="form-control radius-10"
                                        placeholder="To"
                                        value={filters.to}
                                        onChange={handleFilterChange}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label>Select Service</label>
                                    <select
                                        name="service"
                                        className="form-control radius-10"
                                        value={filters.service}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="">Select Service</option>
                                        {serviceList.map((service) => (
                                            <option key={service._id} value={service._id}>
                                                {service.title}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                                <div className="col-md-3 d-flex">
                                    <div style={{ width: "80%" }}>
                                        <label>Select Stock</label>
                                        <select
                                            className="form-control radius-10"
                                            value={searchstock}
                                            onChange={(e) => setSearchstock(e.target.value)}
                                        >
                                            <option value="">Select Stock</option>
                                            {clients.map((item) => (
                                                <option key={item._id} value={item.stock}>
                                                    {item.stock}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='rfreshicon'>
                                        <RefreshCcw onClick={resethandle} />
                                    </div>

                                </div>


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
    );
}

export default Closesignal;
