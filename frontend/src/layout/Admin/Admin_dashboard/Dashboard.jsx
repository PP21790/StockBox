import React, { useEffect, useState } from 'react'
import { getDashboarddetail } from '../../../Services/Admin'
import { GetClient } from '../../../Services/Admin';
import { fDateTime } from '../../../Utils/Date_formate';
import Table from '../../../components/Table';
import { Link } from 'react-router-dom';


const Dashbord = () => {

    const token = localStorage.getItem('token');

    const [data, setData] = useState([])
    const [clients, setClients] = useState([]);


    const getdetail = async () => {
        try {
            const response = await getDashboarddetail(token);
            if (response.status) {

                setData(response.data)
            }
        } catch (error) {
            console.log("Error fetching services:", error);
        }
    };



    const getAdminclient = async () => {
        try {
            const response = await GetClient(token);
            if (response.status) {
                const topClients = response.data.slice(0, 5);
                setClients(topClients);
            }
        } catch (error) {
            console.log("error");
        }
    }

    useEffect(() => {
        getdetail()
        getAdminclient()
    }, [])





    const columns = [
        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '100px',
        },
        {
            name: 'Full Name',
            selector: row => row.FullName,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Email',
            selector: row => row.Email,
            sortable: true,
            width: '400px',

        },
        {
            name: 'Plan Status',
            cell: row => {
                const hasActive = row?.plansStatus?.some(item => item.status === 'active');
                const hasExpired = row?.plansStatus?.some(item => item.status === 'expired');

                let statusText = 'N/A';
                let color = 'red';

                if (hasActive) {
                    statusText = 'Active';
                    color = 'green';
                } else if (hasExpired) {
                    statusText = 'Expired';
                    color = 'orange';
                }

                return (
                    <span style={{ color }}>
                        {statusText}
                    </span>
                );
            },
            sortable: true,
            width: '200px',
        },

        {
            name: 'Client Segment',
            cell: row => (
                <>
                    {Array.isArray(row?.plansStatus) && row.plansStatus.length > 0 ? (
                        row.plansStatus.map((item, index) => (
                            <span
                                key={index}
                                style={{
                                    color: item.status === 'active' ? 'green' : item.status === 'expired' ? 'red' : 'inherit',
                                    marginRight: '5px',
                                }}
                            >
                                {item.serviceName || "N/A"}
                            </span>
                        ))
                    ) : (
                        <span>N/A</span>
                    )}
                </>
            ),
            sortable: true,
            width: '200px',
        },
        {
            name: 'Phone No',
            selector: row => row.PhoneNo,
            sortable: true,
            width: '200px',
        },


        {
            name: 'Created By',
            selector: row => row.addedByDetails?.FullName ?? (row.clientcome === 1 ? "WEB" : "APP"),
            sortable: true,
            width: '165px',
        },

        {
            name: 'CreatedAt',
            selector: row => fDateTime(row.createdAt),
            sortable: true,

        },

    ];



    return (
        <div>

            <div className="page-content">
                <div className="row newbg">
                    <div className="col-md-3">
                        <div className="card radius-10 bg-gradient-deepblue">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <h5 className="mb-0 text-white">{data.clientCountTotal && data.clientCountTotal}</h5>
                                    <div className="ms-auto">
                                        <i className="bx bx-user fs-3 text-white" />
                                    </div>
                                </div>
                                <div
                                    className="progress my-2 bg-opacity-25 bg-white"
                                    style={{ height: 4 }}
                                >
                                    <div
                                        className="progress-bar bg-white"
                                        role="progressbar"
                                        style={{ width: "55%" }}
                                        aria-valuenow={25}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    />
                                </div>
                                <div className="d-flex align-items-center text-white">
                                    <p className="mb-0">Total Clients</p>

                                    <p className="mb-0 ms-auto">

                                        <span>
                                            <Link to="/admin/client" ><i className="bx bx-up-arrow-alt text-white" /> </Link>
                                        </span>

                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card radius-10 bg-gradient-ohhappiness">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <h5 className="mb-0 text-white">{data.clientCountActive && data.clientCountActive}</h5>
                                    <div className="ms-auto">
                                        <i className="fadeIn animated bx bx-user-circle fs-3 text-white" />
                                    </div>
                                </div>
                                <div
                                    className="progress my-2 bg-opacity-25 bg-white"
                                    style={{ height: 4 }}
                                >
                                    <div
                                        className="progress-bar bg-white"
                                        role="progressbar"
                                        style={{ width: "55%" }}
                                        aria-valuenow={25}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    />
                                </div>
                                <div className="d-flex align-items-center text-white">
                                    <p className="mb-0">Total Active Client</p>
                                    <p className="mb-0 ms-auto">

                                        <span>
                                            <Link to="/admin/client" state={{ clientStatus: 1 }}>
                                                <i className="bx bx-up-arrow-alt text-white" />
                                            </Link>



                                            {/* <i className="bx bx-up-arrow-alt" /> */}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card radius-10 bg-gradient-ibiza">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <h5 className="mb-0 text-white">{data.clientCountTotal - data.clientCountActive}</h5>
                                    <div className="ms-auto">
                                        <i className="fadeIn animated bx bx-user-x fs-3 text-white" />
                                    </div>
                                </div>
                                <div
                                    className="progress my-2 bg-opacity-25 bg-white"
                                    style={{ height: 4 }}
                                >
                                    <div
                                        className="progress-bar bg-white"
                                        role="progressbar"
                                        style={{ width: "55%" }}
                                        aria-valuenow={25}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    />
                                </div>
                                <div className="d-flex align-items-center text-white">
                                    <p className="mb-0">Total Deactive Client</p>
                                    <p className="mb-0 ms-auto">

                                        <span>
                                            <Link to="/admin/client" state={{ clientStatus: 0 }}><i className="bx bx-up-arrow-alt text-white" /></Link>
                                            {/* <i className="bx bx-up-arrow-alt" /> */}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card radius-10 bg-gradient-moonlit">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <h5 className="mb-0 text-white">{data.userCountTotal && data.userCountTotal}</h5>
                                    <div className="ms-auto">
                                        <i className="bx bx-user-plus fs-3 text-white" />
                                    </div>
                                </div>
                                <div
                                    className="progress my-2 bg-opacity-25 bg-white"
                                    style={{ height: 4 }}
                                >
                                    <div
                                        className="progress-bar bg-white"
                                        role="progressbar"
                                        style={{ width: "55%" }}
                                        aria-valuenow={25}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    />
                                </div>
                                <div className="d-flex align-items-center text-white">
                                    <p className="mb-0">Total Staff</p>
                                    <p className="mb-0 ms-auto">

                                        <span>
                                            <Link to="/admin/staff"><i className="bx bx-up-arrow-alt text-white" /></Link>
                                            {/* <i className="bx bx-up-arrow-alt" /> */}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card radius-10 bg-gradient-moonlit ">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <h5 className="mb-0 text-white">{data.todayOpenSignal && data.todayOpenSignal}</h5>
                                    <div className="ms-auto">
                                        <i className="bx bx-wifi-2 fs-3 text-white" />
                                    </div>
                                </div>
                                <div
                                    className="progress my-2 bg-opacity-25 bg-white"
                                    style={{ height: 4 }}
                                >
                                    <div
                                        className="progress-bar bg-white"
                                        role="progressbar"
                                        style={{ width: "55%" }}
                                        aria-valuenow={25}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    />
                                </div>
                                <div className="d-flex align-items-center text-white">
                                    <p className="mb-0">Todays Open Signal</p>
                                    <p className="mb-0 ms-auto">

                                        <span>
                                            {/* <Link to="/admin/signal"><i className="bx bx-up-arrow-alt text-white" /></Link> */}
                                            <Link to="/admin/signal" state={{ clientStatus: "todayopensignal" }}>
                                                <i className="bx bx-up-arrow-alt text-white" />
                                            </Link>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card radius-10 bg-gradient-ibiza ">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <h5 className="mb-0 text-white">{data.todayCloseSignal && data.todayCloseSignal}</h5>
                                    <div className="ms-auto">
                                        <i className="fadeIn animated bx bx-wifi-off fs-3 text-white" />
                                    </div>
                                </div>
                                <div
                                    className="progress my-2 bg-opacity-25 bg-white"
                                    style={{ height: 4 }}
                                >
                                    <div
                                        className="progress-bar bg-white"
                                        role="progressbar"
                                        style={{ width: "55%" }}
                                        aria-valuenow={25}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    />
                                </div>
                                <div className="d-flex align-items-center text-white">
                                    <p className="mb-0">Todays Close Signal</p>
                                    <p className="mb-0 ms-auto">

                                        <span>
                                            {/* <Link to="/admin/closesignal"><i className="bx bx-up-arrow-alt text-white" /></Link> */}
                                            <Link to="/admin/closesignal" state={{ clientStatus: "todayclosesignal" }}>
                                                <i className="bx bx-up-arrow-alt text-white" />
                                            </Link>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card radius-10 bg-gradient-ohhappiness">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <h5 className="mb-0 text-white">{data.OpensignalCountTotal && data.OpensignalCountTotal}</h5>
                                    <div className="ms-auto">
                                        <i className="bx bxl-redux fs-3 text-white" />
                                    </div>
                                </div>
                                <div
                                    className="progress my-2 bg-opacity-25 bg-white"
                                    style={{ height: 4 }}
                                >
                                    <div
                                        className="progress-bar bg-white"
                                        role="progressbar"
                                        style={{ width: "55%" }}
                                        aria-valuenow={25}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    />
                                </div>
                                <div className="d-flex align-items-center text-white">
                                    <p className="mb-0">Total Open Signal</p>
                                    <p className="mb-0 ms-auto">

                                        <span>
                                            <Link to="/admin/signal"><i className="bx bx-up-arrow-alt text-white" /></Link>
                                            {/* <i className="bx bx-up-arrow-alt" /> */}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card radius-10 bg-gradient-deepblue">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <h5 className="mb-0 text-white">{data.CloseSignalCountTotal && data.CloseSignalCountTotal}</h5>
                                    <div className="ms-auto">
                                        <i className="bx bx-wifi-2 fs-3 text-white" />
                                    </div>
                                </div>
                                <div
                                    className="progress my-2 bg-opacity-25 bg-white"
                                    style={{ height: 4 }}
                                >
                                    <div
                                        className="progress-bar bg-white"
                                        role="progressbar"
                                        style={{ width: "55%" }}
                                        aria-valuenow={25}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    />
                                </div>
                                <div className="d-flex align-items-center text-white">
                                    <p className="mb-0">Total Close Signal </p>
                                    <p className="mb-0 ms-auto">

                                        <span>
                                            <Link to="/admin/closesignal"><i className="bx bx-up-arrow-alt text-white" /></Link>
                                            {/* <i className="bx bx-up-arrow-alt" /> */}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card radius-10 bg-gradient-deepblue">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <h5 className="mb-0 text-white">{data.activePlanclient && data.activePlanclient}</h5>
                                    <div className="ms-auto">
                                        <i className="bx bx-wifi-2 fs-3 text-white" />
                                    </div>
                                </div>
                                <div
                                    className="progress my-2 bg-opacity-25 bg-white"
                                    style={{ height: 4 }}
                                >
                                    <div
                                        className="progress-bar bg-white"
                                        role="progressbar"
                                        style={{ width: "55%" }}
                                        aria-valuenow={25}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    />
                                </div>
                                <div className="d-flex align-items-center text-white">
                                    <p className="mb-0">Total Plan Active Client </p>
                                    <p className="mb-0 ms-auto">

                                        <span>
                                        <Link to="/admin/client" state={{ clientStatus: "active" }}>
                                                <i className="bx bx-up-arrow-alt text-white" />
                                            </Link>
                                            {/* <i className="bx bx-up-arrow-alt" /> */}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card radius-10 bg-gradient-deepblue">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <h5 className="mb-0 text-white">{data.inActivePlanclient && data.inActivePlanclient}</h5>
                                    <div className="ms-auto">
                                        <i className="bx bx-wifi-2 fs-3 text-white" />
                                    </div>
                                </div>
                                <div
                                    className="progress my-2 bg-opacity-25 bg-white"
                                    style={{ height: 4 }}
                                >
                                    <div
                                        className="progress-bar bg-white"
                                        role="progressbar"
                                        style={{ width: "55%" }}
                                        aria-valuenow={25}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    />
                                </div>
                                <div className="d-flex align-items-center text-white">
                                    <p className="mb-0">Total Plan Expired </p>
                                    <p className="mb-0 ms-auto">

                                        <span>
                                        <Link to="/admin/client" state={{ clientStatus: "expired" }}>
                                                <i className="bx bx-up-arrow-alt text-white" />
                                            </Link>
                                            {/* <i className="bx bx-up-arrow-alt" /> */}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card radius-10 bg-gradient-deepblue">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <h5 className="mb-0 text-white">{data.activeFreetrial && data.activeFreetrial}</h5>
                                    <div className="ms-auto">
                                        <i className="bx bx-wifi-2 fs-3 text-white" />
                                    </div>
                                </div>
                                <div
                                    className="progress my-2 bg-opacity-25 bg-white"
                                    style={{ height: 4 }}
                                >
                                    <div
                                        className="progress-bar bg-white"
                                        role="progressbar"
                                        style={{ width: "55%" }}
                                        aria-valuenow={25}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    />
                                </div>
                                <div className="d-flex align-items-center text-white">
                                    <p className="mb-0">Total Active Free Client</p>
                                    <p className="mb-0 ms-auto">

                                        <span>
                                            <Link to="/admin/freeclient"><i className="bx bx-up-arrow-alt text-white" /></Link>
                                            {/* <i className="bx bx-up-arrow-alt" /> */}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card radius-10 bg-gradient-deepblue">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <h5 className="mb-0 text-white">{data.inActiveFreetrial && data.inActiveFreetrial}</h5>
                                    <div className="ms-auto">
                                        <i className="bx bx-wifi-2 fs-3 text-white" />
                                    </div>
                                </div>
                                <div
                                    className="progress my-2 bg-opacity-25 bg-white"
                                    style={{ height: 4 }}
                                >
                                    <div
                                        className="progress-bar bg-white"
                                        role="progressbar"
                                        style={{ width: "55%" }}
                                        aria-valuenow={25}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    />
                                </div>
                                <div className="d-flex align-items-center text-white">
                                    <p className="mb-0">Total InActive Free Client</p>
                                    <p className="mb-0 ms-auto">

                                        <span>
                                            <Link to="/admin/freeclient"><i className="bx bx-up-arrow-alt text-white" /></Link>
                                            {/* <i className="bx bx-up-arrow-alt" /> */}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card radius-10">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <div>
                                <h5 className="mb-0">Recent Clients</h5>
                            </div>

                        </div>
                        <hr />

                        <div className="table-responsive d-flex justify-content-center">
                            <Table

                                columns={columns}
                                data={clients}
                            />
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Dashbord
