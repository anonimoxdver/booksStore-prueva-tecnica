import { CardMedia, Divider, Grid, Typography } from '@mui/material'




export const CartBooks = ({ image, title,  autor,  subtitulo, isbn13, cantidad, precio }) => {
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
                        image={ image }
                        sx={{ width: 100, height: 200, alignContent: 'center', m: 'auto'}}
                        component='img'
                    />
                    
                </Grid>
              
              <Divider orientation="horizontal" />

                <Grid xs={9} sm={8} md={8} lg={8} >
                    <Typography variant='body2'><Typography variant='h6'>Titulo:</Typography>{title} </Typography>

                    {
                        autor ? 
                            <Typography variant='body2'><Typography variant='h6'>autor:</Typography>{autor} </Typography>
                        : <></>
                    } 

                    
                    {
                        subtitulo ? 
                            <Typography variant='body2'><Typography variant='h6'>Subtitulo:</Typography>{subtitulo} </Typography>
                        : <></>
                    } 

                    {
                        cantidad ? (
                                         <Grid
                    container 
                    spacing={2}   
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    sx={{ mt:2 }}
                >
                    <Typography variant='h6'>Numero de Articulos:<Typography variant='h5'>{cantidad}</Typography></Typography>
                    <Typography variant='h6'>Precio:<Typography variant='h5'>{precio}</Typography></Typography>
                </Grid>
                        ): <></>
                    }
   

                   
       
                </Grid>

           </Grid>  
        </Grid>

  )
}
