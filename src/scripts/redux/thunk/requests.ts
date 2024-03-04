import {createAsyncThunk, ThunkAction} from "@reduxjs/toolkit";
import {password, routes} from "@/scripts/api/routes";
import axios from "axios";
import {md5} from "js-md5";
import {fillListOfId} from "@/scripts/redux/slices/productsSlice";
import {RootState} from "@/scripts/redux/slices";
import {fillListOfItems} from "@/scripts/redux/slices/productItemsSlice";
import {Filter, maxPages} from "@/scripts/redux/slices/counterSlice";
import {setOnePage} from "@/scripts/utils/filter";


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
export const fetchOnePageProduct = (page: number, filter: Filter | undefined): ThunkAction<Promise<void>, RootState, unknown, any> => {
    let filterData : Filter
    let data = null;
    const isFilter = (): boolean => {
        if(!filter){
            return true
        }
        let emty = true
        if(filter.brand && filter.brand.length > 1){
            filterData = {...filterData,brand: filter.brand}
            emty = false
        }
        if(filter.product && filter.product.length > 1){
            filterData = {...filterData,product: filter.product}
            emty = false
        }
        if(filter.price && filter.price > 0) {
            filterData = {...filterData,price: filter.price}
            emty = false
        }
        return emty
    }
    isFilter()
    if(isFilter()){
        data = {
            action: routes.actions.get_ids,
            params: {
                offset: page === 1 ? page : (page - 1) * 50,
                limit: 50
            }
        }
    } else {
        data = {
            action: routes.actions.filter,
            params: filterData,
        }
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

            !isFilter() && dispatch(maxPages(Math.trunc(await response.data.result.length / 50) + 1))
            isFilter() && dispatch(fillListOfId(await response.data.result));
            !isFilter() && console.log('ids: ',setOnePage(await response.data.result))
            console.log(page - 1)
            !isFilter() && dispatch(fillListOfId(setOnePage(await response.data.result)[page - 1]))
            isFilter() && await dispatch(getItemsById(await response.data.result))
            // @ts-ignore
            !isFilter() && await dispatch(getItemsById(setOnePage(await response.data.result)[page - 1]))
        } catch (error) {
            console.error("Error fetching data:", error);
            // Обработка ошибки или диспетч дополнительного action в случае неудачи
        }
    };
};

export const getItemsById = (list: []): ThunkAction<Promise<void>, RootState, unknown, any> => {
    console.log('get items by id',list)
    return async (dispatch) => {
        try {
            const response = await axios.post(
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

            console.log(response.data.result);
            dispatch(fillListOfItems(response.data.result));
        } catch (error) {
            console.error("Error fetching data:", error);
            // Обработка ошибки или диспетч дополнительного action в случае неудачи
        }
    };
};
