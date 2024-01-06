import React from 'react';
import { useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
  const error:any = useRouteError();
  return (
    <>
      <h2>{error.data}</h2>
      <h3>
        {error.status} : {error.statusText}
      </h3>
    </>
  );
};

export default ErrorBoundary;
