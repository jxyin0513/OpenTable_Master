import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };
  const loggedIn = useSelector(state => state.session.user)


  return (
      <>
        {loggedIn && (<button className='logout' onClick={onLogout}>Logout</button>)}
      </>
    )

};

export default LogoutButton;
