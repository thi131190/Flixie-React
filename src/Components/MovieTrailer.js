import React from 'react'
import { Dialog } from '@material-ui/core'

const MovieDetails = props => {
  let { openVideo, handleCloseVideo } = props
  return (
    <Dialog maxWidth='md' open={openVideo} onClose={handleCloseVideo}>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex' }}>
          <iframe
            src={`https://www.youtube.com/embed/${props.trailerId}`}
            title={props.trailerId}
            width='720'
            height='480'
          />
        </div>
      </div>
    </Dialog>
  )
}

export default MovieDetails
