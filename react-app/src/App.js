import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import { authenticate } from './store/session';
import './index.css'
import SplashPage from './components/SplashPage/SplashPage';
import LogoutButton from './components/auth/LogoutButton';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Switch>
        <Route exact path='/'>
          <div className='splash-page-navbar-container'>
            <NavBar />
          </div>
          <SplashPage />
        </Route>
        <Route path='/dashboard' >
          <LogoutButton />
          <h1>My Home Page</h1>
        </Route>
      </Switch>
    </>
  );
}

export default App;
