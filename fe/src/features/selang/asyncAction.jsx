import { setLoading, setSelang, setError, setSelangById } from "./selangSlice";
import { heroService } from "../../services/heroService";
import { getMySelang } from "../user/asyncAction";


// export const getSelangData = (selang) => {
//     return async (dispatch) => {
//         dispatch(setLoading(true));
//         try {
//             // const response = await heroService.get("/data", {
//             //     headers: {
//             //         Authorization: `Bearer ${localStorage.getItem("access_token")}`
//             //     },
//             //     params: selang ? selang : null
//             // });
//             const response = await heroService.get('/data', {
//                 params: {
//                     page,
//                     pageSize,
//                     search,
//                     sortField,
//                     sortOrder
//                 }
//             });

//             if (response.data) {
//                 dispatch(setSelang(response.data));
//             }

//             dispatch(setLoading(false));
//         } catch (error) {
//             dispatch(setLoading(false));
//             dispatch(setError(error.response?.data?.message || 'Failed to fetch data'));
//             throw new Error(error.response?.data?.message || 'Failed to fetch data');
//         }
//     };
// };

export const getSelangData = (query) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await heroService.get('/data' + (query ? `?${query}` : ''), {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });

            if (response.data) {
                dispatch(setSelang(response.data));
            }

            dispatch(setLoading(false));
        } catch (error) {
            console.log(error)
            dispatch(setLoading(false));
            dispatch(setError(error.response?.data?.message || 'Failed to fetch data'));
            throw new Error(error.response?.data?.message || 'Failed to fetch data');
        }
    };
};

export const postSelangData = (data) => {
    return async (dispatch) => {
        // dispatch(setLoading(true));
        try {
            const response = await heroService.post("/create", data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            if (response.data) {
                dispatch(setSelang(response.data));
                dispatch(getSelangData())
                dispatch(getMySelang())
            }
            // dispatch(setLoading(false));
        } catch (error) {
            // dispatch(setLoading(false));
            dispatch(setError(error.response?.data?.message || 'Failed to fetch data'));
            throw new Error(error.response?.data?.message || 'Failed to fetch data');
        }
    };
}

export const deleteSelangData = (id) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await heroService.delete(`/data/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });

            // if (response.status === 200) {
            dispatch(getMySelang())
            dispatch(getSelangData())
            // }

            dispatch(setLoading(false));
        } catch (error) {
            console.log(error)
            dispatch(setLoading(false));
            dispatch(setError(error.response?.data?.message || 'Failed to fetch data'));
            throw new Error(error.response?.data?.message || 'Failed to fetch data');
        }
    };
}

export const getSelangById = (id) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await heroService.get(`/data/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            if (response.data) {
                dispatch(setSelangById(response.data));
                dispatch(getMySelang())
            }
            dispatch(setLoading(false));
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(setError(error.response?.data?.message || 'Failed to fetch data'));
            throw new Error(error.response?.data?.message || 'Failed to fetch data');
        }
    };
}

export const updateSelangData = (id, data) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await heroService.put(`/data/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });

            if (response.data) {
                // dispatch(setSelangById(response.data));
                dispatch(getMySelang())
            }


            dispatch(setLoading(false));
        } catch (error) {
            console.log(error)
            dispatch(setLoading(false));
            dispatch(setError(error.response?.data?.message || 'Failed to fetch data'));
            throw new Error(error.response?.data?.message || 'Failed to fetch data');
        }
    };
}

export const updateSelangHmData = (data) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await heroService.put(`/data`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            dispatch(setLoading(false));
        } catch (error) {
            console.log(error)
            dispatch(setLoading(false));
            dispatch(setError(error.response?.data?.message || 'Failed to fetch data'));
            throw new Error(error.response?.data?.message || 'Failed to fetch data');
        }
    };
}
