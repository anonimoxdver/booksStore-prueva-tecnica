import { Button, CardMedia, Divider, Grid, Typography } from '@mui/material'
import { useContext } from 'react'
import { CartContext } from '../../context'




export const CartSumary = ({ book }) => {

    const { removeBook } = useContext( CartContext)
 
  return (
    
        <Grid xs={12} sm={12} md={12} lg={12} sx={{ borderRadius: '16px', borderColor: 'grey', border: 1, m:1  }}>
            <Grid 
                container 
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <Grid xs={3} sm={4} md={3} lg={3} >
                    <CardMedia 
                        image={ book.image }
                        sx={{ width: 50, height: 100, alignContent: 'center', m: 'auto'}}
                        component='img'
                    />
                    
                </Grid>
              
              <Divider orientation="horizontal" />

                <Grid xs={9} sm={8} md={8} lg={8} >
                    <Typography variant='body2'><Typography variant='h6'>Titulo:</Typography>{book.title} </Typography>

             
                    <Grid
                    container 
                    spacing={2}   
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    sx={{ mt:2 }}
                >
                     <Typography variant='h4' ><Typography variant='h6'>Cantidad:</Typography>X{book.cantidad} </Typography>
                     <Typography variant='h4' ><Typography variant='h6'>Precio:</Typography>${book.precio} </Typography>
                     <Button
                        variant='contained' 
                        color='secondary' 
                        onClick={ () => removeBook( book ) }
                    >
                        Remover
                    </Button>
                </Grid>
       
                </Grid>



           </Grid>  

    

  
        </Grid>

  )
}
