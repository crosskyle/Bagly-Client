
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import NavMenu from 'material-ui/svg-icons/navigation/menu'

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import classNames from 'classnames';
import Drawer from 'material-ui-next/Drawer';
import AppBar from 'material-ui-next/AppBar';
import Toolbar from 'material-ui-next/Toolbar';
import Tabs, { Tab } from 'material-ui-next/Tabs';
import SwipeableViews from 'react-swipeable-views';
import PollIcon from 'material-ui/svg-icons/social/poll'
import LibraryIcon from 'material-ui/svg-icons/av/library-books'

import Typography from 'material-ui-next/Typography';
import Divider from 'material-ui-next/Divider';
import IconButton from 'material-ui-next/IconButton';

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import PacksIndex from './PacksIndex'
import ItemsIndex from './ItemsIndex'
import PacksShow from './PacksShow'
import PackVis from './PackVis'



import styles from './style/AppStyle'

class App extends React.Component {
  state = {
    open: false,
    slideIndex: 0,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event, value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider>
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
            <Toolbar disableGutters={!this.state.open} >
              <IconButton

                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, this.state.open && classes.hide)}
              >
                <NavMenu style={{width: 28,
                  height: 28,
                  padding: 12}}/>
              </IconButton>
              <div >
                <div>
                  <Tabs
                    value={this.state.slideIndex}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                  >
                    <Tab icon={<LibraryIcon/>} />
                    <Tab icon={<PollIcon/>} />
                  </Tabs>
                </div>
              </div>
              <Typography type="title" noWrap>

              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            type="persistent"
            classes={{
              paper: classes.drawerPaper,
            }}
            open={this.state.open}
          >
            <div className={classes.drawerInner}>
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                  <ExpandMore/>
                </IconButton>
              </div>
              <PacksIndex onPackSelect={this.handleDrawerClose}/>
              <Divider/>
              <ItemsIndex/>
            </div>
          </Drawer>
          <main className={classNames(classes.content, this.state.open && classes.contentShift)}>
            <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange}>
              <div>
                <PacksShow />
              </div>
              <div>
                <PackVis/>
              </div>
            </SwipeableViews>
          </main>
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

App = DragDropContext(HTML5Backend)(App)
App = withStyles(styles)(App)

export default App;
