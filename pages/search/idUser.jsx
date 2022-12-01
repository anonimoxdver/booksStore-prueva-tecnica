import {  Chip, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { databaseApi } from '../../api'
import { MainLayout } from '../../Layout/MainLayout'

import { CartBooks } from '../../components/books/CartBooks';



const idUserPage = () => {

    const [search, setSearch] = useState('')
    const [dataOrder, setDataOrder] = useState([])
    const [seeOrders, setSeeOrders] = useState(false)

    const onSearch = async() => {

        const {data} = await databaseApi.post('/orders/getOrder',  { sub: search } )
        setDataOrder(data)
        setSeeOrders(!seeOrders)
    }


  return (
    <MainLayout title={'busqueda de Productos'} pageDescription={'busqueda de Productos'}>
        <Typography variant='h3'>Buscar Por Id</Typography>

        <TextField
            type={ search}
            value={search}
            name="search"
            onChange={(e) => setSearch(e.target.value)}

            placeholder="Buscar" 
            required      
            onKeyPress={ (e) => e.key === 'Enter' ? onSearch() : null }
        />

        
      <Grid container >

       <Grid xs={12} sm={6} md={6} lg={6}>
           <Grid
             container 
             spacing={2}   
 
             alignItems="center"
             sx={{ mt:2 }}
           >
            
           <Grid 
                container 
       
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                sx={{ mt:1 }}>
              {
             seeOrders ? (
                dataOrder.map(( order ) => (
                 <>
 
                     <Grid 
                     container 
                     direction="row"
                     justifyContent="space-evenly"
                     alignItems="center"
                     key={ order._id}
                     sx={{ mt:1 }}>
                     { order.isPaid && <Chip variant="outlined" color="success" label='Ordenes Pagadas'/>}
                       {
                         order.isPaid && order.orderItems.map(( order ) => (
                           <CartBooks {...order} />
                         ))
                       }
                     </Grid>
 
                     <Grid    container 
       
                     direction="row"
                     justifyContent="space-evenly"
                     alignItems="center"
                     sx={{ mt:1 }}>
                     {!order.isPaid && <Chip variant="outlined" color="error" label='Ordenes no Pagadas'/>}
                       {
                        !order.isPaid && order.orderItems.map(( order ) => (
                           <CartBooks {...order} key={order.isbn13} />
                         ))
                       }
                          <Grid
                     container 
                     spacing={2}   
                     direction="row"
                     justifyContent="space-evenly"
                     alignItems="center"
                     sx={{ mt:2 }}
                 >
                  <Typography variant='h6'>Numero de Articulos:<Typography variant='h5'>{order.numberOfItems}</Typography></Typography>
                  <Typography variant='h6'>Total:<Typography variant='h5'>{order.subTotal}</Typography></Typography>
                 </Grid>
                     </Grid>
                 </>
                  
           
         
               ))
             )
             : <></>
           }
           </Grid>
          
 
 
         </Grid>
       </Grid>
       </Grid>

    </MainLayout>
  )
}

export default idUserPage