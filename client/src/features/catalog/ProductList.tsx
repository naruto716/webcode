import {Grid} from "@mui/material";
import {Product} from "../../app/models/products.ts";
import ProductCard from "./ProductCard.tsx";
import {useAppSelector} from "../../app/store/configureStore.ts";
import ProductCardSkeleton from "./ProductCardSkeleton.tsx";

interface props {
    products: Product[]
}

export default function ProductList({products}: props) {
    const {productsLoaded} = useAppSelector(state => state.catalog);
    
    return (
        <Grid container spacing={4}>
            {products.map(item => (
                <Grid item xs={4} key={item.id}>
                    {!productsLoaded ? <ProductCardSkeleton /> : <ProductCard product={item}/>}
                </Grid>
            ))}
        </Grid>
    )
}