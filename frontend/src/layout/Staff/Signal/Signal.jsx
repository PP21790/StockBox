import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GetClient } from '../../../Services/Admin';
import Table from '../../../components/Table';
import { Eye, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { GetSignallist, DeleteSignal, SignalCloseApi, GetService, GetStockDetail } from '../../../Services/Admin';
import { fDateTimeSuffix } from '../../../Utils/Date_formate'



const Signal = () => {

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

    const [checkedIndex, setCheckedIndex] = useState(null);

    const handleTabChange = (index) => {
        setCheckedIndex(index);
    };

    const [checkedTargets, setCheckedTargets] = useState({
        target1: false,
        target2: false,
        target3: false
    });


    const [checkedTargets1, setCheckedTargets1] = useState({
        target1: 0,
        target2: 0,
        target3: 0,
    });


    const handleCheckboxChange = (e, target) => {

        setCheckedTargets1((prevState) => ({
            ...prevState,
            [target]: e.target.checked ? 1 : 0,
        }));

        setCheckedTargets((prev) => {
            const newCheckedTargets = { ...prev, [target]: !prev[target] };
            if (!newCheckedTargets[target]) {
                setClosedata((prevData) => ({
                    ...prevData,
                    [`targethit${target.slice(-1)}`]: ''
                }));
            }
            return newCheckedTargets;
        });
    };



    const handleChange = (e, field) => {

        setClosedata({
            ...closedata,
            [field]: e.target.value
        });
    };


    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [model, setModel] = useState(false);
    const [serviceid, setServiceid] = useState({});


    const [targetvalue, setTargetvalue] = useState("")



    const [closedata, setClosedata] = useState({
        id: "",
        closestatus: "",
        close_description: "",
        targethit1: "",
        targethit2: "",
        targethit3: "",
        targetprice1: "",
        targetprice2: "",
        targetprice3: "",
        slprice: "",
        exitprice: "",
        closetype: ""
    })



    const getAllSignal = async () => {
        try {
            const response = await GetSignallist(filters, token);
            if (response && response.status) {
                const searchInputMatch = response.data.filter((item) => {
                    return (
                        searchInput === "" ||
                        item.stock.title.toLowerCase().includes(searchInput.toLowerCase())
                        ||
                        item.calltype.toLowerCase().includes(searchInput.toLowerCase())
                    );
                });

                setClients(searchInput ? searchInputMatch : response.data);
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
    }, [filters, searchInput]);


    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };


    const Signaldetail = async (_id) => {
        navigate(`signaldetaile/${_id}`)
    }




    const DeleteSignals = async (_id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to delete this staff member? This action cannot be undone.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel',
            });

            if (result.isConfirmed) {
                const response = await DeleteSignal(_id, token);
                if (response.status) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'The staff has been successfully deleted.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    getAllSignal();

                }
            } else {

                Swal.fire({
                    title: 'Cancelled',
                    text: 'The staff deletion was cancelled.',
                    icon: 'info',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'There was an error deleting the staff.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });

        }
    };




    // close signal
    const closeSignalperUser = async (index) => {
        try {
            const data = {
                id: serviceid._id,
                closestatus: closedata.closestatus,
                closetype: index == 0 ? "1" : index == "1" ? "2" : index == "2" ? "3" : "4",
                close_description: closedata.close_description,
                targethit1: index == 1 ? checkedTargets1.target1 : "",
                targethit2: index == 1 ? checkedTargets1.target1 : "",
                targethit3: index == 1 ? checkedTargets1.target1 : "",
                targetprice1: index == 0 || index == 1 ? closedata.targetprice1 : "",
                targetprice2: index == 0 || index == 1 ? closedata.targetprice2 : "",
                targetprice3: index == 0 || index == 1 ? closedata.targetprice3 : "",
                slprice: index == 2 ? closedata.slprice : "",
                exitprice: index == 3 ? closedata.exitprice : ""
            };

            const response = await SignalCloseApi(data, token);
            if (response && response.status) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Signal Close Sucessfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 2000,
                });

                setClosedata({ closeprice: "", close_description: "" });
                getAllSignal();
                setModel(!model)

            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error  close signal.',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'There was an error updating the service.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };



    // colums

    let columns = [
        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '70px',
        },

        {
            name: 'Symbol',
            selector: row => row.stock.title,
            sortable: true,
            width: '132px',
        },
        {
            name: 'Entry Type',
            selector: row => row.calltype,
            sortable: true,
            width: '132px',
        },
        {
            name: 'Entry Price',
            selector: row => row.Ttype == 0 ? row.price : "-",
            sortable: true,
            width: '132px',
        },

        {
            name: 'Exit Price',
            selector: row => row.Ttype == 1 ? row.closeprice : '-',
            sortable: true,
            width: '132px',

        },
        {
            name: 'Entry Date',
            selector: row => row.Ttype == 0 ? fDateTimeSuffix(row.created_at) : "-",
            sortable: true,
            width: '160px',
        },
        {
            name: 'Exit Date',
            selector: row => row.Ttype == 1 ? fDateTimeSuffix(row.closedate) : "-",
            sortable: true,
            width: '160px',
        },



        {
            name: 'Actions',
            cell: row => (
                <>
                    <div>
                        <Eye onClick={() => Signaldetail(row._id)} />
                    </div>
                    <div>
                        <Trash2 onClick={() => DeleteSignals(row._id)} />
                    </div>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,

        },
        {
            name: 'Status',
            cell: row => (
                <>
                    {!row.close_status ? (
                        <button
                            className="btn btn-danger btnclose"
                            onClick={() => {
                                setModel(true);
                                setServiceid(row);
                                setTargetvalue(row);
                            }}
                        >
                            Close
                        </button>
                    ) : (
                        <button
                            className="btn btn-danger btnclose"
                            onClick={() => {
                                setModel(true);
                                setServiceid(row);
                                setTargetvalue(row);
                            }}
                            disabled
                        >
                            Closed
                        </button>
                    )}
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }

    ];





    return (
        <div>
            <div>
                <div className="page-content">
                    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                        <div className="breadcrumb-title pe-3">Signal</div>
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
                                        placeholder="Search Order"
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}

                                    />
                                    <span className="position-absolute top-50 product-show translate-middle-y">
                                        <i className="bx bx-search" />
                                    </span>
                                </div>

                                <div className="ms-auto">
                                    <Link
                                        to="/staff/addsignal"
                                        className="btn btn-primary"
                                    >
                                        <i
                                            className="bx bxs-plus-square"
                                            aria-hidden="true"
                                        />
                                        Add Signal
                                    </Link>
                                </div>
                            </div>

                            <div className="row">

                                <div className="col-md-3">
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

                                <div className="col-md-3">
                                    <select
                                        name="stock"
                                        className="form-control radius-10"
                                        value={filters.stock}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="">Select Stock</option>
                                        {stockList.map((stock) => (
                                            <option key={stock._id} value={stock._id}>
                                                {stock.title}
                                            </option>
                                        ))}
                                    </select>
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


            {model && (
                <div
                    className="modal fade show"
                    style={{ display: 'block' }}
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Close Signal
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setModel(false)}
                                />
                            </div>
                            <div className="modal-body">
                                <div className='card '>
                                    <div className='d-flex justify-content-between align-items-center card-body'>
                                        {['Fully Closed', 'Partially Closed', 'SL Hit', 'Closed Signal'].map((tab, index) => (
                                            <label key={index} className='labelfont'>
                                                <input
                                                    type="radio"
                                                    name="tab"
                                                    checked={checkedIndex === index}
                                                    onChange={() => handleTabChange(index)}
                                                />
                                                <span className='ps-2'>{tab}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className='card'>
                                    {checkedIndex === 0 && (
                                        <form className='card-body'>


                                            <p>

                                                Target 1 :
                                                <input
                                                    type="number"
                                                    disabled
                                                    value={closedata.targetprice1 || targetvalue.tag1}
                                                    onChange={(e) =>
                                                        setClosedata({
                                                            ...closedata,
                                                            targetprice1: e.target.value,
                                                        })
                                                    }

                                                />

                                            </p>

                                            <p>
                                                Target 2 :
                                                <input
                                                    type="number"
                                                    disabled
                                                    value={closedata.targetprice2 || targetvalue.tag2}
                                                    onChange={(e) =>
                                                        setClosedata({
                                                            ...closedata,
                                                            targetprice2: e.target.value,
                                                        })
                                                    } />

                                            </p>

                                            <p>
                                                Target 3 :
                                                <input
                                                    type="number"
                                                    disabled
                                                    value={closedata.targetprice3 || targetvalue.tag3}
                                                    onChange={(e) =>
                                                        setClosedata({
                                                            ...closedata,
                                                            targetprice3: e.target.value,
                                                        })
                                                    } />

                                            </p>

                                            <div className="col-md-12">
                                                <label htmlFor="input11" className="form-label">
                                                    Remark
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    id="input11"
                                                    placeholder="Remark ..."
                                                    rows={3}
                                                    value={closedata.close_description}
                                                    onChange={(e) =>
                                                        setClosedata({
                                                            ...closedata,
                                                            close_description: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>

                                            <button type="submit" className='btn btn-danger mt-2' onClick={() => closeSignalperUser(0)}>Submit</button>
                                        </form>
                                    )}

                                    {checkedIndex === 1 && (

                                        <form className='card-body' onSubmit={() => closeSignalperUser(1)}>
                                            <div className="col-md-12">
                                                <div className="form-check mb-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="target1"
                                                        checked={checkedTargets.target1}
                                                        onChange={(e) => handleCheckboxChange(e, 'target1')}
                                                    />
                                                    <label className="form-check-label" htmlFor="target1">
                                                        Target 1
                                                    </label>
                                                </div>

                                                {checkedTargets.target1 && (
                                                    <div className="form-check mb-2">
                                                        <input
                                                            className="form-control"
                                                            type="number"
                                                            id="targethit1"
                                                            value={closedata.targetprice1}
                                                            onChange={(e) => handleChange(e, 'targetprice1')}
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-check mb-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="target2"
                                                        checked={checkedTargets.target2}
                                                        onChange={(e) => handleCheckboxChange(e, 'target2')}
                                                    />
                                                    <label className="form-check-label" htmlFor="target2">
                                                        Target 2
                                                    </label>
                                                </div>

                                                {checkedTargets.target2 && (
                                                    <div className="form-check mb-2">
                                                        <input
                                                            className="form-control"
                                                            type="number"
                                                            id="targethit2"
                                                            value={closedata.targetprice2}
                                                            onChange={(e) => handleChange(e, 'targetprice2')}
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-check mb-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="target3"
                                                        checked={checkedTargets.target3}
                                                        onChange={(e) => handleCheckboxChange(e, 'target3')}
                                                    />
                                                    <label className="form-check-label" htmlFor="target3">
                                                        Target 3
                                                    </label>
                                                </div>

                                                {checkedTargets.target3 && (
                                                    <div className="form-check mb-2">
                                                        <input
                                                            className="form-control"
                                                            type="number"
                                                            id="targethit3"
                                                            value={closedata.targetprice3}
                                                            onChange={(e) => handleChange(e, 'targetprice3')}
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-check mb-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="close_status"
                                                        checked={closedata.closestatus === "true"}
                                                        onChange={(e) =>
                                                            setClosedata({
                                                                ...closedata,
                                                                closestatus: e.target.checked ? "true" : "false",
                                                            })
                                                        }
                                                    />
                                                    <label className="form-check-label" htmlFor="close_status">
                                                        Close
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <label className='mb-1'>Remark</label>
                                                <textarea
                                                    className="form-control"
                                                    id="close_description"
                                                    placeholder="Remark ..."
                                                    rows={2}
                                                    value={closedata.close_description}
                                                    onChange={(e) =>
                                                        setClosedata({
                                                            ...closedata,
                                                            close_description: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>

                                            <button type="submit" className='btn btn-danger mt-2'>Submit</button>
                                        </form>

                                    )}
                                    {checkedIndex === 2 && (
                                        <form className='card-body'>

                                            <div className="col-md-12">

                                                <p>
                                                    Stoploss:  <input
                                                        type="number"
                                                        disabled
                                                        value={closedata.slprice || targetvalue.stoploss}
                                                        onChange={(e) =>
                                                            setClosedata({
                                                                ...closedata,
                                                                slprice: e.target.value,
                                                            })
                                                        }

                                                    />
                                                </p>


                                            </div>

                                            <div className="col-md-12">
                                                <label className='mb-1'>Remark</label>
                                                <textarea
                                                    className="form-control"
                                                    id="input11"
                                                    placeholder="Remark ..."
                                                    rows={2}
                                                    value={closedata.close_description}
                                                    onChange={(e) =>
                                                        setClosedata({
                                                            ...closedata,
                                                            close_description: e.target.value,
                                                        })
                                                    }

                                                />
                                            </div>

                                            <button type="submit" className='btn btn-danger mt-2' onClick={() => closeSignalperUser(2)}>Submit</button>
                                        </form>
                                    )}

                                    {checkedIndex === 3 && (
                                        <form className='card-body'>

                                            <div className="col-md-12  mb-2">

                                                <label>Exit price</label>
                                                <input
                                                    type="number"
                                                    value={closedata.exitprice}
                                                    onChange={(e) =>
                                                        setClosedata({
                                                            ...closedata,
                                                            exitprice: e.target.value,
                                                        })
                                                    }

                                                />
                                            </div>

                                            <div className="col-md-12">
                                                <label className='mb-1'>Remark</label>
                                                <textarea
                                                    className="form-control"
                                                    id="input11"
                                                    placeholder="Remark ..."
                                                    rows={2}
                                                    value={closedata.close_description}
                                                    onChange={(e) =>
                                                        setClosedata({
                                                            ...closedata,
                                                            close_description: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>

                                            <button type="submit" className='btn btn-danger mt-2' onClick={() => closeSignalperUser(3)}>Submit</button>
                                        </form>
                                    )}
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            )}



        </div>
    );
}

export default Signal;