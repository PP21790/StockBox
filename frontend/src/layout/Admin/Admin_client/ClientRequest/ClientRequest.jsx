import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getClientRequestforfilter } from '../../../../Services/Admin';
import Table from '../../../../components/Table1';
import { SquarePen, Trash2, PanelBottomOpen, Eye, RefreshCcw, IndianRupee } from 'lucide-react';
import Swal from 'sweetalert2';
import { image_baseurl } from '../../../../Utils/config';
import { Tooltip } from 'antd';
import { fDateTime } from '../../../../Utils/Date_formate';




const ClientRequest = () => {


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



    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('id');


    const resethandle = () => {
        setSearchInput("")
        setStartDate("")
        setEndDate("")


    }





    const gethistory = async () => {
        try {
            const data = { page: currentPage, search: searchInput }
            const response = await getClientRequestforfilter(data, token);
            console.log("response", response)

            if (response.status) {
                console.log("response", response.requestclients)
                setTotalRows(response.pagination.totalItems)
                // setClients([filteredData?.requestclients?.clientDetails]);
            }
        } catch (error) {
            console.log("Error fetching services:", error);
        }
    };



    useEffect(() => {
        gethistory();
    }, [searchInput, currentPage]);



    const columns = [
        {
            name: 'S.No',
            selector: (row, index) => (currentPage - 1) * 10 + index + 1,
            sortable: false,
            width: '100px',
        },
        {
            name: 'FullName',
            selector: row => row?.FullName,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Email',
            selector: row => row?.Email,
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
            selector: row => row?.planCategoryTitle ? row?.planCategoryTitle : "N/A",
            sortable: true,
            width: '200px',
        },
        {
            name: 'Client Segment',
            cell: row => (
                <>
                    {Array.isArray(row?.serviceNames) && row.serviceNames.length > 0 ? (
                        row.serviceNames.map((item, index) => (
                            <span
                                key={index}
                                style={{

                                    marginRight: '5px',
                                }}
                            >
                                {item || "N/A"}
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
            name: 'Order_ID',
            selector: row => row.orderid ? row.orderid : "Make By Admin",
            sortable: true,
            width: '200px',
        },

        {
            name: 'Plan Amount',
            selector: row => <div> <IndianRupee />{row.plan_price}</div>,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Plan Discount',
            selector: row => <div> <IndianRupee />{row.discount}</div>,
            sortable: true,
            width: '200px',
        },

        {
            name: 'Coupon Id',
            selector: row => row.coupon ? row.coupon : "N/A",
            sortable: true,
            width: '200px',
        },




        {
            name: 'Total',
            selector: row => <div> <IndianRupee />{row.total}</div>,
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
            selector: row => row.validity,
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
                    <div className="breadcrumb-title pe-3">Client Request</div>
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


                            {/* <div>

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
                            </div> */}
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

        </div>
    );
};

export default ClientRequest;
