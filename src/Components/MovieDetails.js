import React from 'react'
import { Dialog, Divider, Paper } from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star'

const MovieDetails = props => {
  let { open, handleClose, movie, details } = props

  return (
    <div>
      <Dialog maxWidth='md' open={open} onClose={handleClose}>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex' }}>
            <img
              src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
              alt=''
            />
          </div>
          <div className='info' style={{ height: 100 }}>
            <div className='flex'>
              <span className='title'>
                {movie.title}({movie.release_date})
              </span>
              <div className='flex-center'>
                <span>
                  {movie.vote_average}
                </span>
                <div>
                  <StarIcon style={{ color: 'gold' }} />
                </div>
              </div>
            </div>
            <Divider />
            <div className='dialog-info'>
              <h3>Genre</h3>
              <div style={{ display: 'flex' }}>
                {details.genres &&
                  details.genres.map(genre => {
                    return (
                      <Paper
                        key={genre.id}
                        style={{ padding: 5, marginRight: 8 }}
                      >
                        {genre.name}
                      </Paper>
                    )
                  })}
              </div>
            </div>
            <div className='details-overview'>
              <h3>Overview</h3>
              <div style={{ padding: 5 }}>
                {movie.overview}
              </div>
            </div>

            <div className='dialog-info'>
              <h3>Featured Cast</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {details.credits &&
                  details.credits.cast.slice(0, 10).map(cast => {
                    return (
                      <Paper
                        key={cast.cast_id}
                        style={{
                          padding: 5,
                          marginRight: 8,
                          marginBottom: 8
                        }}
                      >
                        <b>
                          {cast.name}
                        </b>
                        <br />
                        <i>
                          {cast.character}
                        </i>
                      </Paper>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default MovieDetails
