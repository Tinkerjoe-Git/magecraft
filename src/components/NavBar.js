import React, { Component } from 'react'
import { Link, withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCards } from '../actions/cards'
import { fetchDecks } from '../actions/decks'
import { fetchCARDS } from '../globalVars'
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
  Button,
} from '@material-ui/core'
import { fade, makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import { checkAuth } from '../actions/auth'

class NavBar extends Component {
  state = {
    search: '',
    dropdown: 'cards',
    request: '',
  }
  componentDidMount() {
    //this.props.dispatchCheckAuth()
  }

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

  handleSearchFormInputChange = (event) => {
    this.setState({ search: event.target.value })
  }

  handleSearchFormSubmit = (event) => {
    event.preventDefault()
    const searchTerm = this.state.search.length ? this.state.search : ''

    window.location = `/cards?query=${searchTerm}`
  }

  // handleSubmit = (event) => {
  //   event.preventDefault()
  //   const { term } = this.state
  //   switch (this.state.dropdown) {
  //     case 'cards':
  //       this.props.fetchCARDS({ term }, this.props.history)
  //       break
  //     case 'decks':
  //       this.props.fetchDecks({ term }, this.props.history)
  //       break
  //     default:
  //       alert('Something went wrong in React Router')
  //   }
  //   this.setState({
  //     search: '',
  //     submit: false,
  //   })
  // }

  renderAuthLinks() {
    const { authChecked, loggedIn, currentUser } = this.props
    if (authChecked) {
      return loggedIn ? (
        <>{currentUser.email}</>
      ) : (
        <>
          <NavLink
            className="p-4 inline-block"
            activeClassName="text-blue-900"
            exact
            to="/signup"
          >
            Sign Up
          </NavLink>
          <NavLink
            className="p-4 inline-block"
            activeClassName="text-blue-900"
            exact
            to="/login"
          >
            Log In
          </NavLink>
        </>
      )
    } else {
      return null
    }
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
    const { authChecked, currentUser, loggedIn } = this.props
    return (
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton edge="start" color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            MageCraft
          </Typography>

          <form
            onSubmit={this.handleSearchFormSubmit}
            style={{ backgroundColor: 'white', padding: '4px 16px' }}
          >
            <InputBase
              type="text"
              color="secondary"
              id="search"
              name="search"
              value={search}
              onChange={this.handleSearchFormInputChange}
            />
            <button type="submit" disabled={!this.state.search}>
              Search
            </button>
          </form>

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
                to={{ pathname: `/${currentUser.name}/decks/new` }}
                onClick={this.handleItemClick}
              >
                Decks
              </MenuItem>
            )}
            <MenuItem>
              <FormControl onSubmit={this.handleClick}>
                <InputLabel
                  name="decksnew"
                  component={Link}
                  onChange={this.handleChange}
                  to={`${currentUser.name}/decks/new`}
                />
              </FormControl>
              Create
            </MenuItem>
            {/* <Select
              //TODO: need to check this name, dropdown isn't working
              name="dropdown"
              value={dropdown}
              position="relative"
              onChange={this.handleChange}
              options={options}
              placeholder="Cards"
            /> */}
            <MenuItem
              value={options}
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
            <div className="sm:text-right">{this.renderAuthLinks()}</div>
          </MenuList>
        </Toolbar>
      </AppBar>
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

// const mapStateToProps = ({ auth: { authChecked, loggedIn, currentUser } }) => {
//   return { authChecked, loggedIn, currentUser }
// }

export default connect(mapStateToProps, { getCards, fetchDecks, logoutUser })(
  withRouter(NavBar),
)
