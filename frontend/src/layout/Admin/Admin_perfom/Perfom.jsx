import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { Link } from 'react-router-dom';
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement } from 'chart.js';

// Register necessary components for Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, ArcElement);

const Perform = () => {
    const [filter, setFilter] = useState('Cash');

    // Data for charts based on filter
    const performanceData = {
        Cash: [12, 19, 3, 5, 2, 3],
        Future: [15, 9, 8, 12, 5, 7],
        Option: [5, 3, 10, 2, 20, 4],
    };
    const topCategoriesData = {
        Cash: [300, 500, 100, 200],
        Future: [400, 300, 500, 150],
        Option: [200, 400, 300, 250],
    };
    const colors = {
        Cash: 'rgba(75, 192, 192, 0.6)',
        Future: 'rgba(255, 159, 64, 0.6)',
        Option: 'rgba(153, 102, 255, 0.6)',
    };

    const barData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: filter,
                data: performanceData[filter],
                backgroundColor: colors[filter],
            },
        ],
    };

    const pieData = {
        labels: ['Hits', 'Miss'],
        datasets: [
            {
                label: filter,
                data: topCategoriesData[filter],
                backgroundColor: ['#0DBE34', '#FF6384'],
            },
        ],
    };

    return (
        <div className="page-content">
            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div className="breadcrumb-title pe-3">Performance</div>
                <div className="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 p-0">
                            <li className="breadcrumb-item">
                                <a href="javascript:;">
                                    <i className="bx bx-home-alt" />
                                </a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Past Perfomance
                            </li>
                        </ol>
                    </nav>
                </div>
               
            </div>

            <div className="pricing-table">



                <div className="row">
                    <div className="col-lg-8">
                        <div className="card radius-10 w-100">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-3">
                                    <h5>Performance</h5>
                                    <div className="dropdown ms-auto">
                                        <div className="dropdown-toggle" data-bs-toggle="dropdown">
                                            <i className="bx bx-dots-horizontal-rounded" />
                                        </div>
                                        <ul className="dropdown-menu">
                                            {['Cash', 'Future', 'Option'].map((type) => (
                                                <li key={type}>
                                                    <button
                                                        className={`dropdown-item ${filter === type ? 'active-filter' : ''}`}
                                                        onClick={() => setFilter(type)}
                                                        style={{
                                                            cursor: 'pointer',
                                                            background: filter === type ? '#e0e0e0' : 'none',
                                                        }}
                                                    >
                                                        {type}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <Bar data={barData} height={300} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card radius-10 w-100">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-3">
                                    <h5>Ideal Hit Accuracy</h5>
                                    <div className="dropdown ms-auto">
                                        <div className="dropdown-toggle" data-bs-toggle="dropdown">
                                            <i className="bx bx-dots-horizontal-rounded" />
                                        </div>
                                        <ul className="dropdown-menu">
                                            {['Cash', 'Future', 'Option'].map((type) => (
                                                <li key={type}>
                                                    <button
                                                        className={`dropdown-item ${filter === type ? 'active-filter' : ''}`}
                                                        onClick={() => setFilter(type)}
                                                        style={{
                                                            cursor: 'pointer',
                                                            background: filter === type ? '#e0e0e0' : 'none',
                                                        }}
                                                    >
                                                        {type}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <Pie data={pieData} height={250} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Perform;
