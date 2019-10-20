import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { Button, ButtonGroup, Menu, MenuItem } from '@material-ui/core'
import { fade, makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import MovieIcon from '@material-ui/icons/Movie'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
}))

const NavBar = props => {
  let { page, query, handleSearch, setQuery, type, toggleType } = props
  const [anchorEl, setAnchorEl] = React.useState(null)
  const classes = useStyles()
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <h3 className='mt-2'>
            <MovieIcon style={{ fontSize: 60 }} />FLIXIE REACT
          </h3>

          <Typography className={classes.title} variant='h6' noWrap />

          <div>
            <ButtonGroup
              color='primary'
              variant='contained'
              aria-label='small contained button group'
            >
              <Button disabled={type === 'now_playing'} onClick={toggleType}>
                Now Playing
              </Button>
              <Button disabled={type !== 'now_playing'} onClick={toggleType}>
                Top Rated
              </Button>
            </ButtonGroup>
          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={query}
              onChange={e => {
                setQuery(e.target.value)
                handleSearch(e, page)
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
