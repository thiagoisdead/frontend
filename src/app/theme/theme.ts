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
                    height: '100%',  // Para garantir que o body ocupe toda a altura
                    overflowX: 'hidden', // Isso pode ajudar a evitar barras de rolagem horizontais indesejadas
                },
            },
        },
    },
});

export default theme;
