import { Component } from "react";
import "./ErrorBoundary.css";

/**
 * Catches render errors in any page/component beneath it (e.g. a bad API
 * response shape crashing a component) and shows a Netflix-style fallback
 * instead of a blank white screen. Must be a class component — React only
 * supports error boundaries via componentDidCatch/getDerivedStateFromError,
 * there's no hook equivalent.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Unhandled UI error:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong</h1>
          <p>
            We hit an unexpected error loading this page. Please try again.
          </p>
          <button onClick={this.handleReload}>Back to Home</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
