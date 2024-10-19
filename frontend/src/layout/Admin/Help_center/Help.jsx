import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHelpMessagelist } from '../../../Services/Admin';
import Table from '../../../components/Table';
import { Tooltip } from 'antd';
import { Eye } from 'lucide-react';
import { fDate } from '../../../Utils/Date_formate';



const Help = () => {

    const token = localStorage.getItem('token');

    const [clients, setClients] = useState([]);
    const [searchInput, setSearchInput] = useState("");


    const getdemoclient = async () => {
        try {
            const response = await getHelpMessagelist(token);
            if (response.status) {

                const filterdata = response.data.filter((item) =>
                    searchInput === "" ||
                    item.clientDetails?.FullName.toLowerCase().includes(searchInput.toLowerCase()) ||
                    item.clientDetails.Email.toLowerCase().includes(searchInput.toLowerCase()) ||
                    item.message.toLowerCase().includes(searchInput.toLowerCase()) ||
                    item.subject.toLowerCase().includes(searchInput.toLowerCase())
                );
                setClients(searchInput ? filterdata : response.data);
            }
        } catch (error) {
            console.log("error", error);
        }
    }


    useEffect(() => {
        getdemoclient();

    }, [searchInput]);



    return (
        <div>
            <div>
                <div>
                    <div>
                        <div className="page-content">
                            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                                <div className="breadcrumb-title pe-3">Help Message</div>
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
                                    <div className="d-lg-flex align-items-center mb-4 gap-3">
                                        <div className="position-relative">
                                            <input
                                                type="text"
                                                className="form-control ps-5 radius-10"
                                                placeholder="Search message"
                                                onChange={(e) => setSearchInput(e.target.value)}
                                                value={searchInput}
                                            />
                                            <span className="position-absolute top-50 product-show translate-middle-y">
                                                <i className="bx bx-search" />
                                            </span>
                                        </div>

                                    </div>

                                    <div className="container py-2">

                                        <div className="row">

                                            <div className="col py-2">
                                               
                                                        {clients.map((item) => (
                                                            <div className="card radius-15">
                                                                <div className="card-body p-4 position-relative">
                                                                    <div className='p-4 border radius-15'>

                                                                    
                                                            <div key={item.id}>
                                                                <div className="float-end text-muted">{fDate(item.created_at)}</div>
                                                                <h4 className="card-title">{item.clientDetails?.FullName}</h4>
                                                                <hr />
                                                                <p>
                                                                    <strong>Email:</strong> {item.clientDetails?.Email}
                                                                </p>
                                                                <p>
                                                                    <strong>Subject:</strong> {item?.subject}
                                                                </p>
                                                                <p>
                                                                    <strong>Phone No:</strong> {item?.PhoneNo}
                                                                </p>
                                                                <p>
                                                                    <strong>Description:</strong> {item?.message}
                                                                </p>
                                                            </div>
                                                                </div>
                                                            </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                              

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
}

export default Help;
