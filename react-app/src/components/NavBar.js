import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './navbar.css'
import { demoLogin } from '../store/session';
import { useDispatch, useSelector } from 'react-redux';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  function handleClick(e) {
    e.preventDefault();

    return dispatch(demoLogin())
  }


  return (
    <header className='navBar'>
      <ul className='navUl'>
        <li className='TableOpen'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img src='https://i.imgur.com/6N8qwAq.png' height='50px' width='auto' alt='Site Logo'></img>
          </NavLink>
        </li>

        {!sessionUser && (
          <div className='profile-loggedOut'>
            <li>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </li>
            <li>
              <button id={'demo-login'} onClick={handleClick}>Demo Login</button>
            </li>
          </div>
        )}
        {sessionUser && (
          <div className='profile-loggedIn'>
            <li>
              <NavLink to='/new-form' exact={true} activeClassName='active'>
                New Restaurant
              </NavLink>
            </li>
            <li>
              <NavLink to={`/users/${sessionUser.id}`} exact={true} activeClassName='active'>
                Hello {sessionUser.username} !
              </NavLink>
            </li>
            <li>
              <LogoutButton />
            </li>
          </div>
        )}

      </ul>

    </header>
  );
}

export default NavBar;
