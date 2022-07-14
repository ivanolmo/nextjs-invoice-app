import React from 'react';
import { withRouter } from 'next/router';

export default withRouter(
  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);

      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      console.log({ error, errorInfo });
    }

    render() {
      if (this.state.hasError) {
        return (
          <div className='mt-40 lg:mt-80 lg:mx-auto'>
            <div className='flex flex-col items-center justify-center w-full gap-6'>
              <h2>Oops, something went wrong!</h2>
              <button
                type='button'
                onClick={() => {
                  this.setState({ hasError: false });
                  this.props.router.replace(router.asPath);
                }}
                className='px-6 py-4 text-xl text-white rounded-md bg-violet-500'
              >
                Try again?
              </button>
            </div>
          </div>
        );
      }

      return this.props.children;
    }
  }
);
