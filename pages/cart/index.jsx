import { Button, Grid, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { CartBooks } from '../../components/books/CartBooks'
import { CartSumary } from '../../components/books/CartSumary'
import { CartContext } from '../../context'
import { MainLayout } from '../../Layout/MainLayout'

const cartPage = () => {

    const router = useRouter()
    const { status } = useSession()
    const { cart, numberOfItems, subTotal, createOrder } = useContext( CartContext)


    useEffect(() => {
        if (  cart.length === 0 ){
          router.replace('/cart/empty');
        }
      }, [  cart, router ])
      
      if ( cart.length === 0 ) {
          return (<></>);
      }

      const onCreateOrder = async() => {
        if ( status === 'unauthenticated') return 
        const { message2 } = await createOrder()

        router.push(message2.url)
      }



  return (
    <MainLayout pageDescription={'Carrito de Compras de Bookstore'} title={'Carrito de compras'}>
        <Typography variant='h3'> Carrito </Typography>
        <Grid container 
              direction="row"
              justifyContent="center"
              alignItems="center"
        >
            <Grid xs={12} sm={6} md={6} lg={6}>
                {
                    cart.map(( books ) => (
                        <CartBooks {...books} key={ books.isbn13} />
                    ))
                }
            </Grid>
          
            <Grid xs={12} sm={6} md={6} lg={6}>
                <Grid sx={{ borderRadius: '16px', borderColor: 'grey', border: 0.5, m:1  }}>
                    <Typography variant='h4' sx={{ p:1}}> Resumen </Typography>
                    {
                        cart.map((books) => (
                            <CartSumary book={books} key={ books.isbn13} />
                        ))
                    }

                <Grid
                    container 
                    spacing={2}   
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ p: 4 }}
                >
                  
                    <Typography variant='h5'>Numero Total de Libros:</Typography>
                    <Typography variant='h5'>{ numberOfItems } </Typography>

                </Grid> 
                <Grid
                    container 
                    spacing={2}   
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ p: 4 }}
                >
                  
                    <Typography variant='h5'>Total:</Typography>
                    <Typography variant='h5'>${ subTotal } </Typography>

                </Grid>


                <Grid
                    container 
                    spacing={2}   
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    sx={{ p: 1 }}
                >
                <Button variant='contained' sx={{ m:1 }} onClick={ onCreateOrder }>Proceder al pago</Button>

                </Grid>
                    
                </Grid>
            </Grid>
        </Grid>
    </MainLayout>
  )
}

export default cartPage