import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RestaurantDetail from './components/restaurants/RestaurantDetail';
import RestaurantForm from './components/restaurants/RestaurantForm';
import Restaurants from './components/restaurants/Restaurants';
import EditReview from './components/reviews/ReviewEdit';
import User from './components/User';
// import CustomFooter from './components/footer';
import { authenticate } from './store/session';

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
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/restaurants/:id'>
          <RestaurantDetail />
        </Route>
        <Route path='/restaurants'>
          <Redirect to='/' />
        </Route>
        <ProtectedRoute path='/new-form'>
          <RestaurantForm />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/edit/:reviewId/'>
          <EditReview />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <Restaurants />
        </Route>
        <Route><h1>404 Page Not Found</h1></Route>
      </Switch>
      {/* <CustomFooter /> */}
    </BrowserRouter>
  );
}

export default App;
