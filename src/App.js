import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import MovieList from './Components/MovieList'
import NavBar from './Components/NavBar'
import InfiniteScroll from 'react-infinite-scroller'
import { CircularProgress } from '@material-ui/core'

function App () {
  const [apiUrl, setApiUrl] = useState(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env
      .REACT_APP_APIKEY}`
  )
  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState('now_playing')

  useEffect(() => {
    fetchMovies()
    // eslint-disable-next-line
  }, []);

  const getData = async (curUrl, curPage) => {
    // console.log(curPage)
    // console.log(`${apiUrl}&page=${curPage}`)
    await sleep(800)

    const response = await fetch(`${curUrl}&page=${curPage}`)
    const data = await response.json()
    setPage(curPage + 1)
    setApiUrl(curUrl)
    setIsLoading(false)
    return data.results
  }

  const fetchMovies = async () => {
    setIsLoading(true)
    setMovies(movies.concat(await getData(apiUrl, page)))
  }

  const handleSearch = async e => {
    e.preventDefault()
    setIsLoading(true)
    let url =
      query === ''
        ? `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env
            .REACT_APP_APIKEY}`
        : `https://api.themoviedb.org/3/search/movie?api_key=${process.env
            .REACT_APP_APIKEY}&query=${query}`
    setMovies(await getData(url, 1))
  }

  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  const toggleType = async () => {
    let curType = type !== 'now_playing' ? 'now_playing' : 'top_rated'
    let curUrl = `https://api.themoviedb.org/3/movie/${curType}?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed`
    let curPage = 1
    setType(curType)
    setPage(curPage)
    setIsLoading(true)
    setApiUrl(curUrl)
    setMovies(await getData(curUrl, curPage))
  }

  let content = (
    <MovieList
      className='my-10'
      movies={movies}
      handleLoadMoreClick={() => fetchMovies()}
      isLoading={isLoading}
    />
  )

  return (
    <div className='App'>
      <NavBar
        handleSearch={handleSearch}
        query={query}
        page={page}
        setQuery={setQuery}
        type={type}
        toggleType={toggleType}
      />
      <div style={{ paddingBottom: 20 }}>
        <InfiniteScroll
          pageStart={0}
          loadMore={() => fetchMovies()}
          hasMore
          loader={<CircularProgress />}
        >
          {content}
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default App
