import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Header from "./Header.tsx";
import {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {getCookie} from "../util/util.ts";
import agent from "../api/agent.ts";
import LoadingComponent from "./LoadingComponent.tsx";
import {useAppDispatch} from "../store/configureStore.ts";
import {setBasket} from "../../features/basket/basketSlice.ts";

function App() {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const buyerId = getCookie('buyerId');
        if (buyerId) {
            agent.Basket.get()
                .then(basket => dispatch(setBasket(basket)))
                .catch(error => console.log(error))
                .finally(() => setLoading(false))
        } else {
            setLoading(false);
        }
    }, [setBasket]);
    
    const [darkMode, setDarkmode] = useState(false);
    const paletteType = darkMode ? 'dark' : 'light';
    const theme = createTheme({
        palette: {
            mode: paletteType,
            background: {
                default: paletteType === 'light' ? '#eaeaea' : '#121212'
            }
        }
    })
    
    function handleThemeChange() {
        setDarkmode(prevMode => !prevMode)
    }
    
    if (loading) return <LoadingComponent message={"Initializing App..."} />
    
    return (
        <ThemeProvider theme={theme}>
            <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
            <CssBaseline/>
            <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
            <Container>
                <Outlet />
            </Container>
        </ThemeProvider>
    )
}

export default App
