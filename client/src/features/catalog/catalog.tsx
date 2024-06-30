import {Product} from "../../app/models/products.ts";
import ProductList from "./ProductList.tsx";
import {useEffect, useState} from "react";

export function Catalog() {
    const [products, setProducts] = useState<Product[]>(
        [
            {
                name: 'product1', price: 100.00,
                id: 0,
                description: "",
                currencyCode: "",
                imageUrl: "https://i0.wp.com/picjumbo.com/wp-content/uploads/magical-spring-forest-scenery-during-morning-breeze-free-photo.jpg",
                categoryId: 0
            },
            {
                name: 'product1', price: 200.00,
                id: 0,
                description: "",
                currencyCode: "",
                imageUrl: "https://i0.wp.com/picjumbo.com/wp-content/uploads/magical-spring-forest-scenery-during-morning-breeze-free-photo.jpg",
                categoryId: 0
            }
        ]
    )

    useEffect(
        () => {
            fetch('http://localhost:5000/api/Product')
                .then(response => response.json())
                .then(products => setProducts(products));
        }, []
    )


    return (
        <>
            <ProductList products={products}/>
        </>
    )
}