const ErrorFallback = ({ error }) => {
    return (
      <div role="alert">
        <p>Error detected:</p>
        <pre>{error.message}</pre>
      </div>
    );
  };
  
  export default ErrorFallback;
  