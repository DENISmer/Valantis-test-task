import {createAsyncThunk, ThunkAction} from "@reduxjs/toolkit";
import {password, routes} from "@/scripts/api/routes";
import axios from "axios";
import {md5} from "js-md5";
import {RootState} from "@/scripts/redux/slices";
import {fillListOfItems} from "@/scripts/redux/slices/productItemsSlice";
import {Filter, maxPages, setLoading} from "@/scripts/redux/slices/counterSlice";
import {removeSimilarIds, setOnePage} from "@/scripts/utils/filter";
import {filtered} from "@/scripts/redux/slices/productFilteredSlice";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;


export const checkAllList = createAsyncThunk(
    'pages/checkAllList',
    async (param: [] | undefined, { dispatch }) => {
        const data = {
            action: routes.actions.get_ids,
            params: param ? {ids: param} : {ids: []}
        }

        try {
            const response = await axios.post(
                routes.domain,
                    data,
                {
                    headers: {
                        "X-Auth": md5(password),
                    },
                }
            );

            dispatch(maxPages(Math.trunc(await response.data.result.length / 50) + 1));
        } catch (error) {
            if(error.respons.status === 400){
                console.error("Error fetching data:", error);
            }
            console.error("Error fetching data:", error);
        }
    }
);
export const fetchOnePageProduct = (page: number): ThunkAction<Promise<void>, RootState, unknown, any> => {
    return async (dispatch) => {

        try {
            dispatch(setLoading(true))
            const fetchData = async () => {
                return await axios.post(
                    routes.domain,
                    {
                        action: routes.actions.get_ids,
                        params: {
                            offset: page === 1 ? page : (page - 1) * 50,
                            limit: 50
                        }
                    },
                    {
                        headers: {
                            "X-Auth": md5(password),
                        },
                    }
                );
            }

            const maxRetries = 3;
            let retries = 0;
            let error;

            while (retries < maxRetries) {
                try {
                    const response = await fetchData()
                    await dispatch(getItemsById(await response.data.result))
                    return;
                } catch (err) {
                    if (err.response && err.response.status === 500 ||  err.response.status === 400) {
                        error = err;
                        retries++;
                        console.error(err)
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    } else {
                        throw err;
                    }
                }
            }
            throw error;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
};

export const getIdsByFilter = (page: number, filter: Filter): ThunkAction<Promise<void>, RootState, unknown, any>  => {
    let filterData : Filter
    let data = null;
    const isFilter = (): boolean => {
        if(!filter){
            return false
        }
        let isFiltered = false
        if(filter.brand && filter.brand.length > 1){
            filterData = {...filterData,brand: filter.brand}
            isFiltered = true
        }
        if(filter.product && filter.product.length > 1){
            filterData = {...filterData,product: filter.product}
            isFiltered = true
        }
        if(filter.price && filter.price > 0) {
            filterData = {...filterData,price: filter.price}
            isFiltered = true
        }
        return isFiltered
    }

    if(isFilter()){
        data = {
            action: routes.actions.filter,
            params: filterData,
        }
    } else {

    }
    return async (dispatch): Promise<void> => {
        try {
            const response = await axios.post(
                routes.domain,
                {
                    ...data
                },
                {
                    headers: {
                        "X-Auth": md5(password),
                    },
                }
            );
            dispatch(maxPages(Math.trunc(await response.data.result.length / 50) + 1))
            dispatch(filtered(setOnePage(await response.data.result)))
            // console.log('data after ',setOnePage(await response.data.result)[page - 1])
        } catch (error){
            console.error("Error fetching data:", error);
        }


    }
}

export const getItemsById = (list: string[]): ThunkAction<Promise<void>, RootState, unknown, any> => {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            const fetchData = async () => {
                return await axios.post(
                    routes.domain,
                    {
                        action: routes.actions.get_items,
                        params: {ids: list},
                    },
                    {
                        headers: {
                            "X-Auth": md5(password),
                        },
                    }
                );
            };

            const maxRetries = 3;
            let retries = 0;
            let error;

            while (retries < maxRetries) {
                try {
                    const response = await fetchData();
                    dispatch(fillListOfItems(removeSimilarIds(await response.data.result)));
                    dispatch(setLoading(false));
                    return;
                } catch (err) {
                    if (err.response && err.response.status === 500 ||  err.response.status === 400) {
                        error = err;
                        retries++; // Увеличиваем счетчик попыток
                        console.error(err)
                        await new Promise(resolve => setTimeout(resolve, 1000)); // Ждем 1 секунду перед повторной попыткой
                    } else {
                        throw err;
                    }
                }
            }
            throw error;

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
};
