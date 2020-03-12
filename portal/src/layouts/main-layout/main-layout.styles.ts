import { Theme } from '@material-ui/core';

import { DRAWER_WIDTH } from './main-layout.constants';

const styles = (theme: Theme): any => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    width: '100vw',
    height: '100vh',
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'hidden',
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    position: 'relative',
    overflowX: 'hidden',
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerHeader: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingLeft: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  drawerHeaderTitle: {
    color: theme.palette.text.secondary,
    marginRight: '0.2rem',
  },
  buttonMenu: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  activeNavLink: {
    backgroundColor: theme.palette.action.selected,
  },
  drawerMini: {
    overflowX: 'hidden',
    width: theme.spacing(7),
    '&:hover $miniToggleButton': {
      opacity: 1,
    },
    '&:hover $minLogo': {
      opacity: 0,
      zIndex: -1,
    },
    '& $miniToggleButton': {
      opacity: 0,
    },
    '& $minLogo': {
      opacity: 1,
      zIndex: 1,
    },
  },
  miniToggleButton: {
    opacity: 1,
    transition: 'opacity 500ms',
  },
  minLogo: {
    opacity: 0,
    position: 'absolute',
    left: 16,
    transition: 'opacity 500ms',
    zIndex: -1,
  },
});

export default styles;
