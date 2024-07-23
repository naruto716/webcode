import {configureStore} from "@reduxjs/toolkit";
import {counterSlice} from "../../features/contact/counterSlice.ts";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {basketSlice} from "../../features/basket/basketSlice.ts";
import {catalogSlice} from "../../features/catalog/catalogSlice.ts";
import {accountSlice} from "../../features/account/accountSlice.ts";

/*
export function configureStore() {
    return createStore(counterReducer);
}
*/

export const store = configureStore(
    {
        reducer: {
            counter: counterSlice.reducer,
            basket: basketSlice.reducer,
            catalog: catalogSlice.reducer,
            account: accountSlice.reducer
        }
    }
)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;