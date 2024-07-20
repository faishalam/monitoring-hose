import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModalInputData from "./ModalInputData";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutAction } from "../../features/user/asyncAction";
import ModalInputHm from "./ModalInputHm";

export default function Sidebar(props) {
    const { openSidebar, setOpenSidebar } = props
    const [openModalInput, setOpenModalInput] = useState(false);
    const [openModalInputHm, setOpenModalInputHm] = useState(false)
    const dispatch = useDispatch();
    const role = localStorage.getItem("role")

    const handleLogout = () => {
        dispatch(userLogoutAction())
    };

    useEffect(() => {
    }, [role]);

    return (
        <>
            <div className={`min-h-screen md:flex flex-col flex-auto flex-shrink-0 antialiased text-white h-screen z-0 ${!openSidebar ? 'hidden' : ''}`}>
                <div className="relative flex flex-col top-0 left-0 w-64 bg-[#1a1a1a] h-full ">
                    <div className="flex items-center justify-center h-14 border-b">
                        <div>Sidebar Navigation By iAmine</div>
                    </div>
                    <div className="overflow-y-auto overflow-x-hidden flex-grow">
                        <ul className="flex flex-col py-4 space-y-1">
                            <li className="px-5">
                                <div className="flex flex-row items-center h-8">
                                    <div className="text-sm font-light tracking-wide text-white">
                                        Menu
                                    </div>
                                </div>
                            </li>
                            <li>
                                <Link to={'/'}
                                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                                >
                                    <span className="inline-flex justify-center items-center ml-4">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                            />
                                        </svg>
                                    </span>
                                    <span className="ml-2 text-sm tracking-wide truncate">
                                        Dashboard
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={''}
                                    onClick={() => setOpenModalInput(true)}
                                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                                >
                                    <span className="inline-flex justify-center items-center ml-4">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                            />
                                        </svg>
                                    </span>
                                    <span className="ml-2 text-sm tracking-wide truncate">Input Data</span>

                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={'/your-data'}
                                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                                >
                                    <span className="inline-flex justify-center items-center ml-4">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                            />
                                        </svg>
                                    </span>
                                    <span className="ml-2 text-sm tracking-wide truncate">
                                        Your Data
                                    </span>
                                </Link>
                            </li>
                            {role === 'admin' && (
                                <li>
                                    <Link to={''}
                                        className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                                        onClick={() => setOpenModalInputHm(true)}
                                    >
                                        <span className="inline-flex justify-center items-center ml-4">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                                />
                                            </svg>
                                        </span>
                                        <span className="ml-2 text-sm tracking-wide truncate">
                                            Input HM
                                        </span>
                                    </Link>
                                </li>
                            )}
                            <li className="px-5">
                                <div className="flex flex-row items-center h-8">
                                    <div className="text-sm font-light tracking-wide text-white">
                                        Other
                                    </div>
                                </div>
                            </li>

                            <li>
                                <Link
                                    to={'/history'}
                                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                                >
                                    <span className="inline-flex justify-center items-center ml-4">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                            />
                                        </svg>
                                    </span>
                                    <span className="ml-2 text-sm tracking-wide truncate">History</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={`${role === 'guest' ? 'https://www.canva.com/design/DAGLWfsIRKg/CFe9Qf7fIRp3FctCtDMWdQ/view?utm_content=DAGLWfsIRKg&utm_campaign=designshare&utm_medium=link&utm_source=editor' : 'https://www.canva.com/design/DAGLWM8dD84/5ZelKcLpjD-06aoTrRbBjQ/view?utm_content=DAGLWM8dD84&utm_campaign=designshare&utm_medium=link&utm_source=editor'}`}
                                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                                >
                                    <span className="inline-flex justify-center items-center ml-4">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 6H7C6.46957 6 5.96086 6.21071 5.58579 6.58579C5.21071 6.96086 5 7.46957 5 8V17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19H16C16.5304 19 17.0391 18.7893 17.4142 18.4142C17.7893 18.0391 18 17.5304 18 17V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M17 10C18.6569 10 20 8.65685 20 7C20 5.34314 18.6569 4 17 4C15.3431 4 14 5.34314 14 7C14 8.65685 15.3431 10 17 10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </span>
                                    <span className="ml-2 text-sm tracking-wide truncate">Panduan</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={'/history'}
                                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                                >
                                    <span className="inline-flex justify-center items-center ml-4">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 21H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M10 21V3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M10 4L19 8L10 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </span>
                                    <span className="ml-2 text-sm tracking-wide truncate">Spare</span>
                                </Link>
                            </li>
                            <li className="px-5">
                                <div className="flex flex-row items-center h-8">
                                    <div className="text-sm font-light tracking-wide text-white">
                                        Settings
                                    </div>
                                </div>
                            </li>

                            <li>
                                <Link
                                    to={'/'}
                                    onClick={handleLogout}
                                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                                >
                                    <span className="inline-flex justify-center items-center ml-4">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                            />
                                        </svg>
                                    </span>
                                    <span className="ml-2 text-sm tracking-wide truncate">Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div >
            <ModalInputHm openModalInputHm={openModalInputHm} setOpenModalInputHm={setOpenModalInputHm} />
            <ModalInputData openModalInput={openModalInput} setOpenModalInput={setOpenModalInput} />
        </>
    )
}