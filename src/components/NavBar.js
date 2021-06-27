import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCards } from '../actions/cards'
import { fetchDecks } from '../actions/decks'
import { logoutUser } from '../actions/auth'
import { MenuList, MenuItem } from '@material-ui/core'

class NavBar extends Component {
  state = {
    activeItem: '',
    search: '',
    dropdown: 'cards',
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.history.location.pathname === '/') {
      return {
        activeItem: 'home',
      }
    } else if (
      nextProps.history.location.pathname ===
      `/${nextProps.currentUser.name}/decks`
    ) {
      return {
        activeItem: 'decks',
      }
    } else {
      return {
        activeItem: '',
      }
    }
  }

  handleItemClick = (event, name) =>
    this.setState({ activeItem: name, submit: false })

  handleChange = (event, { value, name }) => {
    this.setState({
      [name]: value,
    })
  }

  handleLogout = () => {
    this.props.history.push('/')
    this.props.logoutUser()
  }

  handleSearch = (event) => {
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
    const { activeItem, search, dropdown } = this.state
    const { currentUser, loggedIn } = this.props
    const drawer = (
      <div>
        <MenuList>
          <MenuItem
            name="home"
            active={activeItem === 'home'}
            component={Link}
            to="/"
            onClick={this.handleItemClick}
          >
            Home
          </MenuItem>
          <MenuItem
            name="decks"
            active={activeItem === 'decks'}
            component={Link}
            to={{ pathname: `/${currentUser.name}/decks` }}
            onClick={this.handleItemClick}
          >
            Decks
          </MenuItem>
          <MenuItem
            name="search"
            onSubmit={this.handleSearch}
            value={search}
            onChange={this.handleChange}
            placeholder={`Search ${dropdown}...`}
          >
            Search
          </MenuItem>
          <MenuItem
            name="cards"
            onChange={this.handleChange}
            options={options}
            to="/cards"
          >
            Cards
          </MenuItem>
          {!loggedIn ? (
            <MenuItem
              name="login"
              active={activeItem === 'decks'}
              component={Link}
              to="/login"
              onClick={this.handleItemClick}
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
      </div>
    )
    return drawer
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: !!state.auth.currentUser.id,
    currentUser: state.auth.currentUser,
    request: state.cards.loading || state.decks.loading,
  }
}

export default connect(mapStateToProps, { fetchCards, fetchDecks, logoutUser })(
  withRouter(NavBar),
)
