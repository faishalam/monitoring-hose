import { setLoading, setMySelang, setUserLogin, setUserLogout } from "./userSlice"
import { heroService } from "../../services/heroService"
import { getSelangData } from "../selang/asyncAction"


export const userLoginAction = (form) => {
    return async (dispatch) => {
        try {
            const response = await heroService.post("/login", form, {})
            localStorage.setItem("access_token", response.data.access_token)
            localStorage.setItem("role", response.data.role)

            if (response.data !== null) {
                dispatch(setUserLogin(response.data))
                dispatch(getSelangData())
            }
        } catch (error) {
            console.error(error.message);
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    }
}


export const getMySelang = (query) => {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await heroService.get('/myData' + (query ? `?${query}` : ''), {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            
            if (response.data) {
                dispatch(setMySelang(response.data))
            }

            dispatch(setLoading(false))
        } catch (error) {
            dispatch(setLoading(false))
            console.error(error.message);
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    }
}

export const userLogoutAction = () => {
    return async (dispatch) => {
        try {
            localStorage.removeItem("role")
            localStorage.removeItem("access_token")
            dispatch(setUserLogout())
        } catch (error) {
            console.error(error.message);
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    }
}

