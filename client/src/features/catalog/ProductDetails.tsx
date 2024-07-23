import {
    Divider,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import {useParams} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import NotFound from "../../app/errors/NotFound.tsx";
import LoadingComponent from "../../app/layout/LoadingComponent.tsx";
import {LoadingButton} from "@mui/lab";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore.ts";
import {addBasketItemAsync, removeBasketItemAsync} from "../basket/basketSlice.ts";
import {fetchProductAsync, productSelectors} from "./catalogSlice.ts";

export default function ProductDetails() {
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const {id} = useParams<{id: string}>(); // useParams
    const product = useAppSelector(state => productSelectors.selectById(state, +id!))
    const {status: productStatus} = useAppSelector(state => state.catalog)
    const [quantity, setQuantity] = useState(0);
    const item = basket?.items.find(item => product?.id == item.productId);

    useEffect(() => {
        if (item) 
            setQuantity(item.quantity);
        if (!product && id)
            dispatch(fetchProductAsync(+id))
    }, [id, item, dispatch, product]); // use id for dependency, so it changes each time the id changes
    
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.currentTarget.value);
        if (value >= 0) {
            setQuantity(value);
        }
    }
    
    function handleUpdateCart() {
        if (!product) return;
        if (!item || quantity > item.quantity) { // Add items
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({productId: product.id, quantity: updatedQuantity}));
        }
        else { // Remove items
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({productId: product.id, quantity: updatedQuantity}));
        }
    }
    
    if (productStatus.includes("pending")) return <LoadingComponent message="Loading product..." />
    
    if (!product) return <NotFound />
    
    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}}/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>
                    {product.name}
                </Typography>
                <Divider sx={{mb: 2}} />
                <Typography variant="h4" color="secondary">
                    ${(product.price / 100).toFixed(2)}
                </Typography>
                <TableContainer>
                    <Table>
                        <TableBody sx={{ fontSize: '1.1em' }}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField 
                            onChange={handleInputChange}
                            variant='outlined'
                            type='number'
                            label='Quantity in Cart'
                            fullWidth
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton 
                            disabled={item?.quantity === quantity || !item && quantity === 0}
                            loading={status.includes('pending')}
                            onClick={handleUpdateCart}
                            sx={{height: '55px'}}
                            color='primary'
                            size='large'
                            variant='contained'
                            fullWidth
                        >
                            {item ? 'Update Quantity' : 'Add to Cart'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}