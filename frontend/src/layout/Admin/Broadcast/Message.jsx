import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SendBroadCast, GetService, getBroadCastmessage, ChangeBroadCastStatus, DeleteBroadCastmessage, UpdateCastmessage } from '../../../Services/Admin';
import Swal from 'sweetalert2';
import Table from '../../../components/Table';
import { SquarePen, Trash2, PanelBottomOpen, Eye } from 'lucide-react';
import { Tooltip } from 'antd';


const Message = () => {


    useEffect(() => {
        getservice();
        sendmessagedetail();
    }, []);




    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('id');

    const [servicedata, setServicedata] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [model, setModel] = useState(false);
    const [serviceid, setServiceid] = useState({});


    const [updatetitle, setUpdatetitle] = useState({
        service: "",
        subject: "",
        message: "",
        id: "",
    });


    const [message, setMessage] = useState({
        service: "",
        subject: "",
        message: ""
    });




    const emptyfield = () => {
        setMessage({
            service: "",
            subject: "",
            message: ""
        });
    };




    const getservice = async () => {
        try {
            const response = await GetService(token);
            if (response.status) {
                setServicedata(response.data);
            }
        } catch (error) {
            console.log("Error fetching services:", error);
        }
    };




    const sendmessagedetail = async () => {
        try {
            const response = await getBroadCastmessage(token);
            if (response.status) {
                setChatMessages(response.data);
            }
        } catch (error) {
            console.log("Error fetching broadcast messages:", error);
        }
    };


    const handleSwitchChange = async (event, id) => {
        const originalChecked = event.target.checked;
        const user_active_status = originalChecked;
        const data = { id: id, status: user_active_status };

        const result = await Swal.fire({
            title: "Do you want to save the changes?",
            showCancelButton: true,
            confirmButtonText: "Save",
            cancelButtonText: "Cancel",
            allowOutsideClick: false,
        });

        if (result.isConfirmed) {
            try {
                const response = await ChangeBroadCastStatus(data, token);
                if (response.status) {
                    Swal.fire({
                        title: "Saved!",
                        icon: "success",
                        timer: 1000,
                        timerProgressBar: true,
                    });
                    setTimeout(() => {
                        Swal.close();
                    }, 1000);
                }
                sendmessagedetail();
            } catch (error) {
                Swal.fire(
                    "Error",
                    "There was an error processing your request.",
                    "error"
                );
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            event.target.checked = !originalChecked;
            sendmessagedetail();
        }
    };




    const DeleteMessage = async (_id) => {
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
                const response = await DeleteBroadCastmessage(_id, token);
                if (response.status) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'The message has been successfully deleted.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    sendmessagedetail()
                }
            } else {

                Swal.fire({
                    title: 'Cancelled',
                    text: 'The message deletion was cancelled.',
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




    const SendMessage = async () => {
        try {
            const data = { service: message.service, subject: message.subject, message: message.message };
            const response = await SendBroadCast(data, token);
            if (response && response.status) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Message sent successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 2000,
                });

                setChatMessages([...chatMessages, message]);

                setMessage({ service: "", subject: "", message: "" });

                const modal = document.getElementById('exampleModal');
                const bootstrapModal = window.bootstrap.Modal.getInstance(modal);
                if (bootstrapModal) {
                    bootstrapModal.hide();
                }
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error sending the message.',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Server Error',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };



    // Update service
    // Update service
    const updateBroadcastMessage = async () => {
        try {
            const data = {
                message: updatetitle.message,
                id: serviceid._id,
                subject: updatetitle.subject,
                service: updatetitle.service
            };
            const response = await UpdateCastmessage(data, token);
            if (response.status) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Service updated successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 2000,
                });

                setUpdatetitle({ service: "", subject: "", message: "", id: "" });
                sendmessagedetail()
                setModel(false);
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error updating the service.',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        } catch (error) {
            console.log("Update Error:", error);
            Swal.fire({
                title: 'Error!',
                text: 'server error ',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };




    const columns = [
        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '70px',
        },
        {
            name: 'Service',
            selector: row => {
                const service = servicedata.find(item => item._id === row.service);
                return service ? service.title : "";
            },
            sortable: true,
            width: '165px',
        }, ,
        {
            name: 'Subject',
            selector: row => row.subject,
            sortable: true,
            width: '284px',
        },
        {
            name: 'Message',
            selector: row => row.message,
            sortable: true,
        },
        {
            name: 'Active Status',
            selector: row => (
                <div className="form-check form-switch form-check-info">
                    <input
                        id={`rating_${row.status}`}
                        className="form-check-input toggleswitch"
                        type="checkbox"
                        defaultChecked={row.status === true}
                        onChange={(event) => handleSwitchChange(event, row._id)}
                    />
                    <label
                        htmlFor={`rating_${row.status}`}
                        className="checktoggle checkbox-bg"
                    ></label>
                </div>
            ),
            sortable: true,
            width: '165px',
        },
        {
            name: 'Actions',
            cell: row => (
                <>
                    <div>
                        <Tooltip placement="top" overlay="View">
                            <Eye style={{ marginRight: "10px" }} />
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip placement="top" overlay="Update">
                            <SquarePen
                                onClick={() => {
                                    setModel(true);
                                    setServiceid(row);
                                    setUpdatetitle({
                                        message: row.message, id: row._id, service: row.service, subject: row.subject
                                    });
                                }}
                            />
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip placement="top" overlay="Delete">
                            <Trash2 onClick={() => DeleteMessage(row._id)} />
                        </Tooltip>
                    </div>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }


    ];



    const updateServiceTitle = (key, value) => {
        setUpdatetitle(prev => ({
            ...prev,
            [key]: value
        }));
    }





    return (
        <>
            <div>
                <div className="page-content">
                    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                        <div className="breadcrumb-title pe-3">Message Broadcast</div>
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
                            <div className="d-flex justify-content-end">
                                <div className='me-2 mb-3'>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                    >
                                        <i className="bx bxs-plus-square" />
                                        Add Broadcast
                                    </button>
                                </div>
                                <div
                                    className="modal fade"
                                    id="exampleModal"
                                    tabIndex={-1}
                                    aria-labelledby="exampleModalLabel"
                                    aria-hidden="true"
                                >
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Add Broadcast</h5>
                                                <button
                                                    type="button"
                                                    className="btn-close"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                />
                                            </div>
                                            <div className="modal-body">
                                                <form>
                                                    <div className="col-md-12">
                                                        <label htmlFor="service">Select Service</label>
                                                        <select
                                                            className="form-control mb-2"
                                                            id="service"
                                                            value={message.service}
                                                            onChange={(e) => setMessage({ ...message, service: e.target.value })}
                                                        >
                                                            <option value="">Select a Service</option>
                                                            {servicedata.map((item) => (
                                                                <option value={item._id} key={item._id}>
                                                                    {item.title}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <label>Subject</label>
                                                            <input
                                                                className="form-control mb-3"
                                                                type="text"
                                                                placeholder='Enter Subject'
                                                                value={message.subject}
                                                                onChange={(e) => setMessage({ ...message, subject: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <label>Message</label>
                                                            <textarea
                                                                className="form-control mb-3"
                                                                placeholder='Enter your Message'
                                                                value={message.message}
                                                                onChange={(e) => setMessage({ ...message, message: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    data-bs-dismiss="modal"
                                                    onClick={emptyfield}
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={SendMessage}
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Table
                                columns={columns}
                                data={chatMessages}
                            />

                        </div>
                    </div>
                </div>
            </div>


            {model && (
                <>
                    <div className="modal-backdrop fade show"></div>

                    <div
                        className="modal fade show"
                        style={{ display: 'block' }}
                        tabIndex={-1}
                        aria-labelledby="updateServiceModalLabel"
                        aria-hidden="true"
                        role="dialog"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="updateServiceModalLabel">
                                        Update  Message
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Close"
                                        onClick={() => setModel(false)}
                                    />
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="col-md-12">
                                            <label htmlFor="category">Service</label>
                                            <select
                                                className="form-control mb-2"
                                                id="category"
                                                value={updatetitle.service}
                                                onChange={(e) => updateServiceTitle('service', e.target.value)}
                                                required
                                            >
                                                <option value="" disabled>Select a service</option>
                                                {servicedata && servicedata.map((item) => (

                                                    <option key={item._id} value={item._id}>{item.title}</option>

                                                ))}

                                            </select>
                                        </div>

                                        <div className="col-md-12">
                                            <label htmlFor="category">Subject</label>
                                            <input
                                                className="form-control mb-2"
                                                type="text"
                                                placeholder="Enter Category Title"
                                                id="category"
                                                value={updatetitle.subject}
                                                onChange={(e) =>
                                                    updateServiceTitle('subject', e.target.value)
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="category">Message</label>
                                            <input
                                                className="form-control mb-2"
                                                type="text"
                                                placeholder="Enter Category Title"
                                                id="category"
                                                value={updatetitle.message}
                                                onChange={(e) =>
                                                    updateServiceTitle('message', e.target.value)
                                                }
                                                required
                                            />
                                        </div>



                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setModel(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={updateBroadcastMessage}
                                    // disabled={!updatetitle.title || !updatetitle.service}
                                    >
                                        Update Service
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>

            )}

             <div className="page-content">
            <div className="">
                <div className="">
                    <div className="container py-2">
                        <h2 className="font-weight-light text-center text-muted py-3">
                            Timeline Example 1
                        </h2>
                        {/* timeline item 1 */}
                        <div className="row">
                            {/* timeline item 1 left dot */}
                            <div className="col-auto text-center flex-column d-none d-sm-flex">
                                <div className="row h-50">
                                    <div className="col">&nbsp;</div>
                                    <div className="col">&nbsp;</div>
                                </div>
                                <h5 className="m-2">
                                    <span className="badge rounded-pill bg-light border">&nbsp;</span>
                                </h5>
                                <div className="row h-50">
                                    <div className="col border-end">&nbsp;</div>
                                    <div className="col">&nbsp;</div>
                                </div>
                            </div>
                            {/* timeline item 1 event content */}
                            <div className="col py-2">
                                <div className="card radius-15">
                                    <div className="card-body">
                                        <div className="float-end text-muted">
                                            Mon, Jan 9th 2020 7:00 AM
                                        </div>
                                        <h4 className="card-title text-muted">Day 1 Orientation</h4>
                                        <p className="card-text">
                                            Welcome to the campus, introduction and get started with the
                                            tour.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*/row*/}
                        {/* timeline item 2 */}
                        <div className="row">
                            <div className="col-auto text-center flex-column d-none d-sm-flex">
                                <div className="row h-50">
                                    <div className="col border-end">&nbsp;</div>
                                    <div className="col">&nbsp;</div>
                                </div>
                                <h5 className="m-2">
                                    <span className="badge rounded-pill bg-primary">&nbsp;</span>
                                </h5>
                                <div className="row h-50">
                                    <div className="col border-end">&nbsp;</div>
                                    <div className="col">&nbsp;</div>
                                </div>
                            </div>
                            <div className="col py-2">
                                <div className="card border-primary shadow radius-15">
                                    <div className="card-body">
                                        <div className="float-end text-primary">
                                            Tue, Jan 10th 2019 8:30 AM
                                        </div>
                                        <h4 className="card-title text-primary">Day 2 Sessions</h4>
                                        <p className="card-text">
                                            Sign-up for the lessons and speakers that coincide with your
                                            course syllabus. Meet and greet with instructors.
                                        </p>
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            type="button"
                                            data-bs-target="#t2_details"
                                            data-bs-toggle="collapse"
                                        >
                                            Show Details ▼
                                        </button>
                                        <div className="collapse border" id="t2_details">
                                            <div className="p-2 text-monospace">
                                                <div>08:30 - 09:00 Breakfast in CR 2A</div>
                                                <div>09:00 - 10:30 Live sessions in CR 3</div>
                                                <div>10:30 - 10:45 Break</div>
                                                <div>10:45 - 12:00 Live sessions in CR 3</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*/row*/}
                        {/* timeline item 3 */}
                        <div className="row">
                            <div className="col-auto text-center flex-column d-none d-sm-flex">
                                <div className="row h-50">
                                    <div className="col border-end">&nbsp;</div>
                                    <div className="col">&nbsp;</div>
                                </div>
                                <h5 className="m-2">
                                    <span className="badge rounded-pill bg-light border">&nbsp;</span>
                                </h5>
                                <div className="row h-50">
                                    <div className="col border-end">&nbsp;</div>
                                    <div className="col">&nbsp;</div>
                                </div>
                            </div>
                            <div className="col py-2">
                                <div className="card radius-15">
                                    <div className="card-body">
                                        <div className="float-end text-muted">
                                            Wed, Jan 11th 2019 8:30 AM
                                        </div>
                                        <h4 className="card-title">Day 3 Sessions</h4>
                                        <p>
                                            Shoreditch vegan artisan Helvetica. Tattooed Codeply Echo Park
                                            Godard kogi, next level irony ennui twee squid fap selvage.
                                            Meggings flannel Brooklyn literally small batch, mumblecore PBR
                                            try-hard kale chips. Brooklyn vinyl lumbersexual bicycle rights,
                                            viral fap cronut leggings squid chillwave pickled gentrify
                                            mustache. 3 wolf moon hashtag church-key Odd Future. Austin
                                            messenger bag normcore, Helvetica Williamsburg sartorial tote
                                            bag distillery Portland before they sold out gastropub taxidermy
                                            Vice.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*/row*/}
                        {/* timeline item 4 */}
                        <div className="row">
                            <div className="col-auto text-center flex-column d-none d-sm-flex">
                                <div className="row h-50">
                                    <div className="col border-end">&nbsp;</div>
                                    <div className="col">&nbsp;</div>
                                </div>
                                <h5 className="m-2">
                                    <span className="badge rounded-pill bg-light border">&nbsp;</span>
                                </h5>
                                <div className="row h-50">
                                    <div className="col">&nbsp;</div>
                                    <div className="col">&nbsp;</div>
                                </div>
                            </div>
                            <div className="col py-2">
                                <div className="card radius-15">
                                    <div className="card-body">
                                        <div className="float-end text-muted">
                                            Thu, Jan 12th 2019 11:30 AM
                                        </div>
                                        <h4 className="card-title">Day 4 Wrap-up</h4>
                                        <p>
                                            Join us for lunch in Bootsy's cafe across from the Campus
                                            Center.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*/row*/}
                    </div>
            
                    
                
                </div>
            </div>
            </div>

        </>
    );
};

export default Message;
