import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import { authenticate } from './store/session';
import './index.css'
import SplashPage from './components/SplashPage/SplashPage';
import Footer from './components/Footer/Footer';
import DashBoard from './components/Dashboard/Dashboard';
import PageNotFound from './components/PageNotFound/PageNotFound';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false)
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
          <div className='splash-page-main-container'>
            <div className='splash-page-navbar-container'>
              <NavBar showModal1={showModal1} showModal2={showModal2} setShowModal1={setShowModal1} setShowModal2={setShowModal2} />
            </div>
            <SplashPage setShowModal1={setShowModal1} setShowModal2={setShowModal2} />
            <Footer setShowModal1={setShowModal1} setShowModal2={setShowModal2} />
          </div>
        </Route>
        <Route path='/dashboard' >
          <DashBoard />
        </Route>
        {/* <Route exact path='/404-not-found' >
          <PageNotFound />
          <Footer />
        </Route> */}
        <Route path='*'>
          <PageNotFound />
          <Footer />
        </Route>
      </Switch>
    </>
  );
}

export default App;
