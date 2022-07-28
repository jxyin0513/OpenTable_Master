
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
    <nav className='navBar'>
      <ul className='navUl'>
        <li className='TableOpen'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img src='/assets/images/table_open_default.jpg' height='50px' width='auto' alt='Site Logo'></img>
          </NavLink>
        </li>

        {!sessionUser && (
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
        )}
        {!sessionUser && (

          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
        )}
        {sessionUser && (
          <li>
            <NavLink to={`/users/${sessionUser.id}`} exact={true} activeClassName='active'>
              {sessionUser.username}
            </NavLink>
          </li>
        )}
        {sessionUser && (
          <li>
            <NavLink to='/new-form' exact={true} activeClassName='active'>
              New Restaurant
            </NavLink>
          </li>
        )}
        {!sessionUser && (
          <li>
            <button id={'demo-login'} onClick={handleClick}>Demo Login</button>
          </li>
        )}
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
