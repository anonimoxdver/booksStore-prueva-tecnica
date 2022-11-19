import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        info: {
            main: '#fff'
          },
          primary: {
            main: '#193047'
          },
    },
    

    components: {
        MuiLink: {
          defaultProps: {
            underline: 'none',
          },
        },
        MuiAppBar: {
          defaultProps: {
            elevation: 0,
            position: 'fixed',
          },
          styleOverrides: {
            root: {
              backgroundColor: '#193047',
              height: 60
            },
          }
        },


        
    },


})