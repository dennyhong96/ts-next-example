import React from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// https://github.com/bvaughn/react-error-boundary#readme
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>, // Props type
  { error: Error | null } // State type
> {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { error }; // Invoked when children's has an error, passes the error to state
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;

    if (error) {
      return fallbackRender({ error });
    }

    return children;
  }
}
