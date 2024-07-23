import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Header from "./Header.tsx";
import {useCallback, useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoadingComponent from "./LoadingComponent.tsx";
import {useAppDispatch} from "../store/configureStore.ts";
import {fetchBasketAsync} from "../../features/basket/basketSlice.ts";
import {fetchCurrentUser} from "../../features/account/accountSlice.ts";

function App() {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(true);

    const initApp = useCallback(async () => {
            try {
                await dispatch(fetchCurrentUser())
                await dispatch((fetchBasketAsync()))
            } catch (error: any) {
                console.log(error)
            }
        }, [dispatch]
    )

    useEffect(() => {
        initApp().then(() => setLoading(false));
    }, [dispatch]);

    const [darkMode, setDarkMode] = useState(false);
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
        setDarkMode(prevMode => !prevMode)
    }

    if (loading) return <LoadingComponent message={"Initializing App..."}/>

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
            <CssBaseline/>
            <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
            <Container>
                <Outlet/>
            </Container>
        </ThemeProvider>
    )
}

export default App
