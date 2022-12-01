import { CircularProgress, Grid } from '@mui/material'
import useSWR from 'swr'

import { CardBook } from '../components/books/CardBook'


import { MainLayout } from '../Layout/MainLayout'


export default function Home() {



  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data, error } = useSWR("https://api.itbook.store/1.0/new", fetcher)



  if ( !data ) {
    return (
      <MainLayout pageDescription={'Loading'} title={'Loading'}>
        <CircularProgress size={50}/>
      </MainLayout>
    )
  }

  


  return (
    <MainLayout pageDescription={'Books Page'} title={'Books Page'} >
      <Grid 
        container 
        spacing={2}   
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        >
          {
            data.books.map(( books) => (
              <CardBook { ...books} key={ books.isbn13} />
            ))
          }
      </Grid>
    </MainLayout>
 
  )
}



