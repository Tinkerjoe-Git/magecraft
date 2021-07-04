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
    const drawer = (
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
          <MenuItem
            name="decks"
            component={Link}
            //to="/decks"
            to={`/${currentUser.name}/decks`}
            //onClick={this.handleItemClick}
          >
            Decks
          </MenuItem>
          <MenuItem
            name="search"
            onSubmit={this.handleSearch}
            to="cards/search"
            value={search}
            onChange={this.handleChange}
            placeholder={`Search ${dropdown}...`}
          >
            Search
          </MenuItem>
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

export default connect(mapStateToProps, { getCards, fetchDecks, logoutUser })(
  withRouter(NavBar),
)
