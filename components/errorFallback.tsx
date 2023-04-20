import React from "react";

type Props = {
  error: Error;
};

function ErrorFallback({ error }: Props) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
}

export default ErrorFallback;
