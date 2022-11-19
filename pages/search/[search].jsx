import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { booksApi } from '../../api'
import { CardBook } from '../../components/books/CardBook'
import { EmptySearch } from '../../components/emptySearch'
import { MainLayout } from '../../Layout/MainLayout'

const searchPage = ({ data }) => {

    const {query}  = useRouter()


    if ( data.books.length === 0 ){
        return (
            <MainLayout pageDescription={'No hay ningun resultado'} title={'no hay libros'} >
            <EmptySearch  wrongName={query.search}/>
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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async ({ params}) => {

    const { search = '' } = params


    if ( search.length === 0 ) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    const { data } = await booksApi.get(`/search/${search}`) 

    return {
        props: {
            data
        }
    }
}

export default searchPage