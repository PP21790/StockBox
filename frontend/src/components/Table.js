import DataTable from 'react-data-table-component';
import React from 'react';




const Table = ({ columns, data }) => {
    return (
        <div className="table-responsive" style={tableContainerStyle}>
            <DataTable
                columns={columns}
                data={data}
                pagination    
                highlightOnHover  
                striped  
                customStyles={customStyles}
            />
        </div>
    );
};

const tableContainerStyle = {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
};

const customStyles = {
    header: {
        style: {
            minHeight: '60px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '10px 10px 0 0',
            textAlign: 'center',
        },
    },
    headRow: {
        style: {
            borderBottomWidth: '2px',
            borderBottomColor: '#ddd',
            borderBottomStyle: 'solid',
            backgroundColor: '#f1f1f1',
        },
    },
    headCells: {
        style: {
            fontWeight: 'bold',
            fontSize: '15px',
            color: '#333',
            padding: '10px 20px',
            textAlign: 'center',
        },
    },
    cells: {
        style: {
            padding: '12px 20px',
            fontSize: '14px',
            color: '#555',
            backgroundColor: '#fff',
            borderBottom: '1px solid #eee',
            textAlign: 'center',
            transition: 'background-color 0.3s',
        },
        activeStyle: {
            backgroundColor: '#e7f7e7',
        },
    },
    rows: {
        highlightOnHoverStyle: {
            backgroundColor: '#f0f8ff',
            cursor: 'pointer',
        },
        stripedStyle: {
            backgroundColor: '#f9f9f9',
        },
    },
};

export default Table;
