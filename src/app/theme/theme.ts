import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: {
                    margin: 0,
                    padding: 0,
                    height: '100%',  // Para garantir que o html ocupe toda a altura
                },
                body: {
                    margin: 0,
                    padding: 0,
                    height: '100%',  
                    overflowX: 'hidden',
                },
            },
        },
    },
    breakpoints: {
        values: {
            xs: 300,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
});

export default theme;
