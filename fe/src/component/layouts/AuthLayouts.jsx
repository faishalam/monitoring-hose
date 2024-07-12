import { Outlet } from "react-router-dom";

export default function AuthLayouts() {
    return (
        <>
            <div className="bg-white w-full h-screen">
                <Outlet />
            </div>
        </>
    )
} 