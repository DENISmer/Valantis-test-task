import {createAsyncThunk} from "@reduxjs/toolkit";
import {routes} from "@/scripts/api/routes";
import axios from "axios";
export const fetchUserById = createAsyncThunk(
    'users/fetchUserById',
    async () => {
        const response = await axios.post(
            routes.domain,
            {
                    action: routes.actions.get_ids,
                    params: {offset: 10, limit: 3}
                },
        {
                headers: {
                    'X-Auth': `md5("Valantis_20240227")`
                }
            });
        return response.data;
    }
);