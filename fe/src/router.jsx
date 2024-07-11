import {
    createBrowserRouter,
    redirect,
} from "react-router-dom";
import RootLayouts from "./component/layouts/RootLayouts";
import HomePages from "./pages/HomePages";
import AuthLayouts from "./component/layouts/AuthLayouts";
import YourDataPages from "./pages/YourDataPages";
import LoginPages from "./pages/LoginPages";
import HistoryPage from "./pages/HistoryPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayouts />,
        children: [
            {
                path: "/",
                element: <HomePages />,
                loader: () => !localStorage.getItem('access_token') && redirect('/login')
            },
            {
                path: "/your-data",
                element: <YourDataPages />,
                loader: () => !localStorage.getItem('access_token') && redirect('/login')
            },
            {
                path: "/history",
                element: <HistoryPage />,
                loader: () => !localStorage.getItem('access_token') && redirect('/login')
            },
        ]
    },
    {
        path: "/login",
        element: <AuthLayouts />,
        children: [
            {
                path: "/login",
                element: <LoginPages />,
                loader: () => localStorage.getItem('access_token') && redirect('/')
            },
        ]
    }
]);