import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className='mt-40 lg:mt-80 lg:mx-auto'>
          <div className='flex flex-col justify-center items-center gap-6 w-full'>
            <h2>Oops, something went wrong!</h2>
            <button
              type='button'
              onClick={() => this.setState({ hasError: false })}
              className='bg-violet-500 text-white text-xl px-6 py-4 rounded-md'
            >
              Try again?
            </button>
          </div>
        </div>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}
