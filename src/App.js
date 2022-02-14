import "./App.css";
import "firebase/firestore";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router } from "react-router-dom";
import { FirestoreProvider, SuspenseWithPerf, AuthProvider, useFirebaseApp } from "reactfire";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import AppRoutes from './components/routing/AppRoutes';
import AppNavbar from "./components/layout/AppNavbar";
import Spinner from "./components/layout/Spinner";
import ErrorFallback from "./ErrorFallback";


const App = () => {
  const app = useFirebaseApp();

  const firestoreInstance = getFirestore(app);
  const auth = getAuth(app);

  return (
    <FirestoreProvider sdk={firestoreInstance} suspense>
      <AuthProvider sdk={auth}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <SuspenseWithPerf fallback={<Spinner />} traceId="load-projects-status">
            <Router>
              <div className="App">
                <AppNavbar />
                <div className="container">
                  <AppRoutes />
                </div>
              </div>
            </Router>
          </SuspenseWithPerf>
        </ErrorBoundary>
      </AuthProvider>  
    </FirestoreProvider >
  );
};

export default App;
