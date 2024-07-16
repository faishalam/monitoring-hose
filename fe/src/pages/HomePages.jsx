import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { deleteSelangData, getSelangById, getSelangData } from "../features/selang/asyncAction";
import { useNavigate } from "react-router-dom";
import ModalEditData from "../component/fragments/ModalEditData";
import Swal from "sweetalert2";
import { getMySelang } from "../features/user/asyncAction";
import Search from "../component/elements/Search";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';



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

    const columnsAdmin = [
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
        {
            name: "PIC",
            selector: row => row.pic,
            sortable: true,
        },
        {
            name: "Notes",
            selector: row => row.notes,
            sortable: true,
        },
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

    ];

    const columnsGuest = [
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
        {
            name: "PIC",
            selector: row => row.pic,
            sortable: true,
        },
        {
            name: "Notes",
            selector: row => row.notes,
            sortable: true,
        }
    ];

    const dataOnExcel = Array.isArray(selang) && selang.map((item) => {
        return {
            unit: item.unit,
            component: item.component,
            pn: item.pn,
            tanggalPenggantian: item.tanggalPenggantian,
            hmPenggantian: item.hmPenggantian,
            quantity: item.quantity,
            lifetime: item.lifetime,
            target: item.target,
            remark: item.remark,
            createdAt: item.createdAt,
            updateAt: item.updateAt
        }
    })

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataOnExcel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Hose Dashboard");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "hoseDashboard.xlsx");
    };

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
                    <div className="text-2xl font-bold p-2">Dashboard</div>
                    <div className="flex justify-between px-2 py-2">
                        <button
                            className="border text-sm p-2 text-black rounded-md hover:bg-[#f5f5f5] hover:text-black"
                            onClick={() => downloadExcel()}>
                            <span>Download</span>
                        </button>
                        <Search
                            onHandleSearch={onHandleSearch}
                            setSearch={setSearch}
                            search={search}
                        />
                    </div>
                </div>
                <DataTable
                    columns={role === "admin" ? columnsAdmin : columnsGuest}
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
