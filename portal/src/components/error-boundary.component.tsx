import React from 'react';

interface IState {
  error: any;
  hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, IState> {
  state: IState = {
    error: null,
    hasError: false,
  };

  componentDidCatch(error: any, info: any) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;