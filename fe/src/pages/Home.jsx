// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteSelangData, getSelangById, getSelangData } from "../features/selang/asyncAction";
// import { createHistory, getHistory } from "../features/history/asyncAction";
// import { getMySelang } from "../features/user/asyncAction";
// import ModalEditData from "../component/fragments/ModalEditData";
// import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2'
// import DataTableComponent from "../component/fragments/DataTable";

// export default function HomePages() {
    // const { isLoading, selang } = useSelector((state) => state.selangStore);
    // const history = useSelector((state) => state.historyStore);
    // const dispatch = useDispatch();
    // const role = localStorage.getItem("role")
    // const { selangById } = useSelector((state) => state.selangStore);
    // const [openModalEdit, setOpenModalEdit] = useState({ show: false, id: "" });
    // const navigate = useNavigate()

//     // const onHandleCreateHistory = (formData) => {
//     //     dispatch(createHistory(formData))
//     // }

//     const onHandleDelete = async (id) => {
//         try {
//             const result = await Swal.fire({
//                 title: "Are you sure?",
//                 text: "You won't be able to revert this!",
//                 icon: "warning",
//                 showCancelButton: true,
//                 confirmButtonColor: "#3085d6",
//                 cancelButtonColor: "#d33",
//                 confirmButtonText: "Yes, delete it!"
//             });

//             if (result.isConfirmed) {
//                 await dispatch(deleteSelangData(id));
//                 await dispatch(getMySelang());

//                 Swal.fire({
//                     title: "Deleted!",
//                     text: "Your file has been deleted.",
//                     icon: "success"
//                 });
//             }

//         } catch (error) {
//             console.error("Failed to fetch selang data:", error);
//         }
//     };

//     const onHandleEdit = async (id) => {
//         try {
//             await dispatch(getSelangById(id))
//             navigate('/')
//             setOpenModalEdit({ show: true, id: id })
//         } catch (error) {
//             console.error("Failed to fetch selang data:", error);
//         }
//     };


//     useEffect(() => {
//         const fetchSelangData = async () => {
//             try {
//                 await dispatch(getSelangData())
//             } catch (error) {
//                 console.error("Failed to fetch selang data:", error);
//             }
//         };
//         fetchSelangData();
//     }, [dispatch, role]);


//     return (

//         <div>
//             <DataTableComponent
//                 selang={selang}
//                 onHandleDelete={onHandleDelete}
//                 onHandleEdit={onHandleEdit}
//                 isLoading={isLoading}
//             />
//             {openModalEdit.show && (
//                 <ModalEditData
//                     openModalEdit={openModalEdit}
//                     setOpenModalEdit={setOpenModalEdit}
//                 />
//             )}
//         </div>


//         // <div className="w-full overflow-x-auto shadow-md dark:bg-gray-800 bg-white rounded-xl">
//         //     <table className="w-full text-sm text-center border text-gray-500 dark:text-gray-400 rounded-xl">
//         //         <caption className="p-5 text-lg font-semibold text-left text-gray-900 dark:text-white dark:bg-gray-800">
//         //             <div className="">
//         //                 <p>Dashboard</p>
//         //             </div>
//         //             <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
//         //                 Monitoring HM KPP Mining
//         //             </p>
//         //         </caption>
//         //         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//         //             <tr>
//         //                 <th scope="col" className="px-6 py-3">Unit</th>
//         //                 <th scope="col" className="px-6 py-3">Component</th>
//         //                 <th scope="col" className="px-6 py-3">PN</th>
//         //                 <th scope="col" className="px-6 py-3">Tanggal Penggantian</th>
//         //                 <th scope="col" className="px-6 py-3">HM Penggantian</th>
//         //                 <th scope="col" className="px-6 py-3">Quantity</th>
//         //                 <th scope="col" className="px-6 py-3">Lifetime</th>
//         //                 <th scope="col" className="px-6 py-3">Target</th>
//         //                 <th scope="col" className="px-6 py-3">Remark</th>
//         //                 {
//         //                     role === "admin" && (
//         //                         <th scope="col" className="px-6 py-3">Action</th>
//         //                     )
//         //                 }
//         //             </tr>
//         //         </thead>
//         //         {
//         //             isLoading && (
//         //                 <tbody>
//         //                     <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//         //                         <td colSpan="9" className="px-6 py-4">Loading...</td>
//         //                     </tr>
//         //                 </tbody>
//         //             )
//         //         }
//         //         {
//         //             selang.length === 0 && (
//         //                 <tbody>
//         //                     <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//         //                         <td colSpan="9" className="px-6 py-4">No data</td>
//         //                     </tr>
//         //                 </tbody>
//         //             )
//         //         }
//         //         <tbody>
//         //             {/* Render table rows */}
//         //             {selang?.map((item) => (
//         //                 <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item.id}>
//         //                     <td className="px-6 py-4">{item.unit}</td>
//         //                     <td className="px-6 py-4">{item.component}</td>
//         //                     <td className="px-6 py-4">{item.pn}</td>
//         //                     <td className="px-6 py-4">{new Date(item.tanggalPenggantian).toLocaleDateString()}</td>
//         //                     <td className="px-6 py-4">{item.hmPenggantian}</td>
//         //                     <td className="px-6 py-4">{item.quantity}</td>
//         //                     <td className="px-6 py-4">{item.lifetime}</td>
//         //                     <td className="px-6 py-4">{item.target}</td>
//         //                     <td className="px-6 py-4">{item.remark}</td>
//         //                     {
//         //                         role === "admin" && (
//         //                             <td className="px-6 py-4 flex flex-col">
                                        // <button
                                        //     className="font-medium text-blue-600  dark:text-blue-500 hover:underline"
                                        //     onClick={() => onHandleEdit(item.id)}
                                        // >
                                        //     Edit HM
                                        // </button>
                                        // <button
                                        //     className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                        //     onClick={() => onHandleDelete(item.id)}
                                        // >
                                        //     Delete
                                        // </button>

//         //                             </td>
//         //                         )
//         //                     }

//         //                 </tr>
//         //             ))}
//         //         </tbody>
//         //     </table>
//         //     <ModalEditData openModalEdit={openModalEdit} setOpenModalEdit={setOpenModalEdit} selangById={selangById} />
//         // </div>
//     );
// }
