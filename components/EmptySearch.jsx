import NextLink from 'next/link'
import BookIcon from '@mui/icons-material/Book';
import { Box } from '@mui/system';
import { Link, Typography } from '@mui/material';
import { MainLayout } from '../Layout/MainLayout';


export const EmptySearch = ({ wrongName }) => {
  return (
    
        <Box
        display='flex' 
        justifyContent='center' 
        alignItems='center' 
        height='calc(100vh - 200px)'
        sx={{ flexDirection: { xs: 'column', sm: 'row' }}}
    >
        <BookIcon sx={{ fontSize: 100 }} />
        <Box display='flex' flexDirection='column' alignItems='center'>
            <Typography>no hay ningun libro con el Nombre de { wrongName } </Typography>
            <NextLink href='/' passHref>
                <Link typography="h4" color='primary'>
                    Regresar
                </Link>
            </NextLink>
        </Box>


    </Box>

  )
}
