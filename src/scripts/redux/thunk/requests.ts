import {createAsyncThunk} from "@reduxjs/toolkit";
import {routes} from "@/scripts/api/routes";
import axios from "axios";
import {md5} from "js-md5";
export const fetchUserById = createAsyncThunk(
    'users/fetchUserById',
    async () => {
        const response = await axios.post(
            routes.domain,
            {
                    action: routes.actions.get_ids,
                    params: {offset: 1, limit: 50}
                },
        {
                headers: {
                    "X-Auth": md5("Valantis_20240228")
                }
            });
        // console.log(response.data)
        return response.data;
    }
);
