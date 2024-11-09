import React, { useState, useEffect } from 'react';
import { getPerformerstatus, GetService } from '../../../Services/Admin';
import Table from '../../../components/Table';
import Swal from 'sweetalert2';
import { fDateTime } from '../../../Utils/Date_formate';
import { Link } from 'react-router-dom';

const Perform = () => {
    const token = localStorage.getItem('token');
    const [clients, setClients] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [activeTab, setActiveTab] = useState(null); 
    const [servicedata, setServicedata] = useState([]);



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
                console.log("response.data", response.data);
            }
        } catch (error) {
            console.log("Error fetching performance data:", error);
        }
    };

    const columns = [
        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '100px',
        },
        {
            name: 'accuracy',
            selector: row => row.accuracy.toFixed(3),
            sortable: true,
            width: '200px',
        },
        {
            name: 'avgreturnpermonth',
            selector: row => row.avgreturnpermonth.toFixed(3),
            sortable: true,
            width: '250px',
        },
        {
            name: 'avgreturnpertrade',
            selector: row => row.avgreturnpertrade.toFixed(3),
            sortable: true,
            width: '200px',
        },
        {
            name: 'count',
            selector: row => row.count.toFixed(3),
            sortable: true,
            width: '200px',
        },
        {
            name: 'lossCount',
            selector: row => row.lossCount.toFixed(3),
            sortable: true,
            width: '200px',
        },
        {
            name: 'profitCount',
            selector: row => row.profitCount.toFixed(3),
            sortable: true,
            width: '200px',
        },
        {
            name: 'totalLoss',
            selector: row => row.totalLoss.toFixed(3),
            sortable: true,
        },
        {
            name: 'totalProfit',
            selector: row => row.totalProfit.toFixed(3),
            sortable: true,
            width:"200px"
        },
    ];




    const renderTable = () => {
        const activeService = servicedata.find(service => service._id === activeTab);
        return (
            <div className="table-responsive">
                <h5>{activeService ? `Performance for ${activeService.title}` : 'Performance'}</h5>
                <Table columns={columns} data={clients} />
            </div>
        );
    };

    const handleTabClick = (serviceId) => {
        setActiveTab(serviceId);
        getperformdata(serviceId);  
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

                                    <div className="tab-content">
                                        <div id="navpills" className="tab-pane active">
                                            {renderTable()}
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
};

export default Perform;
