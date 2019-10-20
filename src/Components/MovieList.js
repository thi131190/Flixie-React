import React, { Component } from 'react'
import MovieCard from './MovieCard'
import { Grid } from '@material-ui/core'

export default class MovieList extends Component {
  render () {
    const { movies } = this.props

    return (
      <div style={{ marginBottom: 20 }}>
        <Grid container spacing={0} style={{ marginTop: 88 }}>
          {movies.map((movie, idx) => <MovieCard movie={movie} key={idx} />)}
        </Grid>
      </div>
    )
  }
}
