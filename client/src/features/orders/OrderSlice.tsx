import {Order} from "../../app/models/order.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ThunkApiConfig} from "../basket/basketSlice.ts";
import agent from "../../app/api/agent.ts";

export interface OrderState {
    ordersLoaded: boolean
    orders: Order[]
}

export const fetchOrdersAsync = createAsyncThunk<Order[], void, ThunkApiConfig> (
    '/order/fetchOrdersAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Orders.list();
        }
        catch (error: any){
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

const initialState: OrderState = {
    ordersLoaded: false,
    orders: []
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOrdersAsync.pending, (state) => {
            state.ordersLoaded = false;
        });
        builder.addCase(fetchOrdersAsync.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.ordersLoaded = true;
        });
        builder.addCase(fetchOrdersAsync.rejected, (state) => {
            state.ordersLoaded = false;
        })
    }
})

