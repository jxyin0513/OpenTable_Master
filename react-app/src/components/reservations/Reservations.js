import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetReservationThunk, DeleteReservationThunk } from '../../store/reservation';
import { useParams, NavLink, useHistory } from 'react-router-dom'


function Reservation() {
    const dispatch = useDispatch()
    const signedInUserId = useSelector(state => state.session.user?.id)
    const session = useSelector(state => state.session)
    const {userId} = useParams()
    const reservations = useSelector(state => Object.values(state.reservations).filter(reservation => reservation.user_id = userId))
    console.log(userId)
    console.log('--------------')
    // console.log(reservations[0])
    useEffect(() => {
        dispatch(GetReservationThunk(userId))
    },[dispatch, userId]);

    async function deleteRes(e) {
        e.preventDefault()
        const deleteNum = e.target.className.split('_')[1]
        await dispatch(DeleteReservationThunk(deleteNum))
    }

    // const userReservations = reservations.find(reservation => reservation.user_id == userId)
    console.log('---------------------------')
    console.log(reservations)
    return (
        <>
            <p>Reservations --</p>
            {signedInUserId && reservations && reservations.map(reservation => (
                <div key={reservation.id}>
                {/* {userId === reservation.user_id && */}
                    <div key={reservation.id}>
                        <div>Id: {reservation.id}</div>
                        <div>Restaurant Id: {reservation.restaurant_id}</div>
                        <div>Date: {reservation.res_date}</div>
                        <div>Time: {reservation.res_time}</div>
                        <div>Party Size: {reservation.party_size}</div>
                        <button className={`del_${reservation.id}`} onClick={deleteRes}>Delete Reservation</button>
                    </div>
                {/* } */}
                </div>
            ))}

        </>
    )

}

export default Reservation
