import { Avatar, Button, Chip, CircularProgress, Grid, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { databaseApi } from '../../api'
import { MainLayout} from '../../Layout/MainLayout'
import { stringAvatar } from '../../utils/getFirstLetters'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CartBooks } from '../../components/books/CartBooks'

const userPage = () => {

    const router = useRouter()
    const { data, status } = useSession()
    const [orders, setOrders] = useState([])
    const [sessionData, setSessionData] = useState([])
    const [seeOrders, setSeeOrders] = useState(false)

 const getData = async() => {
      const {data} = await databaseApi.get('/orders/checkout')
      setSessionData(data)

      return data
    }


    


    const getOrders = async() => {
  
      const  {data: dataOrders} = await databaseApi.post('/orders/getOrder',  { sub: data.sub } )
      setOrders(dataOrders)
      setSeeOrders(!seeOrders)
      return dataOrders
    }


        
    useEffect(() => {
        getData()


      }, [])
    
      


    if ( status === 'loading' ) {
        return (
            <MainLayout pageDescription={'Loading'} title={'Loading'}>
                <CircularProgress size={50}/>
            </MainLayout>
          )
    }






    if ( status === 'unauthenticated' ) {
        return router.replace('/')


    }

  





  return (
    <MainLayout pageDescription={ `perfil del usuario ${data.user.name}` } title={ data.user.name}>

      <Grid container >
       
      <Grid xs={12} sm={6} md={6} lg={6}>

             

        <Typography variant='h5' sx={{ p:3}}>Nombre:<Typography variant='h3'>{data.user.name} </Typography></Typography> 
        
        <Grid
            container 
            spacing={2}   
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            sx={{ mt:2 }}
          >
           <Avatar   {...stringAvatar(data.user.name)}></Avatar>
        </Grid>
          
   
        
      </Grid >
      <Grid xs={12} sm={6} md={6} lg={6}>
          <Grid
            container 
            spacing={2}   

            alignItems="center"
            sx={{ mt:2 }}
          >
           <Button variant="outlined" startIcon={<VisibilityIcon />} onClick={getOrders}> {!seeOrders ?'ver ordenes': 'Ocultar Ordenes'}</Button> 
          <Grid 
               container 
      
               direction="row"
               justifyContent="space-evenly"
               alignItems="center"
               sx={{ mt:1 }}>
             {
            seeOrders ? (
              orders.map(( order ) => (
                <>

                    <Grid 
                    container 
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    key={order._id}
                    sx={{ mt:1 }}>
                    { order.isPaid && <Chip variant="outlined" color="success" label='Ordenes Pagadas'/>}
                      {
                        order.isPaid && order.orderItems.map(( order ) => (
                          <CartBooks {...order}  key={order.isbn13}/>
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
                          <CartBooks {...order}  key={ books.isbn13}/>
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


export default userPage