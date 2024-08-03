import {Product} from "../../app/models/products.ts";
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {LoadingButton} from "@mui/lab";
import {currencyFormat} from "../../app/util/util.ts";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore.ts";
import {addBasketItemAsync} from "../basket/basketSlice.ts";

interface props {
    product: Product;
}

export default function ProductCard({product}: props) {
    const {status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    return (
        <Card sx={{maxWidth: 345}}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: 'secondary.main'}}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx: {
                        fontWeight: 'bold',
                        color: 'primary.main'
                    }
                }}
            />
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={product.pictureUrl}
                sx={{backgroundSize: 'contain', bgcolor: 'primary.light'}}
            />
            <CardContent>
                <Typography gutterBottom color="secondary" variant="h5" component="div">
                    {currencyFormat(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton loading={status === ('pendingAddItem' + product.id)}
                               onClick={() => dispatch(addBasketItemAsync({productId: product.id}))} size="small">Add to
                    cart</LoadingButton>
                <Button size="small" component={Link} to={`/catalog/${product.id}`}>View</Button>
            </CardActions>
        </Card>

    )
}