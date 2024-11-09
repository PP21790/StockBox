import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCcw } from 'lucide-react';
import Table from '../../../components/Table';
import ExportToExcel from '../../../Utils/ExportCSV';
import { getclientPlanexpiry, GetService } from '../../../Services/Admin';
import { fDateTimeH } from '../../../Utils/Date_formate';

const Planexpiry = () => {


    const token = localStorage.getItem('token');


    const [searchInput, setSearchInput] = useState("");
    const [searchstock, setSearchstock] = useState("");
    const [clients, setClients] = useState([]);
    const [serviceList, setServiceList] = useState([]);
    const [ForGetCSV, setForGetCSV] = useState([]);



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


    
    const getclientdata = async () => {
        try {
            const response = await getclientPlanexpiry(token);
            if (response && response.status) {
                const filteredData = response.data.filter((item) =>
                    (searchInput === "" || item.clientFullName.toLowerCase().includes(searchInput.toLowerCase())) &&
                    (searchstock === "" || item.serviceTitle.toLowerCase().includes(searchstock.toLowerCase()))
                );
                setClients(filteredData);
            }
        } catch (error) {
            console.log("Error fetching client data:", error);
        }
    };




    const forCSVdata = () => {
        if (clients.length > 0) {
            const csvArr = clients.map((item) => ({
                FullName: item.clientFullName || "",
                Segment: item.serviceTitle || '',
                StartDate: item.startdate || '',
                EndDate: item.enddate || '',
            }));
            setForGetCSV(csvArr);
        }
    };



    useEffect(() => {
        fetchAdminServices();
    }, []);




    useEffect(() => {
        getclientdata();
    }, [searchInput, searchstock]);




    useEffect(() => {
        forCSVdata();
    }, [clients]);




    const resetFilters = () => {
        setSearchInput("");
        setSearchstock("");
        getclientdata();
    };




    const columns = [
        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '200px',
        },
        {
            name: 'Client Full Name',
            selector: row => row.clientFullName,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Segment',
            selector: row => row.serviceTitle,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Start Date',
            selector: row => fDateTimeH(row.startdate),
            sortable: true,
            width: '200px',
        },
        {
            name: 'End Date',
            selector: row => fDateTimeH(row.enddate),
            sortable: true,
            width: '200px',
        },
    ];

    return (
        <div className="page-content">
            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div className="breadcrumb-title pe-3">Plan Expiry</div>
                <div className="ps-3">
                    <Link to="/admin/dashboard"><i className="bx bx-home-alt" /></Link>
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
                                placeholder="Search Client"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <span className="position-absolute top-50 product-show translate-middle-y">
                                <i className="bx bx-search" />
                            </span>
                        </div>
                        <ExportToExcel
                            className="btn btn-primary ms-2"
                            apiData={ForGetCSV}
                            fileName="All_Users"
                        />
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-3">
                            <label>Select Service</label>
                            <select
                                className="form-control radius-10"
                                value={searchstock}
                                onChange={(e) => setSearchstock(e.target.value)}
                            >
                                <option value="">Select Service</option>
                                {serviceList.map((service) => (
                                    <option key={service._id} value={service.title}>
                                        {service.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3 d-flex align-items-end">
                            <RefreshCcw className="refresh-icon" onClick={resetFilters} />
                        </div>
                    </div>
                    <Table columns={columns} data={clients} />
                </div>
            </div>
        </div>
    );
};

export default Planexpiry;