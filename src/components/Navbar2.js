import React from 'react'
// import clsx from "clsx";
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Menu from '@material-ui/core/Menu'
import Toolbar from '@material-ui/core/Toolbar'
// @material-ui/icons components
import Clear from '@material-ui/icons/Clear'
import Favorite from '@material-ui/icons/Favorite'
import MenuIcon from '@material-ui/icons/Menu'
import Settings from '@material-ui/icons/Settings'
import VolumeUp from '@material-ui/icons/VolumeUp'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

// core components
import componentStyles from 'assets/theme/components/navbar.js'

const useStyles = makeStyles(componentStyles)

export default function AuthNavbar() {
  const classes = useStyles()
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const menuId = 'responsive-menu-id'

  const listObject = (
    <List className={classes.appBarList}>
      <ListItem className={classes.appBarListItem}>
        <Box
          component={Link}
          to="/"
          width="1.25rem!important"
          height="1.25rem!important"
          className={classes.appBarListItemIcon}
        />
        <Hidden lgUp>Home</Hidden>
      </ListItem>
      <ListItem className={classes.appBarListItem}>
        <Box
          component={VolumeUp}
          width="1.25rem!important"
          height="1.25rem!important"
          className={classes.appBarListItemIcon}
        />
        <Hidden lgUp>Profile</Hidden>
      </ListItem>
      <ListItem className={classes.appBarListItem}>
        <Box
          component={Link}
          to={`/${currentUser.name}/decks`}
          width="1.25rem!important"
          height="1.25rem!important"
          className={classes.appBarListItemIcon}
        />
        <Hidden lgUp>Settings</Hidden>
      </ListItem>
    </List>
  )

  const appBarRootClasses = {
    root: classes.appBarRootDefault,
  }
  const menuClasses = { paper: classes.appBarMenuPaper }
  const menuPozitions = { vertical: 'top', horizontal: 'right' }
  return (
    <>
      <AppBar
        position="relative"
        color="inherit"
        elevation={0}
        classes={appBarRootClasses}
      >
        <Toolbar>
          <Container
            display="flex!important"
            justifyContent="space-between"
            alignItems="center"
            component={Box}
            maxWidth="xl"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Box component="a" className={classes.appBarBrand}>
                Default Color
              </Box>
              <Hidden mdDown implementation="js">
                {listObject}
              </Hidden>
              <Hidden lgUp implementation="js">
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleMenuOpen}
                  aria-controls={menuId}
                  aria-haspopup="true"
                >
                  <Box
                    component={MenuIcon}
                    color={theme.palette.white.main}
                    width="2rem!important"
                    height="2rem!important"
                  />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={menuPozitions}
                  id={menuId}
                  keepMounted
                  transformOrigin={menuPozitions}
                  open={isMenuOpen}
                  onClose={handleMenuClose}
                  classes={menuClasses}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    paddingLeft="1.25rem"
                    paddingRight="1.25rem"
                    paddingBottom="1rem"
                    className={classes.appBarOutlineNone}
                  >
                    <Box
                      alt="..."
                      height="36px"
                      component="img"
                      className={classes.appBarHeaderImg}
                      src={'assets/img/brand/argon-react.png'.default}
                    />
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={handleMenuClose}
                      aria-controls={menuId}
                      aria-haspopup="true"
                    >
                      <Box
                        component={Clear}
                        width="2rem!important"
                        height="2rem!important"
                      />
                    </IconButton>
                  </Box>
                  <Box
                    component={Divider}
                    marginBottom="1rem!important"
                    marginLeft="1.25rem!important"
                    marginRight="1.25rem!important"
                  />
                  {listObject}
                </Menu>
              </Hidden>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  )
}
connect(mapStateToProps, { fetchCards, fetchDecks, logoutUser })(
  withRouter(NavBar2),
)
