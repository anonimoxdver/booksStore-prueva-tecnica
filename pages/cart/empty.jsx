import NextLink from 'next/link';

import { RemoveShoppingCartOutlined } from "@mui/icons-material"
import { Box, Link, Typography } from "@mui/material"
import { MainLayout } from "../../Layout/MainLayout"


const EmptyPage = () => {
  return (
    <MainLayout title="Carrito vació" pageDescription="No hay artículos en el carrito de compras">
         <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            height='calc(100vh - 200px)'
            sx={{ flexDirection: { xs: 'column', sm: 'row' }}}
        >
            <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
            <Box display='flex' flexDirection='column' alignItems='center'>
                <Typography>Su carrito está vació</Typography>
                <NextLink href='/' passHref>
                    <Link typography="h4" color='primary'>
                        Regresar
                    </Link>
                </NextLink>
            </Box>


        </Box>
    </MainLayout>
  )
}

export default EmptyPage