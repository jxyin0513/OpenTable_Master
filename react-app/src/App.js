import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RestaurantDetail from './components/restaurants/RestaurantDetail';
import RestaurantForm from './components/restaurants/RestaurantForm';
import Restaurants from './components/restaurants/Restaurants';
import ReviewForm from './components/reviews/ReviewForm';
import UsersList from './components/UsersList';
import User from './components/User';
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
        <ProtectedRoute path='/new-form'>
          <RestaurantForm />
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/:restaurantId/review/'>
          <ReviewForm />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <Restaurants />
        </ProtectedRoute>
        <Route><h1>404 Page Not Found</h1></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
