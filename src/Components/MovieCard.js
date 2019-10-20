import React, { useState } from 'react'
import { Button, Grid, Paper, Divider } from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star'
import DateIcon from '@material-ui/icons/DateRange'

import './MovieCard.css'
import MovieDetails from './MovieDetails'
import MovieTrailer from './MovieTrailer'
import DefaultImage from '../img/image-placeholder.jpg'

const MovieCard = props => {
  const { movie } = props
  const [details, setDetails] = useState([])
  const [trailerId, setTrailerId] = useState(null)
  const [open, setOpen] = useState(false)
  const [openVideo, setOpenVideo] = useState(false)

  const getDetails = async id => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env
      .REACT_APP_APIKEY}&append_to_response=credits`
    const results = await fetch(url)
    const data = await results.json()
    return data
  }

  const handleClickOpen = async () => {
    const results = await getDetails(movie.id)
    setDetails(results)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const getTrailer = async id => {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process
      .env.REACT_APP_APIKEY}`
    const results = await fetch(url)
    const data = await results.json()
    setOpenVideo(true)
    return data.results[0] && data.results[0].key
  }

  const handleClickOpenVideo = async () => {
    const result = await getTrailer(movie.id)
    setTrailerId(result)
    setOpenVideo(true)
  }
  const handleCloseVideo = () => {
    setOpenVideo(false)
  }

  let imgUrl =
    movie.poster_path === null
      ? DefaultImage
      : `https://image.tmdb.org/t/p/w342/${movie.poster_path}`

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={6}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <Paper className='movie-card'>
        <Paper>
          <a
            className='title'
            href={`#${movie.id}`}
            onClick={handleClickOpenVideo}
          >
            <img className='poster' src={imgUrl} alt='' />
          </a>
        </Paper>
        <div className='info'>
          <div className='flex'>
            <a href='#5' className='title' onClick={handleClickOpen}>
              {movie.title}
            </a>
            <div className='flex-center'>
              <span>
                {movie.vote_average}
              </span>
              <div>
                <StarIcon style={{ color: 'gold' }} />
              </div>
            </div>
          </div>
          <div className='release-date'>
            <DateIcon />
            <div style={{ paddingTop: 4 }}>
              {movie.release_date}
            </div>
          </div>
          <div className='overview'>
            {movie.overview}
          </div>
          <Divider style={{ marginBottom: 14 }} />
          <div className='more-info'>
            <Button
              color='primary'
              variant='contained'
              onClick={handleClickOpen}
            >
              More info
            </Button>
          </div>
        </div>
      </Paper>
      <MovieDetails
        open={open}
        handleClose={handleClose}
        movie={movie}
        details={details}
      />

      <MovieTrailer
        openVideo={openVideo}
        handleCloseVideo={handleCloseVideo}
        trailerId={trailerId}
      />
    </Grid>
  )
}

export default MovieCard
