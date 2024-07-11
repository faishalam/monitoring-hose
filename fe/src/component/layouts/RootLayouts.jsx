import { Outlet } from "react-router-dom";
import Sidebar from "../fragments/Sidebar";
import { IoMenu } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useState } from "react";


export default function RootLayouts() {
    const role = localStorage.getItem("role")
    const [openSidebar, setOpenSidebar] = useState(true)

    return (
        <>
            <div className="min-h-screen flex bg-[#1a1a1a]">
                <div className="w-full max-w-full bg-black top-0 absolute inset-0 h-14 z-10 flex justify-between items-center md:px-10 px-2 shadow-2xl">
                    <div>
                    <img src="https://uccareer.id/assets/upload/company/thumbs/thumb300px-20220214-090222-0fdfc.png" className="md:max-w-sm md:max-h-sm md:h-10 md:object-cover hidden md:block" alt="" />

                        <IoMenu size={23} color="white" className="md:hidden" onClick={() => setOpenSidebar(!openSidebar)} />
                    </div>
                    <div className="flex justify-center items-center md:gap-5 gap-2">
                        <p className="text-sm text-white">Hi, {role}</p>
                        <img src="https://cdn-icons-png.flaticon.com/512/3251/3251650.png" className="md:w-10 md:h-10 w-8 h-8 rounded-full border shadow-md" alt="Rounded avatar" />

                    </div>
                </div>
                <div className="relative flex max-w-full overflow-hidden">

                    <div className={`transform ${openSidebar ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
                        <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
                    </div>

                    <div className="relative flex flex-auto">
                        <div className="relative w-full max-w-full h-screen z-0">
                            <div className="absolute inset-0 bg-black opacity-10"></div>
                            <img src="https://i.pinimg.com/564x/91/3a/35/913a3506ebb3e5f7198b7d24d06443d8.jpg" className="w-full h-full object-cover" alt="Project Image" />
                        </div>


                        <div className="max-w-full max-h-screen absolute inset-0 p-2 md:p-6 md:mt-10 mt-14 overflow-y-scroll">
                            {/* <div className="w-full bg-white mb-2 rounded-lg flex justify-between items-center px-3 md:hidden">
                                <p className="text-sm py-2">SH Monitoring</p>


                            </div> */}

                            <Outlet />
                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}