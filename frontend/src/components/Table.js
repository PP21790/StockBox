import DataTable from 'react-data-table-component';
import React from 'react';

// Define columns for the DataTable


const Table = ({columns,data}) => {
    return (
        <div className="table-responsive">
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

// Optional: Custom styles for DataTable
const customStyles = {
    header: {
        style: {
            minHeight: '56px',
        },
    },
    headRow: {
        style: {
            borderBottomWidth: '1px',
            borderBottomColor: '#E0E0E0',
            borderBottomStyle: 'solid',
        },
    },
    headCells: {
        style: {
            fontWeight: 'bold',
            fontSize: '14px',
        },
    },
    cells: {
        style: {
            padding: '8px 16px',
        },
    },
};



export default Table;
