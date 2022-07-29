import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetReservationThunk } from './../store/reservation';
import { useParams } from 'react-router-dom'
import Reservation from './reservations/Reservations';
import UserFavorites from './restaurants/UserFavorites';
import './User.css'

function User() {
  const dispatch = useDispatch()
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const sessionUserId = useSelector(state=>state.session.user.id)


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
      {+userId===sessionUserId &&(
      <>
        <div className='userDetailBanner'>
          <div className='userDetailWrapper'>
            <ul className='usersUl'>
              <li>
                <h3 className='userDetail' id='UDUsername'>Welcome back,  {user.username}</h3>
              </li>
              <li>
                <h3 className='userDetailEmail' id='UDEmail'>Email registered to this account:        {user.email}</h3>
              </li>
            </ul>
          </div>
        </div>
        <div className='UDResFavWrapper'>
          <div className='UDReservationWrapper'>
            <div className='UDReservationContainer'>
              <Reservation userId={userId} />
            </div>
          </div>
          <UserFavorites />
        </div>
      </>
      )}
      {sessionUserId!== +userId && (
        <h1>401 Unauthorized</h1>
      )}
    </>
  );
}
export default User;
