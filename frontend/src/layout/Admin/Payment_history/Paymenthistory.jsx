import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getnewslist, AddNewsbyadmin, UpdateNewsbyadmin, changeNewsStatus, DeleteNews ,getPayementhistory} from '../../../Services/Admin';
import Table from '../../../components/Table';
import { SquarePen, Trash2, PanelBottomOpen } from 'lucide-react';
import Swal from 'sweetalert2';
import { image_baseurl } from '../../../Utils/config';
import { Tooltip } from 'antd';


const History = () => {



    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [model, setModel] = useState(false);
    const [serviceid, setServiceid] = useState({});
    const [searchInput, setSearchInput] = useState("");
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





    // Getting services
    const gethistory = async () => {
        try {
            const response = await getPayementhistory(token);
            if (response.status) {
                const filterdata = response.data.filter((item) =>
                    searchInput === "" ||
                    item.title.toLowerCase().includes(searchInput.toLowerCase())
                );
                setClients(searchInput ? filterdata : response.data);
            }
        } catch (error) {
            console.log("Error fetching services:", error);
        }
    };

    useEffect(() => {
        gethistory();
    }, [searchInput]);


    const columns = [
        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '70px',
        },
        {
            name: 'Name',
            selector: row => row.clientName,
            sortable: true,
        },

        {
            name: 'Title',
            selector: row => row.planDetails.title,
            sortable: true,
        },
        {
            name: 'Total',
            selector: row => row.planDetails.price,
            sortable: true,
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
        },
        {
            name: 'Plan Start',
            selector: row => new Date(row.planDetails.created_at).toLocaleDateString(),
            sortable: true,
        },
        // {
        //     name: 'Plan End',
        //     selector: row => new Date(row.planDetails.plan_end).toLocaleDateString(),
        //     sortable: true,
        // },
        {
            name: 'Date',
            selector: row => new Date(row.planDetails.created_at).toLocaleDateString(),
            sortable: true,
        },
       
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
                 <hr/>
                <div className="card">
                    <div className="card-body">
                        <div className="d-lg-flex align-items-center mb-4 gap-3">
                            <div className="position-relative">
                                <input
                                    type="text"
                                    className="form-control ps-5 radius-10"
                                    placeholder="Search Order"
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    value={searchInput}
                                />
                                <span className="position-absolute top-50 product-show translate-middle-y">
                                    <i className="bx bx-search" />
                                </span>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <Table
                                columns={columns}
                                data={clients}
                                pagination
                                striped
                                highlightOnHover
                                dense
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;
