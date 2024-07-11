import React from 'react';
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Unit',
        selector: row => row.unit,
        sortable: true,
    },
    {
        name: 'Component',
        selector: row => row.component,
        sortable: true,
    },
    {
        name: 'PN',
        selector: row => row.pn,
        sortable: true,
    },
    {
        name: 'Created At',
        selector: row => new Date(row.createdAt).toLocaleDateString(),
        sortable: true,
    },
    {
        cell: row => (
            <div>
                <button onClick={() => row.onEdit(row.id)}>Edit</button>
                <button onClick={() => row.onDelete(row.id)}>Delete</button>
            </div>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    }
];

const DataTableComponent = ({ selang, onHandleDelete, onHandleEdit, isLoading }) => {
    const data = Array.isArray(selang) ? selang.map(item => ({
        ...item,
        onDelete: onHandleDelete,
        onEdit: onHandleEdit
    })) : [];


    // console.log(data)

    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                progressPending={isLoading}
                pagination
                highlightOnHover
            />

        </>
    );
};

export default DataTableComponent;
