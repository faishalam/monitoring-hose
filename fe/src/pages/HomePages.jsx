import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { deleteSelangData, getSelangById, getSelangData } from "../features/selang/asyncAction";
import { useNavigate } from "react-router-dom";
import ModalEditData from "../component/fragments/ModalEditData";
import Swal from "sweetalert2";
import { getMySelang } from "../features/user/asyncAction";
import Search from "../component/elements/Search";

const HomePages = () => {
    const { isLoading, selang = [] } = useSelector((state) => state.selangStore) || [];
    const { selangById } = useSelector((state) => state.selangStore);
    const dispatch = useDispatch();
    const role = localStorage.getItem("role")
    const [openModalEdit, setOpenModalEdit] = useState({ show: false, id: "" });
    const navigate = useNavigate()
    const [search, setSearch] = useState("");

    const onHandleSearch = (e) => {
        e.preventDefault()
        try {
            dispatch(getSelangData(search ? `search=${search}` : ""));
        } catch (error) {

        }
    };

    const onHandleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                await dispatch(deleteSelangData(id));
                await dispatch(getMySelang());

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }

        } catch (error) {
            console.error("Failed to fetch selang data:", error);
        }
    };

    const onHandleEdit = async (id) => {
        try {
            await dispatch(getSelangById(id))
            navigate('/')
            setOpenModalEdit({ show: true, id: id })
        } catch (error) {
            console.error("Failed to fetch selang data:", error);
        }
    };

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
            name: 'Tanggal Penggantian',
            selector: row => new Date(row.tanggalPenggantian).toLocaleDateString(),
            sortable: true,
        },
        {
            name: 'HM Penggantian',
            selector: row => row.hmPenggantian,
            sortable: true,
        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
            sortable: true,
        },
        {
            name: 'Lifetime',
            selector: row => row.lifetime,
            sortable: true,
        },
        {
            name: 'Target',
            selector: row => row.target,
            sortable: true,
        },
        {
            name: 'Remark',
            selector: row => row.remark,
            sortable: true,
        },
        role === 'admin' && (
            {
                name: 'Action',
                cell: row => (
                    <div className="flex flex-col">
                        <button
                            className="font-medium text-blue-600  dark:text-blue-500 hover:underline"
                            onClick={() => onHandleEdit(row.id)}
                        >
                            Edit
                        </button>
                        <button
                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                            onClick={() => onHandleDelete(row.id)}
                        >
                            Delete
                        </button>
                    </div>
                ),
            }
        )

    ];

    useEffect(() => {
        const fetchSelangData = async () => {
            try {
                await dispatch(getSelangData())
            } catch (error) {
                console.error("Failed to fetch selang data:", error);
            }
        };
        fetchSelangData();
    }, [dispatch, role]);






    return (
        <>
            <div className="w-full rounded-xl bg-white p-2 py-2 shadow-xl mt-6">
                <div className="w-full max-w-full">
                    <div className="text-2xl font-bold p-4">Dashboard</div>
                    <Search
                        onHandleSearch={onHandleSearch}
                        setSearch={setSearch}
                        search={search}
                    />
                </div>
                <DataTable
                    columns={columns}
                    data={Array.isArray(selang) && selang || []}
                    progressPending={isLoading}
                    pagination
                    paginationPerPage={12}
                />
                <ModalEditData openModalEdit={openModalEdit} setOpenModalEdit={setOpenModalEdit} selangById={selangById} />
            </div>
        </>
    );
};

export default HomePages;
