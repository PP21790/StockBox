import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GetClient } from '../../../Services/Admin';
import Table from '../../../components/Table1';
import { Eye, RefreshCcw, Trash2 , SquarePen} from 'lucide-react';
import Swal from 'sweetalert2';
import { GetSignallist, GetSignallistWithFilter, DeleteSignal, SignalCloseApi, GetService, GetStockDetail , UpdatesignalReport } from '../../../Services/Admin';
import { fDateTimeSuffix, fDateTimeH } from '../../../Utils/Date_formate'
import { exportToCSV } from '../../../Utils/ExportData';
import Select from 'react-select';
import { Tooltip } from 'antd';



const Closesignal = () => {




    const token = localStorage.getItem('token');
    const [searchInput, setSearchInput] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [header, setheader] = useState("Close Signal");
    
    const [updatetitle, setUpdatetitle] = useState({
        report: "",
        id: "",
     

  });


    const location = useLocation();
    const clientStatus = location?.state?.clientStatus;
   


    useEffect(() => {
        if (clientStatus == "todayclosesignal") {
            setheader("Todays Close Signal")

        }
    }, [clientStatus])

    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);




    const [filters, setFilters] = useState({
        from: '',
        to: '',
        service: '',
        stock: '',
    });




    const [serviceList, setServiceList] = useState([]);
    const [stockList, setStockList] = useState([]);
    const [searchstock, setSearchstock] = useState("");
    const [ForGetCSV, setForGetCSV] = useState([])
    const [model1, setModel1] = useState(false);
    const [serviceid, setServiceid] = useState({});

    const navigate = useNavigate();
    const [clients, setClients] = useState([]);


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };



    const options = clients.map((item) => ({
        value: item.stock,
        label: item.stock,
    }));

    const handleChange = (selectedOption) => {
        setSearchstock(selectedOption ? selectedOption.value : "");
    };


    const getexportfile = async () => {
        try {
            const response = await GetSignallist(token);
            if (response.status) {
                if (response.data?.length > 0) {
                    let filterdata = response.data.filter((item) => item.close_status === true);
                    const csvArr = filterdata.map((item) => {
                        let profitAndLoss = 0;
                        if (item.calltype === "BUY") {
                            profitAndLoss = ((item.closeprice - item.price) * item.lotsize).toFixed(2);
                        } else if (item.calltype === "SELL") {
                            profitAndLoss = ((item.price - item.closeprice) * item.lotsize).toFixed(2);
                        }
    
                        return {
                            Symbol: item.tradesymbol || "",
                            segment: item?.segment || '',
                            EntryType: item?.calltype || '',
                            EntryPrice: item?.price || '',
                            ExitPrice: item?.closeprice || "",
                            ProfitAndLoss: profitAndLoss || "",
                            EntryDate: fDateTimeH(item?.created_at) || '',
                            ExitDate: fDateTimeH(item?.closedate) || ''
                        };
                    });
                    exportToCSV(csvArr, 'Close Signal');
                }
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }
    



    const getAllSignal = async () => {
        try {
            const data = {
                page: currentPage,
                from: filters.from
                    ? filters.from
                    : clientStatus === "todayopensignal"
                        ? formattedDate
                        : "",
                to: filters.to
                    ? filters.to
                    : clientStatus === "todayopensignal"
                        ? formattedDate
                        : "",
                service: filters.service,
                stock: searchstock,
                closestatus: "true",
                search: searchInput,
            };
            const response = await GetSignallistWithFilter(data, token);
            if (response && response.status) {

                let filterdata = response.data.filter((item) => item.close_status === true);

                setClients(filterdata);
                setTotalRows(response.pagination.totalRecords);

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
    }, [filters]);




    useEffect(() => {
        getAllSignal();
    }, [filters, searchInput, searchstock, currentPage]);


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
            selector: (row, index) => (currentPage - 1) * 10 + index + 1,
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
                let totalPL = 0;
                if (row.calltype === "BUY") {
                    totalPL = ((row.closeprice - row.price) * row.lotsize).toFixed(2);
                } else if (row.calltype === "SELL") {
                    totalPL = ((row.price - row.closeprice) * row.lotsize).toFixed(2);
                }
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
            width: '200px',
        },
        {
            name: 'Exit Date',
            selector: row => fDateTimeH(row.closedate),
            sortable: true,
            width: '200px',
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
        {
            name: 'Upload Pdf',
            cell: row => (
                <>
                    <div>
                        <Tooltip placement="top" overlay="Updaate">
                            <SquarePen
                                onClick={() => {
                                    setModel1(true);
                                    setServiceid(row);
                                    setUpdatetitle({ report: row.report, id: row._id });
                                }}
                            />
                        </Tooltip>
                    </div>
                    
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
 
   // Update service
   const updateReportpdf = async () => {
    try {
        const data = { id: serviceid._id, report: updatetitle.report };
   
        const response = await UpdatesignalReport(data, token);
        if (response && response.status) {
            Swal.fire({
                title: 'Success!',
                text: response.message || 'File updated successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 2000,
            });

            setUpdatetitle({ report: "", id: "", });
            setModel1(false);
        } else {
            Swal.fire({
                title: 'Error!',
                text: response.message || 'There was an error updating the file.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'server error',
            icon: 'error',
            confirmButtonText: 'Try Again',
        });
    }
};


const updateServiceTitle = (updatedField) => {
    setUpdatetitle(prev => ({
        ...prev,
        ...updatedField
    }));
};

 



    return (
        <div>
            <div>
                <div className="page-content">
                    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                        <div className="breadcrumb-title pe-3">{header}</div>
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
                            <div className="d-lg-flex align-items-center mb-4 gap-3 justify-content-between">
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
                                    onClick={(e) => getexportfile()}
                                >
                                    <button
                                        type="button"
                                        className="btn btn-primary float-end"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Export To Excel"
                                        delay={{ show: "0", hide: "100" }}

                                    >
                                        <i className="bx bxs-download" aria-hidden="true"></i>

                                        Export-Excel
                                    </button>
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
                                            value={options.find((option) => option.value === searchstock) || null}
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
             
            {model1 && (
                          <>
                                        <div className="modal-backdrop fade show"></div>
                                        <div
                                            className="modal fade show"
                                            style={{ display: 'block' }}
                                            tabIndex={-1}
                                            aria-labelledby="exampleModalLabel"
                                            aria-hidden="true"
                                        >
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">
                                                            Upload Pdf
                                                        </h5>
                                                        <button
                                                            type="button"
                                                            className="btn-close"
                                                            onClick={() => setModel1(false)}
                                                        />
                                                    </div>
                                                    <div className="modal-body">
                                                        <form>
                                                            <div className="row">
                                                                <div className="col-md-10">
                                                                    <label htmlFor="imageUpload">Upload Pdf</label>
                                                                    <span className="text-danger">*</span>
                                                                    <input
                                                                        className="form-control mb-3"
                                                                        type="file"
                                                                        accept="pdf/*"
                                                                        id="imageUpload"
                                                                        onChange={(e) => {
                                                                            const file = e.target.files[0];
                                                                            if (file) {
                                                                                updateServiceTitle({ report: file });
                                                                            }
                                                                            
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="col-md-2">
                            
                        
                                                                </div>
                                                            </div>
    
                                                        </form>


                                                    </div>
                                                    <div className="modal-footer">
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary"
                                                            onClick={() => setModel1(false)}
                                                        >
                                                            Close
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary"
                                                            onClick={updateReportpdf}
                                                        >
                                                            Update File
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

        </div>
    );
}

export default Closesignal;
