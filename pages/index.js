import { Grid } from '@mui/material'
import { getSession, useSession} from 'next-auth/react'
import { useContext } from 'react'
import { booksApi, databaseApi } from '../api'
import { CardBook } from '../components/books/CardBook'
import { CartContext } from '../context'

import { MainLayout } from '../Layout/MainLayout'


export default function Home({ data}) {

  const { data: dataSession, status } = useSession()

  console.log({dataSession})

  


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



// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async (ctx) => {
  const { data } = await booksApi.get('/new') // your fetch function here 


  return {
    props: {
      data
    }
  }
}