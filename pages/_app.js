import { CssBaseline, ThemeProvider } from '@mui/material'
import { SessionProvider } from "next-auth/react"
import { CartProvider } from '../context'
import '../styles/globals.css'
import { lightTheme } from '../theme/light-theme'

function MyApp({ Component, pageProps: { session, ...pageProps }}) {
  return (
    <SessionProvider session={session}>
    <CartProvider>
        <ThemeProvider theme={ lightTheme }>
        <CssBaseline/>
        <Component {...pageProps} />
      </ThemeProvider>
    </CartProvider>
    </SessionProvider>
 )
}

export default MyApp




