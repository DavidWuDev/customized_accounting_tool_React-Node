import React from 'react';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

// import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';

import './polyfill';

import ErrorBoundary from './components/error-boundary.component';
import Notification from './components/notification';
import Root from './pages';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1a73e8',
    },
    secondary: pink,
  },
  typography: {
    fontFamily: [
      'Google Sans',
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

class App extends React.Component {
  componentDidMount() {
    document.getElementById('loading').remove();
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <Root />
          <Notification />
        </ErrorBoundary>
      </ThemeProvider>
    );
  }
}

export default App;
