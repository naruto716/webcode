import {createBrowserRouter, Navigate} from "react-router-dom";
import App from "../layout/App.tsx";
import HomePage from "../../features/home/HomePage.tsx";
import {Catalog} from "../../features/catalog/catalog.tsx";
import ProductDetails from "../../features/catalog/ProductDetails.tsx";
import AboutPage from "../../features/about/AboutPage.tsx";
import ContactPage from "../../features/contact/ContactPage.tsx";
import ServerError from "../errors/ServerError.tsx";
import NotFound from "../errors/NotFound.tsx";
import BasketPage from "../../features/basket/BasketPage.tsx";
import CheckoutPage from "../../features/checkout/CheckoutPage.tsx";
import Register from "../../features/account/Register.tsx";
import Login from "../../features/account/Login.tsx";
import RequireAuth from "./RequireAuth.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                element: <RequireAuth/>, children: [
                    {path: 'checkout', element: <CheckoutPage/>},
                ]
            },
            {path: '', element: <HomePage/>},
            {path: 'catalog', element: <Catalog/>},
            {path: 'catalog/:id', element: <ProductDetails/>},
            {path: 'about', element: <AboutPage/>},
            {path: 'contact', element: <ContactPage/>},
            {path: 'server-error', element: <ServerError/>},
            {path: 'not-found', element: <NotFound/>},
            {path: 'basket', element: <BasketPage/>},
            {path: 'login', element: <Login/>},
            {path: 'register', element: <Register/>},
            {path: '*', element: <Navigate replace to='not-found'/>}
        ]
    }
])