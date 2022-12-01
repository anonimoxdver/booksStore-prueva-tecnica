import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

export const CardBook = ({ image, title, subtitle, isbn13, price }) => {

    const router = useRouter()

    const onRedirectBook = () => {
        router.push(`/books/${isbn13}`)
    }

  return (

    <Card sx={{ maxWidth: 400, p: 3 }}>
    <CardMedia
      component="img"
      height="400"
      image={ image }
      alt={ title }
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        { title }
      </Typography>
      <Typography variant="body2" color="text.secondary">
        { subtitle}
      </Typography>
      <Typography variant="h6" color="dark">
        { price }
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={ onRedirectBook } >Ver mas</Button>
    </CardActions>
  </Card>
  )
}
