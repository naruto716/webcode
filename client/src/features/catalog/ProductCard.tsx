import {Product} from "../../app/models/products.ts";
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";

interface props {
    product: Product;
}

export default function ProductCard({product}: props) {
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
                image={product.imageUrl}
                sx={{backgroundSize: 'contain', bgcolor: 'primary.light'}}
            />
            <CardContent>
                <Typography gutterBottom color="secondary" variant="h5" component="div">
                    ${(product.price / 100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Add to cart</Button>
                <Button size="small">View</Button>
            </CardActions>
        </Card>

    )
}