import { useSigninCheck, useUser } from 'reactfire';
import React from 'react';
import Login from '../auth/Login';
import Spinner from "../layout/Spinner";

const RequireAuth = ({ component: Component }) => {
  const { status: signInStatus, data: signInCheckResult } = useSigninCheck();

  if (signInStatus === 'loading') {
    return <Spinner />;
  }

  if ( signInCheckResult.signedIn === true ) {
    return (
      <Component />
    );
  } else {
    return <Login />;
  }
};

export default RequireAuth;
