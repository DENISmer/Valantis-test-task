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
    async (param: [] | null, { dispatch }) => {
        try {
            const response = await axios.post(
                routes.domain,
                {
                    action: routes.actions.get_ids,
                    params: {ids: param},
                },
                {
                    headers: {
                        "X-Auth": md5(password),
                    },
                }
            );

            dispatch(maxPages(Math.trunc(await response.data.result.length / 50) + 1));
        } catch (error) {
            if(error.respons.status === 401){

            }
            console.error("Error fetching data:", error);
            // Обработка ошибки или диспетч дополнительного action в случае неудачи
        }
    }
);
export const fetchOnePageProduct = (page: number, abortController: AbortController): ThunkAction<Promise<void>, RootState, unknown, any> => {
    return async (dispatch) => {

        // Создаем новый AbortController
        const newAbortController = new AbortController();

        try {
            dispatch(setLoading(true))
            const response = await axios.post(
                routes.domain,
                {
                    action: routes.actions.get_ids,
                    params: {
                        offset: page === 1 ? page : (page - 1) * 50,
                        limit: 50
                    }
                },
                {
                    signal: newAbortController.signal,
                    headers: {
                        "X-Auth": md5(password),
                    },
                }
            );

            //dispatch(maxPages(Math.trunc(await response.data.result.length / 50) + 1))
            // dispatch(fillListOfId(await response.data.result));
            // !isFilter() && console.log('ids: ',setOnePage(await response.data.result))
            // console.log(page - 1)
            // !isFilter() && dispatch(fillListOfId(setOnePage(await response.data.result)[page - 1]))
            console.log('data from fetch one page ',await response.data.result)
            await dispatch(getItemsById(await response.data.result))
            // @ts-ignore
            // !isFilter() && await dispatch(getItemsById(setOnePage(await response.data.result)[page - 1]))
        } catch (error) {
            // dispatch(setLoading(false))
            console.error("Error fetching data:", error);
            // return fetchOnePageProduct(page, filter)
            // Обработка ошибки или диспетч дополнительного action в случае неудачи
        }
    };
};

export const getIdsByFilter = (page: number, filter: Filter): ThunkAction<Promise<void>, RootState, unknown, any> => {
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
    return async (dispatch) => {
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
            await dispatch(filtered(setOnePage(await response.data.result)))
            console.log('data after ',setOnePage(await response.data.result)[page - 1])
        } catch (error){
            console.log(error)
        }


    }
}

export const getItemsById = (list: string[]): ThunkAction<Promise<void>, RootState, unknown, any> => {
    console.log('get items by id',list)
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
                    return; // Выходим из цикла, если запрос выполнен успешно
                } catch (err) {
                    if (err.response && err.response.status === 500) {
                        error = err;
                        retries++; // Увеличиваем счетчик попыток
                        await new Promise(resolve => setTimeout(resolve, 1000)); // Ждем 1 секунду перед повторной попыткой
                    } else {
                        // Если это не ошибка 500, то выбрасываем её дальше
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
