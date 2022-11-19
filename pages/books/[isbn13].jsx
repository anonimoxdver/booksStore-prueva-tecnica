import { Button, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { booksApi } from '../../api'
import { ItemCounter } from '../../components/ui/ItemCounter'
import { CartContext } from '../../context'
import { MainLayout } from '../../Layout/MainLayout'

const booksPage = ({data}) => {

    const router = useRouter()
    const { addProductToCart } = useContext( CartContext)

    const [bookTemp, setBookTemp] = useState({
        title: data.title,
        descripcion: data.desc,
        image: data.image,
        subtitulo: data.subtitle,
        autor: data.authors,
        isbn13: data.isbn13,
        editor: data.publisher,
        año: data.year,
        rating: data.rating,
        precio: data.price,
        cantidad: 1
    })

    
  const onUpdateQuantity = ( cantidad ) => {
    setBookTemp( currentProduct => ({
      ...currentProduct,
      cantidad
    }));
  }


    useEffect(() => {
  
        if ( typeof bookTemp.precio === 'string') {
            const { precio, cantidad } = bookTemp
          const newstr = precio.slice(1)
          const newPrice = parseInt(newstr)
              
          return setBookTemp( ItemCounter => ({
            ...ItemCounter,
            precio : newPrice * cantidad
          }))
        } 
      }, [bookTemp, setBookTemp])


      
      const onAddProduct = () => {


    
        addProductToCart(bookTemp);
        router.push('/cart');
      }

  console.log({bookTemp})

  return (
    <MainLayout title={ data.title } pageDescription={ data.desc } imageFullUrl={ data.image}> 
        <Grid container>
            <Grid xs={12} sm={6} md={6} lg={6}>
                <CardActionArea>
                    <CardMedia 
                        image={ data.image }
                        sx={{ width: 400, height: 500}}
                        component='img'
                    />
                </CardActionArea>
            </Grid>
            <Grid xs={12} sm={6} md={6} lg={6}  spacing={12}  >

                <Typography variant='h6' color='text.secondary' mt={2}>Titulo: </Typography> 
               <Typography variant='h4'  >{ data.title } </Typography> 

               {
                    data.subtitle ? 
                        <>
                            <Typography variant='h6'  color='text.secondary' mt={2}>subtiulo:</Typography>
                            <Typography> { data.subtitle } </Typography>
                        </>
                    : <></>
               }

                <Typography variant='h6'  color='text.secondary'mt={2}>Descripcion:</Typography>
                <Typography >{ data.desc } </Typography>

                <Typography variant='h6'  color='text.secondary'mt={2}>Autor:</Typography>
                <Typography >{ data.authors } </Typography>

                <Typography variant='h6'  color='text.secondary'mt={2}>Codigo ISBN:</Typography>
                <Typography >{ data.isbn13 } </Typography>



                <Grid
                    container 
                    spacing={2}   
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    sx={{ mt:2 }}
                >
                    
                    <Typography variant='h6'  color='text.secondary'>Editor:<Typography >{ data.publisher } </Typography></Typography>
                
                    <Typography variant='h6'  color='text.secondary'>Año de publicacion:<Typography >{ data.year } </Typography></Typography>
                    
                    <Typography variant='h6'  color='text.secondary'>Rating:<Typography >{ data.rating } </Typography></Typography>

                </Grid>

                    <Typography variant='h6'  color='text.secondary' mt={2}>Precio:</Typography>
                    <Typography variant='h5' color='black'>{ data.price} </Typography>

                <Grid
                    container 
                    spacing={2}   
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    sx={{ mt:2 }}
                >
                    <Typography variant='h6'>
                        Cantidad:
                         <ItemCounter 
                        currentValue={ bookTemp.cantidad }
                        updatedQuantity={ onUpdateQuantity  }
                        maxValue={ 10 }
                    />
                    </Typography>
                   
                
                    <Button onClick={ onAddProduct } variant='contained'>Agregar Al carrito</Button>

                </Grid>
     


            </Grid>       
        </Grid>    
    </MainLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async ({ params }) => {

    const { isbn13 = '' } = params

    if ( isbn13.length === 0 ) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    const { data } = await booksApi.get(`/books/${ isbn13 }`) // your fetch function here 

    return {
        props: {
            data
        }
    }
}

export default booksPage