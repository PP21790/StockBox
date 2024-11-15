import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPayementhistory , getPayementhistorywithfilter } from '../../../Services/Admin';
// import Table from '../../../components/Table';
import Table from '../../../components/Table1';
import { SquarePen, Trash2, PanelBottomOpen, Eye , RefreshCcw } from 'lucide-react';
import Swal from 'sweetalert2';
import { image_baseurl } from '../../../Utils/config';
import { Tooltip } from 'antd';
import { fDateTime } from '../../../Utils/Date_formate';
import ExportToExcel from '../../../Utils/ExportCSV';



const History = () => {



    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [model, setModel] = useState(false);
    const [serviceid, setServiceid] = useState({});
    const [searchInput, setSearchInput] = useState("");
    const [viewpage, setViewpage] = useState({});
    const [ForGetCSV, setForGetCSV] = useState([])
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const [updatetitle, setUpdatetitle] = useState({
        title: "",
        id: "",
        description: "",
        image: "",

    });




    const [title, setTitle] = useState({
        title: "",
        description: "",
        image: "",
        add_by: "",
    });

    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('id');
  

    const resethandle = () => {
        setSearchInput("")
        setStartDate("")
        setEndDate("")


    }


    const forCSVdata = () => {
        if (clients?.length > 0) {
            const csvArr = clients.map((item) => ({
                Name: item.clientName || "",
                Email: item.clientEmail || "",
                Phone: item.clientPhoneNo || "",
                OerderId: item.orderid || "",
                PlanDiscount: item.discount || "",
                PlanAmount: item.plan_price || "",
                Title: item.planDetails?.title || '',
                Total: item.planDetails?.price || '',
                Validity: item.planDetails?.validity || '',
                PurchaseDate: item.created_at || '',

            }));
            setForGetCSV(csvArr);
        }
    };




    // Getting services
    //    const gethistory = async () => {
    //     try {
    //         const response = await getPayementhistory(token);
    //         if (response.status) {
    //             const filterdata = response.data.filter((item) =>
    //                 searchInput === "" ||
    //                 item.title?.toLowerCase().includes(searchInput.toLowerCase()) ||
    //                 item.clientName?.toLowerCase().includes(searchInput.toLowerCase()) ||
    //                 item.clientEmail?.toLowerCase().includes(searchInput.toLowerCase()) ||
    //                 item.clientPhoneNo?.toLowerCase().includes(searchInput.toLowerCase()) ||
    //                 item.orderid?.toLowerCase().includes(searchInput.toLowerCase()) ||
    //                 item.planDetails?.validity?.toLowerCase().includes(searchInput.toLowerCase())
    //             );
    //             setClients(searchInput ? filterdata : response.data);

    //         }
    //     } catch (error) {
    //         console.log("Error fetching services:", error);
    //     }
    // };


    // const gethistory = async () => {
    //     try {
    //         const response = await getPayementhistory(token);
    //         if (response.status) {
    //             let filteredData = response.data;

    //             if (searchInput) {
    //                 filteredData = filteredData.filter((item) =>
    //                     item.title?.toLowerCase().includes(searchInput.toLowerCase()) ||
    //                     item.clientName?.toLowerCase().includes(searchInput.toLowerCase()) ||
    //                     item.clientEmail?.toLowerCase().includes(searchInput.toLowerCase()) ||
    //                     item.clientPhoneNo?.toLowerCase().includes(searchInput.toLowerCase()) ||
    //                     item.orderid?.toLowerCase().includes(searchInput.toLowerCase()) ||
    //                     item.planDetails?.validity?.toLowerCase().includes(searchInput.toLowerCase())
    //                 );
    //             }

    //             if (startDate && endDate) {
    //                 filteredData = filteredData.filter((item) => {
    //                     const itemDate = new Date(item.created_at);
    //                     return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    //                 });
    //             }

    //             setClients(filteredData);
    //         }
    //     } catch (error) {
    //         console.log("Error fetching services:", error);
    //     }
    // };


    const gethistory = async () => {
        try {
            const data = {page: 1,fromDate:"" , toDate:""}
            const response = await getPayementhistorywithfilter(data,token);
            console.log("data",data)
            if (response.status) {
                let filteredData = response.data;
                setTotalRows(response.pagination.total)
                console.log("filteredData",filteredData)
                if (searchInput) {
                    filteredData = filteredData.filter((item) =>
                        item.title?.toLowerCase().includes(searchInput.toLowerCase()) ||
                        item.clientName?.toLowerCase().includes(searchInput.toLowerCase()) ||
                        item.clientEmail?.toLowerCase().includes(searchInput.toLowerCase()) ||
                        item.clientPhoneNo?.toLowerCase().includes(searchInput.toLowerCase()) ||
                        item.orderid?.toLowerCase().includes(searchInput.toLowerCase()) ||
                        item.planDetails?.validity?.toLowerCase().includes(searchInput.toLowerCase())
                    );
                }

                setClients(filteredData);
            }
        } catch (error) {
            console.log("Error fetching services:", error);
        }
    };



    useEffect(() => {
        gethistory();
        forCSVdata()
    }, [searchInput, startDate, endDate]);

    useEffect(() => {
        forCSVdata()
    }, [searchInput, clients]);


    const columns = [
        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '100px',
        },
        {
            name: 'Name',
            selector: row => row.clientName,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Email',
            selector: row => row.clientEmail,
            sortable: true,
            width: '300px',
        },
        {
            name: 'Phone',
            selector: row => row.clientPhoneNo,
            sortable: true,
            width: '200px',
        },

        {
            name: 'Title',
            selector: row => row.planDetails.title,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Order_ID',
            selector: row => row.orderid ? row.orderid : "Make By Admin",
            sortable: true,
            width: '200px',
        },
        {
            name: 'Plan Discount',
            selector: row => row.discount,
            sortable: true,
            width: '200px',
        },

        {
            name: 'Plan Amount',
            selector: row => row.plan_price,
            sortable: true,
            width: '200px',
        },

        {
            name: 'Total',
            selector: row => row.total,
            sortable: true,
            width: '200px',
        },
        // {
        //     name: 'Plan Price',
        //     selector: row => row.planDetails.plan_price,
        //     sortable: true,
        // },
        {
            name: 'Validity',
            selector: row => row.planDetails.validity,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Purchase Date.',
            selector: row => fDateTime(row?.created_at),
            sortable: true,
            width: '200px',
        },
        // {
        //     name: 'Plan End',
        //     selector: row => new Date(row.planDetails.plan_end).toLocaleDateString(),
        //     sortable: true,
        // },
        // {
        //     name: 'Date',
        //     selector: row => fDate(row.planDetails.created_at),
        //     sortable: true,
        // },
        // {
        //     name: 'Actions',
        //     cell: row => (
        //         <>
        //             <div>
        //                 <Tooltip placement="top" overlay="View">
        //                     <Eye
        //                         data-bs-toggle="modal"
        //                         data-bs-target="#example"
        //                         onClick={() => setViewpage(row)}
        //                     />
        //                 </Tooltip>
        //             </div>


        //         </>
        //     ),
        //     ignoreRowClick: true,
        //     allowOverflow: true,
        //     button: true,
        // }
    ];





    return (
        <div>
            <div className="page-content">

                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">Payment History</div>
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
                        <div className="d-lg-flex align-items-center mb-4 gap-3 justify-content-between">

                            <div className="position-relative">
                                <input
                                    type="text"
                                    className="form-control ps-5 radius-10"
                                    placeholder="Search Payment History"
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    value={searchInput}
                                />
                                <span className="position-absolute top-50 product-show translate-middle-y">
                                    <i className="bx bx-search" />
                                </span>

                            </div>


                            <div>

                                <div
                                    className="dropdown dropdown-action"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="bottom"
                                    title="Download"
                                >
                                    <ExportToExcel
                                        className="btn btn-primary "
                                        apiData={ForGetCSV}
                                        fileName={'All Users'} />


                                </div>
                            </div>
                        </div>
                        <div className='row mb-2'>
                            <div className="col-md-3">
                                <input
                                    type="date"
                                    className="form-control"
                                    onChange={(e) => setStartDate(e.target.value)}
                                    value={startDate}
                                />
                            </div>


                            <div className='col-md-3'>
                                <input
                                    type="date"
                                    className="form-control"
                                    onChange={(e) => setEndDate(e.target.value)}
                                    value={endDate}
                                />
                            </div>

                            <div className="col-md-1">
                                    <div className="refresh-icon mt-1">
                                        <RefreshCcw onClick={resethandle} />
                                    </div>
                                </div>
                        </div>
                        <div className="table-responsive">
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

            <div className="button-group">

                <div
                    className="modal fade"
                    id="example"
                    tabIndex={-1}
                    aria-labelledby="example"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="example">
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">
                                <ul>
                                    <li>
                                        <div className="row justify-content-between">
                                            <div className="col-md-6">
                                                <b>Title :  {viewpage?.clientName}</b>
                                            </div>
                                            <div className="col-md-6">

                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row justify-content-between">
                                            <div className="col-md-6">
                                                <b>Price : {viewpage?.planDetails?.price}</b>
                                            </div>
                                            <div className="col-md-6">

                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row justify-content-between">
                                            <div className="col-md-6">
                                                <b>Validity : {viewpage?.planDetails?.validity}</b>
                                            </div>
                                            <div className="col-md-6">

                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row justify-content-between">
                                            <div >
                                                <b>Description : {viewpage?.planDetails?.description} </b>
                                            </div>
                                            <div className="col-md-6">

                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row justify-content-between">
                                            <div className="col-md-8">
                                                {viewpage?.planDetails?.created_at ? (
                                                    <b>Payout Date: {fDateTime(viewpage.planDetails.created_at)}</b>
                                                ) : (
                                                    <b>Payout Date: Not available</b>
                                                )}
                                            </div>
                                            <div className="col-md-6"></div>
                                        </div>
                                    </li>

                                    {/* <li>
                                        <div className="row justify-content-between">
                                            <div className="col-md-6">
                                                <b>Updated At</b>
                                            </div>
                                            <div className="col-md-6">

                                            </div>
                                        </div>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default History;
