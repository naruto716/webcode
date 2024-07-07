import {Product} from "../../app/models/products.ts";
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useState} from "react";
import agent from "../../app/api/agent.ts";
import {LoadingButton} from "@mui/lab";
import {currencyFormat} from "../../app/util/util.ts";
import {useAppDispatch} from "../../app/store/configureStore.ts";
import {setBasket} from "../basket/basketSlice.ts";

interface props {
    product: Product;
}

export default function ProductCard({product}: props) {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    
    function handleAddItem(productId: number){
        setLoading(true);
        agent.Basket.addItem(productId)
            .then(basket => dispatch(setBasket(basket)))
            .catch(error=>console.log(error))
            .finally(() => setLoading(false));
    }
    
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
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton loading={loading} onClick={() => handleAddItem(product.id)} size="small">Add to cart</LoadingButton>
                <Button size="small" component={Link} to={`/catalog/${product.id}`}>View</Button>
            </CardActions>
        </Card>

    )
}