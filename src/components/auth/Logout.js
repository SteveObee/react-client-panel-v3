import React, { useEffect } from 'react';
import { getAuth, signOut } from "firebase/auth";
import Spinner from '../layout/Spinner';
import { useNavigate } from 'react-router';

const Logout = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function logout() {
      await signOut(auth);

      navigate("/");

      // Workaround for longstanding reactfire issue
      // https://github.com/FirebaseExtended/reactfire/discussions/228
      window.location.reload();
    }

    logout();
  });
  
  return (
    <Spinner/>
  );
};

export default Logout;
