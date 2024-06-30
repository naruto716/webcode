import {Grid} from "@mui/material";
import {Product} from "../../app/models/products.ts";
import ProductCard from "./ProductCard.tsx";

interface props {
    products: Product[]
}

export default function ProductList({products}: props) {
    return (
        <Grid container spacing={4}>
            {products.map(item => (
                <Grid item xs={3} key={item.id}>
                    <ProductCard product={item}/>
                </Grid>
            ))}
        </Grid>
    )
}