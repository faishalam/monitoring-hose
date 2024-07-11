import { heroService } from "../../services/heroService";
import { setHistory, setLoading } from "./historySlice";

export const createHistory = (data) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await heroService.post(`/history`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });

            if (response.data) {
                dispatch(setHistory(response.data));
                dispatch(getHistory())
            }

            dispatch(setLoading(false));
        } catch (error) {
            console.log(error)
            dispatch(setLoading(false));
            throw new Error(error.response?.data?.message || 'Failed to fetch data');
        }
    };
}

export const getHistory = (query) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await heroService.get('/getHistory' + (query ? `?${query}` : ''), {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });

            if (response.data) {
                dispatch(setHistory(response.data));
            }
            dispatch(setLoading(false));
        } catch (error) {
            console.log(error)
            dispatch(setLoading(false));
            throw new Error(error.response?.data?.message || 'Failed to fetch data');
        }
    };
}

export const deleteHistory = (id) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            await heroService.delete(`/history/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });

            // if (response.status === 200) {
            await dispatch(getHistory())
            // }

            dispatch(setLoading(false));
        } catch (error) {
            throw error?.response?.data?.message
        }
    };
}