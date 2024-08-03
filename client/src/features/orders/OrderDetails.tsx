import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore.ts";
import {useEffect} from "react";
import {fetchOrdersAsync} from "./OrderSlice.tsx";
import NotFound from "../../app/errors/NotFound.tsx";
import LoadingComponent from "../../app/layout/LoadingComponent.tsx";
import {Grid, Typography} from "@mui/material";
import BasketTable from "../basket/BasketTable.tsx";
import BasketSummary from "../basket/BasketSummary.tsx";
import {BasketItem} from "../../app/models/basket.ts";

export default function OrderDetails() {
    const {id} = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const {orders, ordersLoaded} = useAppSelector(state => state.order);
    const order = orders.find(order => order.id.toString() === id)

    useEffect(() => {
        if (ordersLoaded == false)
            dispatch(fetchOrdersAsync())
    }, [orders, dispatch]);

    if (!ordersLoaded)
        return <LoadingComponent message="Loading orders..."/>

    if (!order)
        return <NotFound/>

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <BasketTable items={order.orderItems as BasketItem[]} isBasket={false}/>
            <Grid container>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                    <BasketSummary/>
                </Grid>
            </Grid>
        </>
    )
}