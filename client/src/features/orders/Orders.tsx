import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {useEffect} from "react";
import LoadingComponent from "../../app/layout/LoadingComponent.tsx";
import {currencyFormat} from "../../app/util/util.ts";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore.ts";
import {fetchOrdersAsync} from "./OrderSlice.tsx";
import {Link} from "react-router-dom";

export default function Orders() {
    const {orders, ordersLoaded} = useAppSelector(state => state.order);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (!ordersLoaded)
            dispatch(fetchOrdersAsync())
    }, [ordersLoaded, dispatch]);

    if (!ordersLoaded)
        return <LoadingComponent message='Loading Orders...'/>

    return (
        <>
            <Typography variant='h3' gutterBottom>
                My Orders
            </Typography>
            <TableContainer component={Paper} sx={{mb: 4}}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{width: '10%'}}>Order number</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="right">Order Date</TableCell>
                            <TableCell align="right">Order Status</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders?.map((order) => (
                            <TableRow
                                key={order.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {order.id}
                                </TableCell>
                                <TableCell align="right">{currencyFormat(order.total)}</TableCell>
                                <TableCell align="right">{order.orderDate.split('T')[0]}</TableCell>
                                <TableCell align="right">{order.orderStatus}</TableCell>
                                <TableCell align="right">
                                    <Button component={Link} to={`${order.id}`} >View</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );

}