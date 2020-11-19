import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {
  
  

  React.useEffect(() => {
    if (!props.loggedIn && !localStorage.getItem('loggedIn')) {
      props.openLogin();
    }
  });

  return (
    <Route>
      {
        () => props.loggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    </Route>
)}

export default ProtectedRoute;