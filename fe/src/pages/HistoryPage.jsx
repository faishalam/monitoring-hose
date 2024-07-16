import { useDispatch, useSelector } from "react-redux";
import { deleteHistory, getHistory } from "../features/history/asyncAction";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Search from "../component/elements/Search";
import Swal from 'sweetalert2'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function HistoryPage() {
    const role = localStorage.getItem("role")
    const dispatch = useDispatch()
    const { history, selang, isLoading } = useSelector((state) => state.historyStore);
    const [search, setSearch] = useState("");
    const [error, setError] = useState('')

    const onHandleSearch = (e) => {
        e.preventDefault()
        try {
            dispatch(getHistory(search ? `search=${search}` : ""));
        } catch (error) {

        }
    };

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                await dispatch(getHistory(search))
            } catch (error) {
                console.error("Failed to fetch history data:", error);
            }
        };
        fetchHistory();
    }, [dispatch, role]);

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
                await dispatch(deleteHistory(id));
                dispatch(getHistory());

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }

            setError('')

        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error,
                icon: "error"
            });
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
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={() => onHandleDelete(row.id)}
                    >
                        Delete
                    </button>
                </div>
            ),
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
        XLSX.utils.book_append_sheet(workbook, worksheet, "Hose Histories");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "hoseHistories.xlsx");
    };



    if (selang === null) {
        return (
            <div className="flex justify-center items-center">
                <h1 className="text-3xl font-bold">No Data</h1>
            </div>
        )
    }


    return (
        <div className="w-full rounded-xl bg-white p-2 py-2 shadow-xl mt-6">
            <div className="w-full max-w-full">
                <div className="text-2xl font-bold p-2">Histories</div>
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
                columns={columns}
                data={selang ?? []}
                progressPending={history.isLoading}
                pagination
                paginationPerPage={12}
            />
        </div>
        // <div className="w-full overflow-x-auto shadow-md dark:bg-gray-800 bg-white rounded-xl">
        //     <table className="w-full text-sm text-center border text-gray-500 dark:text-gray-400 rounded-xl">
        //         <caption className="p-5 text-lg font-semibold text-left text-gray-900 dark:text-white dark:bg-gray-800">
        //             <div className="">
        //                 <p>History</p>
        //             </div>
        //             <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
        //                 Monitoring HM KPP Mining
        //             </p>
        //         </caption>
        //         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        //             <tr>
        //                 <th scope="col" className="px-6 py-3">Unit</th>
        //                 <th scope="col" className="px-6 py-3">Component</th>
        //                 <th scope="col" className="px-6 py-3">PN</th>
        //                 <th scope="col" className="px-6 py-3">Tanggal Penggantian</th>
        //                 <th scope="col" className="px-6 py-3">HM Penggantian</th>
        //                 <th scope="col" className="px-6 py-3">Quantity</th>
        //                 <th scope="col" className="px-6 py-3">Lifetime</th>
        //                 <th scope="col" className="px-6 py-3">Target</th>
        //                 <th scope="col" className="px-6 py-3">Remark</th>
        //             </tr>
        //         </thead>
        //         {
        //             history.isLoading && (
        //                 <tbody>
        //                     <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        //                         <td colSpan="9" className="px-6 py-4">Loading...</td>
        //                     </tr>
        //                 </tbody>
        //             )
        //         }
        //         {
        //             history.selang?.length === 0 && (
        //                 <tbody>
        //                     <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        //                         <td colSpan="9" className="px-6 py-4">No data</td>
        //                     </tr>
        //                 </tbody>
        //             )
        //         }
        //         <tbody>
        //             {/* Render table rows */}
        //             {history.selang?.map((item) => (
        //                 <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item.id}>
        //                     <td className="px-6 py-4">{item.unit}</td>
        //                     <td className="px-6 py-4">{item.component}</td>
        //                     <td className="px-6 py-4">{item.pn}</td>
        //                     <td className="px-6 py-4">{new Date(item.tanggalPenggantian).toLocaleDateString()}</td>
        //                     <td className="px-6 py-4">{item.hmPenggantian}</td>
        //                     <td className="px-6 py-4">{item.quantity}</td>
        //                     <td className="px-6 py-4">{item.lifetime}</td>
        //                     <td className="px-6 py-4">{item.target}</td>
        //                     <td className="px-6 py-4">{item.remark}</td>

        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>
        // </div>
    )
}