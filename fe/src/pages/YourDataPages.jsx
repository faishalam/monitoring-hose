


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMySelang } from "../features/user/asyncAction";
import { deleteSelangData, getSelangById } from "../features/selang/asyncAction";
import ModalEditData from "../component/fragments/ModalEditData";
import Swal from 'sweetalert2'
import DataTable from "react-data-table-component";
import Search from "../component/elements/Search";

export default function YourDataPages() {
    const { isLoading, mySelang } = useSelector((state) => state.userStore);
    const dispatch = useDispatch();
    const [openModalEdit, setOpenModalEdit] = useState({ show: false, id: "" });
    const { selangById } = useSelector((state) => state.selangStore);
    const [search, setSearch] = useState("");

    const onHandleSearch = (e) => {
        e.preventDefault()
        try {
            dispatch(getMySelang(search ? `search=${search}` : ""));
        } catch (error) {

        }
    };

    useEffect(() => {
        const fetchSelang = async () => {
            try {
                await dispatch(getMySelang())
            } catch (error) {
                console.error("Failed to fetch selang data:", error);
            }
        };
        fetchSelang();
    }, [dispatch]);

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

    if (mySelang === null) {
        return (
            <div className="flex justify-center items-center">
                <h1 className="text-3xl font-bold">No Data</h1>
            </div>
        )
    }

    return (
        <div className="w-full rounded-xl bg-white p-2 py-2 shadow-xl mt-6">
            {isLoading && <h1>Loading...</h1>}
            <div className="w-full max-w-full">
                <div className="text-2xl font-bold p-4">Your Data</div>
                <Search
                    onHandleSearch={onHandleSearch}
                    setSearch={setSearch}
                    search={search}
                />
            </div>
            <DataTable
                columns={columns}
                data={mySelang}
                progressPending={isLoading}
                pagination
                paginationPerPage={12}
            />
            <ModalEditData openModalEdit={openModalEdit} setOpenModalEdit={setOpenModalEdit} selangById={selangById} />
        </div>
        // <div className="w-full overflow-x-auto shadow-md dark:bg-gray-800 bg-white rounded-xl">
        //     <table className="w-full text-sm text-center border text-gray-500 dark:text-gray-400 rounded-xl">
        //         <caption className="p-5 text-lg font-semibold text-left text-gray-900 dark:text-white dark:bg-gray-800">
        //             Your Data
        //             <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
        //                 Monitoring HM KPP Mining
        //             </p>
        //         </caption>
        //         {isLoading ? (
        //             <div className="flex justify-center items-center">
        //                 <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        //             </div>
        //         ) : (
        //             <>
        //                 <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        //                     <tr>
        //                         <th scope="col" className="px-6 py-3">Unit</th>
        //                         <th scope="col" className="px-6 py-3">Component</th>
        //                         <th scope="col" className="px-6 py-3">PN</th>
        //                         <th scope="col" className="px-6 py-3">Tanggal Penggantian</th>
        //                         <th scope="col" className="px-6 py-3">HM Penggantian</th>
        //                         <th scope="col" className="px-6 py-3">Quantity</th>
        //                         <th scope="col" className="px-6 py-3">Lifetime</th>
        //                         <th scope="col" className="px-6 py-3">Target</th>
        //                         <th scope="col" className="px-6 py-3">Remark</th>
        //                         <th scope="col" className="px-6 py-3">Actions</th>
        //                     </tr>
        //                 </thead>
        //                 {
        //                     mySelang?.length === 0 && (
        //                         <tbody>
        //                             <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        //                                 <td colSpan="9" className="px-6 py-4">No data</td>
        //                             </tr>
        //                         </tbody>
        //                     )
        //                 }
        //                 <tbody>
        //                     {mySelang?.map((item) => (
        //                         <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item.id}>
        //                             <td className="px-6 py-4">{item.unit}</td>
        //                             <td className="px-6 py-4">{item.component}</td>
        //                             <td className="px-6 py-4">{item.pn}</td>
        //                             <td className="px-6 py-4">{new Date(item.tanggalPenggantian).toLocaleDateString()}</td>
        //                             <td className="px-6 py-4">{item.hmPenggantian}</td>
        //                             <td className="px-6 py-4">{item.quantity}</td>
        //                             <td className="px-6 py-4">{item.lifetime}</td>
        //                             <td className="px-6 py-4">{item.target}</td>
        //                             <td className="px-6 py-4">{item.remark}</td>
        //                             <td className="px-6 py-4 flex flex-col">
        //                                 <button
        //                                     className="font-medium text-blue-600  dark:text-blue-500 hover:underline"
        //                                     onClick={() => onHandleEdit(item.id)}
        //                                 >
        //                                     Edit HM
        //                                 </button>
        //                                 <button
        //                                     className="font-medium text-red-600 dark:text-red-500 hover:underline"
        //                                     onClick={() => onHandleDelete(item.id)}
        //                                 >
        //                                     Delete
        //                                 </button>

        //                             </td>

        //                         </tr>
        //                     ))}
        //                 </tbody>
        //             </>
        //         )}
        //     </table>
        //     <ModalEditData openModalEdit={openModalEdit} setOpenModalEdit={setOpenModalEdit} selangById={selangById} />
        // </div>
    );
}
