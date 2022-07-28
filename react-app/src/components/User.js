import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetReservationThunk } from './../store/reservation';
import { useParams } from 'react-router-dom'
import Reservation from './reservations/Reservations';
import UserFavorites from './restaurants/UserFavorites';

function User() {
  const dispatch = useDispatch()
  const [user, setUser] = useState({});
  const { userId } = useParams();
  // const reservations = useSelector(state => Object.values(state.reservations))

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
    dispatch(GetReservationThunk(userId))
  }, [userId, dispatch]);

  if (!user) {
    return null;
  }

  return (
    <>
      <ul>
        <li>
          <strong>User Id</strong> {userId}
        </li>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
      </ul>
      <Reservation userId={userId} />
      <UserFavorites />
    </>
  );
}
export default User;
