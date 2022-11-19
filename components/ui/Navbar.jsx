import NextLink from 'next/link'
import { useSession} from 'next-auth/react'
import { AppBar, Toolbar, Link, Typography, Box, Button, IconButton, Badge, Input, InputAdornment, Avatar, CircularProgress } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { CartContext } from '../../context';
import {  stringAvatar } from '../../utils/getFirstLetters';


export const Navbar = () => {

    const router = useRouter()
    const { data } = useSession()
    const { numberOfItems } = useContext( CartContext )
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');



    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        router.push(`/search/${ searchTerm }`);
    }

  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref>
                <Link display='flex' alignItems='center'>
                    <Typography variant='h5' sx={{color: 'white'}}>Bookstore</Typography>
                </Link>
            </NextLink>

            <Box flex={ 1 } />



            {
                    isSearchVisible 
                        ? (
                            <Input
                                sx={{ color: 'white'}}
                                className='fadeIn'
                                autoFocus
                                value={ searchTerm }
                                onChange={ (e) => setSearchTerm( e.target.value ) }
                                onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end" >
                                        <IconButton
                                            onClick={ () => setIsSearchVisible(false) }
                                        >
                                            <ClearOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        )
                    : 
                    (
                        <IconButton 
                            onClick={ () => setIsSearchVisible(true) }
                            className="fadeIn"
                            sx={{ color:' white'}}
                        >
                            <SearchOutlined />
                        </IconButton>
                    )
                }

            <NextLink href='/cart' passHref>
                <Link>
                    <IconButton color='info'>
                        <Badge badgeContent={ numberOfItems > 9 ? '+9': numberOfItems  } color='info' >
                            <ShoppingCartOutlined/>
                        </Badge>
                    </IconButton>
                </Link>
            </NextLink>


            {
                !data 
                    ?
                    <NextLink href='/api/auth/signin' passHref>
                    <Link>
                        <Button variant='outlined' color='info'>Registrarse</Button>
                    </Link>
                </NextLink> 
             
                :
                <NextLink href='/user' passHref>
                    <Link>
                        <IconButton color='info'>
                            <Avatar {...stringAvatar(data.user.name)}></Avatar>
                        </IconButton>
                    </Link>
                </NextLink>
            }


        </Toolbar>
    </AppBar>
  )
}


