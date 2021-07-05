import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCards } from '../actions/cards'
import { fetchDecks } from '../actions/decks'
import { logoutUser } from '../actions/auth'
import {
  MenuList,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Typography,
} from '@material-ui/core'
import { fade, withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import { useEffect, useState } from 'react';

const useStyles = (theme) => ({
    formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    },
    selectEmpty: {
    marginTop: theme.spacing(2),
    },
    root: {
    flexGrow: 1,
    },
    menuButton: {
    marginRight: theme.spacing(2),
    },
    title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
        display: 'block',
    },
    },
    search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
    },
    searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    },
    inputRoot: {
    color: 'inherit',
    },
    inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
        width: '20ch',
        },
    },
    },
})

export default function NavBar() {
    const classes = useStyles()
    const 

  handleItemClick = (event, name) => {
    this.setState({ activeItem: name, submit: false })
  }

  handleChange = ({ value, name }) => {
    this.setState({
      [name]: value,
    })
  }

  handleLogout = () => {
    this.props.history.push('/')
    this.props.logoutUser()
  }

  handleSearch = (event, { name }) => {
    event.preventDefault()
    const searchTerm = this.state.search.length ? this.state.search : 'default'
    switch (this.state.dropdown) {
      case 'cards':
        this.props.fetchCards({ term: searchTerm }, this.props.history)
        break
      case 'decks':
        this.props.fetchDecks({ term: searchTerm }, this.props.history)
        break
      default:
        alert('Something went wrong in React Router')
    }
    this.setState({
      search: '',
    })
  }

  render() {
    const options = [
      {
        text: 'Cards',
        value: 'cards',
      },
      {
        text: 'Decks',
        value: 'decks',
      },
    ]



    const { search, dropdown } = this.state
    const { currentUser, loggedIn, classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              MageCraft
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <MenuList>
              <MenuItem
                name="home"
                component={Link}
                to="/"
                //onClick={this.handleItemClick}
              >
                Home
              </MenuItem>
              {loggedIn && (
                <MenuItem
                  name="decks"
                  component={Link}
                  //to="/decks"
                  to={`/${currentUser.name}/decks`}
                  onClick={this.handleItemClick}
                >
                  Decks
                </MenuItem>
              )}
              <MenuItem>
                <FormControl
                  classname={classes.formControl}
                  onSubmit={this.handleSearch}
                >
                  <InputLabel
                    type="search"
                    name="search"
                    value={search}
                    onChange={this.handleChange}
                    placeholder={`Search ${dropdown}...`}
                  />
                </FormControl>
                Search
              </MenuItem>
              <Select
                className={classes.selectEmpty}
                value="cards"
                position="relative"
                name="dropdown"
                onChange={this.handleChange}
                options={options}
                placeholder="Cards"
              />
              <MenuItem
                value="cards"
                component={Link}
                onChange={this.handleChange}
                options={options}
                to="/cards"
              >
                Cards
              </MenuItem>
              {!loggedIn ? (
                <MenuItem
                  component={Link}
                  to="/login"
                  //onClick={this.handleItemClick}
                >
                  Login
                </MenuItem>
              ) : (
                <MenuItem
                  component={Link}
                  to="/"
                  onClick={this.handleLogout}
                  name="logout"
                >
                  Logout
                </MenuItem>
              )}
            </MenuList>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: !!state.auth.currentUser.id,
    currentUser: state.auth.currentUser,
    request: state.cards.loading || state.decks.loading,
  }
}

export default connect(mapStateToProps, { getCards, fetchDecks, logoutUser })(
  withRouter(NavBar),
)
