import {Action, createAsyncThunk, Dispatch, ThunkAction} from "@reduxjs/toolkit";
import {routes} from "@/scripts/api/routes";
import axios from "axios";
import {md5} from "js-md5";
import {fillListOfId} from "@/scripts/redux/slices/productsSlice";
import {RootState} from "@/scripts/redux/slices";
import {fillListOfItems} from "@/scripts/redux/slices/productItemsSlice";
import {maxPages} from "@/scripts/redux/slices/counterSlice";


export const checkAllList = createAsyncThunk(
    'pages/checkAllList',
    async (_, { dispatch }) => {
        try {
            const response = await axios.post(
                routes.domain,
                {
                    action: routes.actions.get_ids,
                    params: { offset: 1, limit: null },
                },
                {
                    headers: {
                        "X-Auth": md5("Valantis_20240228"),
                    },
                }
            );

            console.log(response.data.result.length);
            dispatch(maxPages(Math.trunc(response.data.result.length / 50) + 1));
        } catch (error) {
            console.error("Error fetching data:", error);
            // Обработка ошибки или диспетч дополнительного action в случае неудачи
        }
    }
);
export const fetchOnePageProduct = (page: number): ThunkAction<Promise<void>, RootState, unknown, any> => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                routes.domain,
                {
                    action: routes.actions.get_ids,
                    params: { offset: page === 1 ? page : (page-1) * 50, limit: 50},
                },
                {
                    headers: {
                        "X-Auth": md5("Valantis_20240228"),
                    },
                }
            );

            console.log(response.data.result);
            dispatch(fillListOfId(response.data.result));
        } catch (error) {
            console.error("Error fetching data:", error);
            // Обработка ошибки или диспетч дополнительного action в случае неудачи
        }
    };
};

export const getItemsById = (list: []): ThunkAction<Promise<void>, RootState, unknown, any> => {
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
                        "X-Auth": md5("Valantis_20240228"),
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
