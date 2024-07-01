import {Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {Product} from "../../app/models/products.ts";
import {useEffect, useState} from "react";
import axios from "axios";

export default function ProductDetails() {
    const {id} = useParams<{id: string}>(); // useParams
    const [product, setProduct] = useState<Product | null>(null); // null for no products explicitly
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/Product/${id}`)
            .then(response => {setProduct(response.data)}) // response.data
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [id]); // use id for dependency, so it changes each time the id changes
    
    if (loading) return <h3>Loading...</h3>
    
    if (!product) return <h3>Not found</h3>
    
    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.imageUrl} alt={product.name} style={{width: '100%'}}/>
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
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}