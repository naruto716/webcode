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
import {Product} from "../../app/models/products.ts";
import {ChangeEvent, useEffect, useState} from "react";
import agent from "../../app/api/agent.ts";
import NotFound from "../../app/errors/NotFound.tsx";
import LoadingComponent from "../../app/layout/LoadingComponent.tsx";
import {LoadingButton} from "@mui/lab";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore.ts";
import {removeItem, setBasket} from "../basket/basketSlice.ts";

export default function ProductDetails() {
    const {basket} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const {id} = useParams<{id: string}>(); // useParams
    const [product, setProduct] = useState<Product | null>(null); // null for no products explicitly
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const item = basket?.items.find(item => product?.id == item.productId);

    useEffect(() => {
        if (item) 
            setQuantity(item.quantity);
        id && agent.Catalog.details(parseInt(id))
            .then(product => {setProduct(product)})
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [id, item]); // use id for dependency, so it changes each time the id changes
    
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.currentTarget.value);
        if (value >= 0) {
            setQuantity(value);
        }
    }
    
    function handleUpdateCart() {
        if (!product) return;
        setSubmitting(true);
        if (!item || quantity > item.quantity) { // Add items
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            agent.Basket.addItem(product.id!, updatedQuantity)
                .then(basket => dispatch(setBasket(basket)))
                .catch(error => console.log(error))
                .finally(() => setSubmitting(false));
        }
        else { // Remove items
            const updatedQuantity = item.quantity - quantity;
            agent.Basket.removeItem(product.id!, updatedQuantity)
                .then(() => dispatch(removeItem({productId: product?.id!, quantity: updatedQuantity})))
                .catch(error => console.log(error))
                .finally(() => setSubmitting(false));
        }
    }
    
    if (loading) return <LoadingComponent message="Loading product..." />
    
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
                            loading={submitting}
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