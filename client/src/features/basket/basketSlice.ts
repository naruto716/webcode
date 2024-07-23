import {Basket} from "../../app/models/basket.ts";
import {createAsyncThunk, createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";
import agent from "../../app/api/agent.ts";
import {getCookie} from "../../app/util/util.ts";

export interface BasketState {
    basket: Basket | null;
    status: string;
}

const initialState: BasketState = {
    basket: null,
    status: 'idle',
};

// Define types for the arguments and return value of the thunk
interface BasketItemArgs {
    productId: number;
    quantity?: number;
}

export interface ThunkApiConfig {
    rejectValue: any;
}

export const fetchBasketAsync = createAsyncThunk<Basket, void, ThunkApiConfig>(
    'basket/fetchBasketAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Basket.get();
        }
        catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    },
    {
        condition: () => {
            if (!getCookie('buyerId'))
                return false;
        }
    }
)

export const addBasketItemAsync = createAsyncThunk<Basket, BasketItemArgs, ThunkApiConfig>(
    'basket/addBasketItemAsync',
    async ({productId, quantity = 1}, thunkAPI) => {
        try {
            return await agent.Basket.addItem(productId, quantity);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
);

export const removeBasketItemAsync = createAsyncThunk<void, {
    productId: number;
    quantity?: number;
    name?: string;
}, ThunkApiConfig>(
    'basket/removeBasketItemAsync',
    async ({productId, quantity = 1}, thunkAPI) => {
        try {
            await agent.Basket.removeItem(productId, quantity);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
);

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action: PayloadAction<Basket>) => {
            state.basket = action.payload;
        },
        clearBasket: (state) => {
            state.basket = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            console.log(action);
            state.status = 'pendingAddItem' + action.meta.arg.productId;
        });
        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.productId + action.meta.arg.name;
        });
        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            const {productId, quantity = 1} = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex((i) => i.productId === productId);
            if (itemIndex === -1 || itemIndex === undefined) return;
            state.basket!.items[itemIndex].quantity -= quantity!; // Quantity can't be undefined here as we defined the default value 1
            if (state.basket?.items[itemIndex].quantity === 0) state.basket.items.splice(itemIndex, 1);
            state.status = 'idle';
        });
        builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });
        builder.addMatcher(isAnyOf(addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled), (state, action: PayloadAction<Basket>) => {
            state.basket = action.payload;
            state.status = 'idle';
        });
        builder.addMatcher(isAnyOf(addBasketItemAsync.rejected, fetchBasketAsync.rejected), (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
    },
});

export const {setBasket, clearBasket} = basketSlice.actions;