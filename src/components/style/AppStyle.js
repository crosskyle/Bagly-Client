const drawerWidth = 160;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100vh',
    zIndex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  appFrame: {
    position: 'relative',
    height: '100vh',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'fixed',
    backgroundColor: 'white',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'fixed',
    height: '100%',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerInner: {
    padding: '8px 8px'
  },
  content: {
    width: '100%',

    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      content: {
        marginTop: 64,
      },
    },
  },
  contentShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});

export default styles