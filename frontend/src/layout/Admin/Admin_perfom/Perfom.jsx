import React, { useState, useEffect } from 'react';
import { getPerformerstatus, GetService, getperformacebysegment } from '../../../Services/Admin';
import Table from '../../../components/Table';
import Swal from 'sweetalert2';
import { fDateTime } from '../../../Utils/Date_formate';
import { Link } from 'react-router-dom';
import { Settings2, Eye, SquarePen, Trash2, Download, ArrowDownToLine, RefreshCcw } from 'lucide-react';
import { Tooltip } from 'antd';

const Perform = () => {
    const token = localStorage.getItem('token');
    const [clients, setClients] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [activeTab, setActiveTab] = useState(null);
    const [servicedata, setServicedata] = useState([]);
    const [closesignal, setClosesignal] = useState([])
    const [description,setDescription] = useState([])


    useEffect(() => {
        getServiceData();
    }, []);



    const getServiceData = async () => {
        try {
            const response = await GetService(token);
            if (response.status) {
                setServicedata(response.data);

                const cashService = response.data.find(service => service.title === "Cash");
                const defaultService = cashService || response.data[0];

                if (defaultService) {
                    setActiveTab(defaultService._id);
                    getperformdata(defaultService._id);
                    getdatabysegment(defaultService._id);
                }
            }
        } catch (error) {
            console.log("Error fetching services:", error);
        }
    };




    const getperformdata = async (service_id) => {
        try {
            const response = await getPerformerstatus(token, service_id);
            if (response.status) {
                setClients([response.data]);
                console.log(response.data)
            }
        } catch (error) {
            console.log("Error fetching performance data:", error);
        }
    };




    const getdatabysegment = async (service_id) => {
        try {
            const response = await getperformacebysegment({ token, service_id });
            if (response.status) {
                setClosesignal(response.data);
                console.log("response.data", response.data);
            }
        } catch (error) {
            console.log("Error fetching performance data:", error);
        }
    };


    const handleViewClick = (description) => {
        setDescription({ description });
    };





    const columns1 = [
        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '100px',
        },
        {
            name: 'Tradesymbol',
            selector: row => row.tradesymbol,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Entry Type',
            selector: row => row.calltype,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Entry price',
            selector: row => row.price,
            sortable: true,
            width: '200px',
        },

        {
            name: 'Exit Price',
            selector: row => row.closeprice,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Total P&L (%)',
            cell: row => {
                let totalPL = 0;
                let plPercent = 0;

                if (row.calltype === "BUY") {
                    totalPL = ((row.closeprice - row.price) * row.lotsize).toFixed(2);
                    plPercent = (((row.closeprice - row.price) / row.price) * 100).toFixed(2);
                } else if (row.calltype === "SELL") {
                    totalPL = ((row.price - row.closeprice) * row.lotsize).toFixed(2);
                    plPercent = (((row.price - row.closeprice) / row.price) * 100).toFixed(2);
                }

                const style = {
                    color: totalPL < 0 ? 'red' : 'green',
                };

                return (
                    <span style={style}>
                        {totalPL} ({plPercent}%)
                    </span>
                );
            },
            sortable: true,
            width: '200px',
        },
        {
            name: 'Entry Date',
            selector: row => fDateTime(row.created_at),
            sortable: true,
            width: '200px',
        },

        {
            name: 'Exit Date',
            selector: row => fDateTime(row.closedate),
            sortable: true,
            width: '200px',
        },
        {
            name: 'Actions',
            selector: (row) => (
                <div className='d-flex'>


                    <Tooltip title="view">
                        <Eye

                            data-bs-toggle="modal" data-bs-target="#exampleModal"
                            onClick={() => handleViewClick([row.description])} />
                    </Tooltip>


                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '165px',
        }

    ];



    console.log("clients", clients)


    const renderTable1 = () => {
        const activeService = servicedata.find(service => service._id === activeTab);
        return (
            <div className="table-responsive">
                <h5>{activeService ? `Performance for ${activeService.title}` : 'Performance'}</h5>
                <Table columns={columns1} data={closesignal} />
            </div>
        );
    };




    const handleTabClick = (serviceId) => {
        setActiveTab(serviceId);
        getperformdata(serviceId);
        getdatabysegment(serviceId)
    };




    return (
        <div>
            <div className='page-content'>
                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">Performance Status</div>
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

                <div className='card'>
                    <div className='card-body'>
                        <div className="tab-content" id="myTabContent3">
                            <div className="tab-pane fade show active" id="NavPills">
                                <div className="card-body pt-0">
                                    <div className="d-lg-flex align-items-center mb-4 gap-3">
                                        <div className="position-relative">
                                            <input
                                                type="text"
                                                className="form-control ps-5 radius-10"
                                                placeholder="Search Payment Request"
                                                value={searchInput}
                                                onChange={(e) => setSearchInput(e.target.value)}
                                            />
                                            <span className="position-absolute top-50 product-show translate-middle-y">
                                                <i className="bx bx-search" />
                                            </span>
                                        </div>
                                    </div>

                                    <ul className="nav nav-pills nav-pills1 mb-4 light">
                                        {servicedata.map((service) => (
                                            <li className="nav-item" key={service._id}>
                                                <button
                                                    className={`nav-link navlink ${activeTab === service._id ? 'active' : ''}`}
                                                    onClick={() => handleTabClick(service._id)}
                                                >
                                                    {service.title}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="row">
                                                <div >

                                                    <div className="card radius-10 w-100" style={{ border: "1px solid grey" }}>
                                                        {clients && clients.map((item) => (
                                                            <div className="card-body p-0">
                                                                <div className="row g-0 row-group text-center" style={{ borderBottom: "1px solid grey" }}>
                                                                    <div className="col-lg-6">

                                                                        <div className="p-3">
                                                                            <b className="mb-0">Avg.return / trade</b>
                                                                            <small className="mb-0">
                                                                                {item?.avgreturnpertrade?.toFixed(2)}

                                                                            </small>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <div className="p-3">
                                                                            <b className="mb-0">  Avg.return / month</b>
                                                                            <small className="mb-0">
                                                                                {item?.avgreturnpermonth?.toFixed(2)}
                                                                            </small>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className='p-3'>
                                                                    <b className='text-black p-0'>Ideal Hit Accuracy</b><br />
                                                                    <b className='text-black p-0'>Ideal Hit Closed : <small className="mb-0">
                                                                        {item?.count}

                                                                    </small></b><br />


                                                                </div>

                                                                <div className="d-flex p-3 justify-content-between align-items-center ms-auto font-13 gap-2">
                                                                    <span className="border px-1 rounded cursor-pointer">
                                                                        <i className="bx bxs-circle me-1 text-success" />
                                                                        Hit: {item?.profitCount}
                                                                    </span>
                                                                    <span className="border px-1 rounded cursor-pointer">
                                                                        <i className="bx bxs-circle me-1 text-danger" />
                                                                        Miss: {item?.lossCount}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}


                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-content">
                                        <div id="navpills" className="tab-pane active">
                                            {renderTable1()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Description</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {description?.description}
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Perform;