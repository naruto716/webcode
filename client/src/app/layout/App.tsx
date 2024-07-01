import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Header from "./Header.tsx";
import {useState} from "react";
import {Outlet} from "react-router-dom";

function App() {
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
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
            <Container>
                <Outlet />
            </Container>
        </ThemeProvider>
    )
}

export default App
