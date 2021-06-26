import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCards } from '../actions/cards'
import { fetchDecks } from '../actions/decks'
import { logoutUser } from '../actions/auth'
import { Menu } from '@material-ui/core'
import { Form } from 'react-final-form'

class NavBar extends Component {
  state = {
    activeItem: '',
    search: '',
    dropdown: 'cards',
  }

  static getDerivedStateFromProps(nextProps, prevState) {
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
    } else if (
      nextProps.history.location.pathname ===
      `/${nextProps.currentUser.name}/collection`
    ) {
      return {
        activeItem: 'collection',
      }
    } else {
      return {
        activeItem: '',
      }
    }
  }

  handleItemClick = (event, { name }) =>
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
    const { activeItem, search, dropdown } = this.state
    const { currentUser, loggedIn } = this.props
    const style = {
      marginBottom: this.props.history.location.pathname !== '/' ? '1rem' : '0',
    }
    return (
      <Menu inverted pointing style={style}>
        <Menu.Item
          as={Link}
          to="/"
          name="home"
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        />
        {loggedIn && (
          <Menu.Item
            as={Link}
            to={{ pathname: `/${currentUser.name}/decks` }}
            name="decks"
            active={activeItem === 'decks'}
            onClick={this.handleItemClick}
          />
        )}
        <Menu.Item position="right">
          <Form onSubmit={this.handleSearch}>
            <Form.Input
              icon="search"
              name="search"
              value={search}
              onChange={this.handleChange}
              placeholder={`Search ${dropdown}...`}
            />
          </Form>
        </Menu.Item>
        <Menu
          name="dropdown"
          item
          onChange={this.handleChange}
          options={options}
          placeholder="Cards"
        />
        {!loggedIn ? (
          <Menu.Item
            as={Link}
            to="/login"
            name="login"
            active={activeItem === 'login'}
            onClick={this.handleItemClick}
          />
        ) : (
          <Menu.Item
            as={Link}
            to="/"
            name="logout"
            onClick={this.handleLogout}
          />
        )}
      </Menu>
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

export default connect(mapStateToProps, { fetchCards, fetchDecks, logoutUser })(
  withRouter(NavBar),
)
