import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCards } from '../actions/cards'
import { fetchDecks } from '../actions/decks'
import { logoutUser } from '../actions/auth'
import { MenuList, MenuItem, Select } from '@material-ui/core'

class NavBar extends Component {
  state = {
    search: '',
    dropdown: 'cards',
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
    const { currentUser, loggedIn } = this.props
    return (
      <div>
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
            <form onSubmit={this.handleSearch}>
              <input
                type="search"
                name="search"
                value={search}
                onChange={this.handleChange}
                placeholder={`Search ${dropdown}...`}
              />
            </form>
            Search
          </MenuItem>
          <Select
            position="relative"
            name="dropdown"
            onChange={this.handleChange}
            options={options}
            placeholder="Cards"
          />
          <MenuItem
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
