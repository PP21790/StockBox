import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Table from '../../../components/Table';
import { Signalperdetail } from '../../../Services/Admin';
import { image_baseurl } from '../../../Utils/config';
import { fDateTime, fDateTimeH } from '../../../Utils/Date_formate';
import { Tooltip } from 'antd';
import { ArrowDownToLine, } from 'lucide-react';
import {  IndianRupee } from 'lucide-react';

const Signaldetail = () => {


    const { id } = useParams();
    const token = localStorage?.getItem('token');
    const [data, setData] = useState([]);



    useEffect(() => {
        getsignaldetail();
    }, []);
   


    // const handleDownload = (item) => {
         
    //     const url = item.report;
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.download = url;

    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };

   

    const handleDownload = (item) => {
        const url = item.report;
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank'; // Opens the link in a new tab
    
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    


    const getsignaldetail = async () => {
        try {
            const response = await Signalperdetail(id, token);
            if (response.status) {
                const signalData = response.data;
                let totalGain = 0;

                if (signalData.calltype === "BUY") {
                    totalGain = signalData.closeprice - signalData.price;
                } else if (signalData.calltype === "SELL") {
                    totalGain = signalData.price - signalData.closeprice;
                }

                setData([{ ...signalData, totalGain }]);
            }
        } catch (error) {
            console.log("Error fetching signal details:", error);
        }
    };

    const calculatePercentage = (gain, entryPrice) => {
        if (!entryPrice) return 0;
        const absGain = Math.abs(gain);
        return ((absGain / entryPrice) * 100).toFixed(2);
    };

    return (
        <div>
            <div className="page-content">
                <div className="row">
                    <div className="col-md-6">
                        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                            <div className="breadcrumb-title pe-3">Signal Detail</div>
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
                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                        <Link to="/admin/signal">
                            <Tooltip title="Back">
                                <i className="lni lni-arrow-left-circle" style={{ fontSize: "2rem", color: "#000" }} />
                            </Tooltip>
                        </Link>
                    </div>
                </div>

                <hr />

                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="card radius-15">
                            <div className="card-body">
                                <div className="p-4 border radius-15">
                                    {data.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <div className="row">
                                                <h6>{item.tradesymbol}</h6>
                                                <div className="card-body col-md-6">
                                                    <ul className="list-group list-group-flush">
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Segment</h6>
                                                            <span className="text-secondary">
                                                                {item.segment === 'C' ? "Cash" : item.segment === 'O' ? "Option" : item.segment === 'F' ? "Future" : '-'}
                                                            </span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Type</h6>
                                                            <span className="text-secondary">{item.calltype || '-'}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Entry Price</h6>
                                                            <span className="text-secondary"><IndianRupee/>{ item.price || '-'}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Entry Date & Time</h6>
                                                            <span className="text-secondary">{fDateTimeH(item.created_at) || '-'}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Target-1</h6>
                                                            <span className="text-secondary">{item.targetprice1 || item.tag1 || '-'}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Target-3</h6>
                                                            <span className="text-secondary">{item.targetprice3 || item.tag3 || '-'}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Remark</h6>
                                                            <span className="text-secondary">{item.description || '-'}</span>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="card-body col-md-6">
                                                    <ul className="list-group list-group-flush">
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Stock Name</h6>
                                                            <span className="text-secondary">{item.stock || '-'}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Trade Duration</h6>
                                                            <span className="text-secondary">{item.callduration || '-'}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Exit Price</h6>
                                                            <span className="text-secondary"><IndianRupee/>{item.closeprice || '-'}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Exit Date & Time</h6>
                                                            <span className="text-secondary">
                                                                {item.closedate ? fDateTimeH(item.closedate) : '-'}
                                                            </span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Target-2</h6>
                                                            <span className="text-secondary">{item.targetprice2 || item.tag2 || '-'}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Stoploss</h6>
                                                            <span className="text-secondary">{item.stoploss || '-'}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Uploaded Document</h6>
                                                            <span>
                                                                {item.report ? (
                                                                    //   <img src={`${image_baseurl}uploads/report/${item.image}`} alt={item.report} width="50" height="50" />
                                                                    <div style={{ color: "green", cursor: "pointer" }} onClick={() => handleDownload(item)}>
                                                                    <Tooltip placement="top" overlay="Download">
                                                                         <ArrowDownToLine />
                                                                    </Tooltip>
                                                                </div>
                                                                ) : (
                                                                    "-"
                                                                )}
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <hr />

                                            {item.closeprice ? (
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="ms-3">P&L</h6>
                                                            <h6 className={`text-secondary me-2 ${item.totalGain > 0 ? 'text-success' : 'text-danger'}`}>
                                                            <IndianRupee/> {item.totalGain !== null ? `${calculatePercentage(item.totalGain, item.price)}%` : '-'}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : ""}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signaldetail;
