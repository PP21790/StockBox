import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GetClient } from '../../../Services/Admin';
import Table from '../../../components/Table';
import { Eye, RefreshCcw, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { GetSignallist,GetSignallistWithFilter , DeleteSignal, SignalCloseApi, GetService, GetStockDetail } from '../../../Services/Admin';
import { fDateTimeSuffix, fDateTimeH } from '../../../Utils/Date_formate'
import { getstaffperuser } from '../../../Services/Admin';
import ExportToExcel from '../../../Utils/ExportCSV';
import Select from 'react-select';


const Closesignal = () => {

    const token = localStorage.getItem('token');
    const [searchInput, setSearchInput] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);

    const userid = localStorage.getItem('id');


    const [filters, setFilters] = useState({
        from: '',
        to: '',
        service: '',
        stock: '',
    });


    const [permission, setPermission] = useState([]);
   

    const [serviceList, setServiceList] = useState([]);
    const [stockList, setStockList] = useState([]);
    const [searchstock, setSearchstock] = useState("");
    const [ForGetCSV, setForGetCSV] = useState([])

    
    const options = clients.map((item) => ({
        value: item.stock,
        label: item.stock,
      }));

      const handleChange = (selectedOption) => {
        setSearchstock(selectedOption ? selectedOption.value : "");
      };



    const navigate = useNavigate();
    const [clients, setClients] = useState([]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };



    const getAllSignal = async () => {
        try {
            const data = {page:currentPage , from :filters.from , to:filters.to , service:filters.service, stock:searchstock, closestatus: "true"}
            const response = await GetSignallistWithFilter(data, token);
            if (response && response.status) {
                setTotalRows(response.pagination.totalRecords);
                 
                const filterdata = response.data.filter((item) => {
                    return item.close_status === true;
                });

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

   
    
    const getpermissioninfo = async () => {
        try {
            const response = await getstaffperuser(userid, token);
            if (response.status) {
                setPermission(response.data.permissions);
            }
        } catch (error) {
            console.log("error", error);
        }
    }



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

    

    
    const forCSVdata = () => {
        if (clients?.length > 0) {
            const csvArr = clients.map((item) => ({
                Symbol: item.stock || "",
                segment: item?.segment || '',
                Price: item?.price || '',
                EntryType: item?.calltype || '',
                EntryPrice: item?.price || '',
                ExitPrice : item?.closeprice || "" ,
                EntryDate: fDateTimeH(item?.created_at) || '',
                ExitDate: fDateTimeH(item?.closedate) || '',

            }));

            setForGetCSV(csvArr);
        }
    };


    useEffect(() => {
        fetchAdminServices()
        fetchStockList()
        getpermissioninfo()
        forCSVdata()
    }, [filters,clients]);




    useEffect(() => {
        getAllSignal();
    }, [filters, searchInput, searchstock , currentPage ]);


    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };


    const Signaldetail = async (_id) => {
        navigate(`/staff/signaldetaile/${_id}`)
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
            selector: row => row.tradesymbol,
            sortable: true,
            width: '300px',
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
                const totalPL = ((row.closeprice - row.price) * row.lotsize).toFixed(2);
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
            selector: row => fDateTimeH(row.created_at),
            sortable: true,
            width: '190px',
        },
        {
            name: 'Exit Date',
            selector: row => fDateTimeH(row.closedate),
            sortable: true,
            width: '180px',
        },
       


       permission.includes("signaldetail") &&  {
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
                                        <Link to="/staff/dashboard">
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
                                <div
                                    className="ms-2"
                                >
                                    <ExportToExcel
                                        className="btn btn-primary "
                                        apiData={ForGetCSV}
                                        fileName={'All Users'} />


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
                                        <Select
                                            options={options}
                                            value={options.find((option) => option.value === searchstock)}
                                            onChange={handleChange}
                                            className="form-control radius-10"
                                            isClearable
                                            placeholder="Select Stock"
                                        />
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
                            totalRows={totalRows}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />

                    </div>
                </div>
            </div>

        </div>
    );
}

export default Closesignal;
