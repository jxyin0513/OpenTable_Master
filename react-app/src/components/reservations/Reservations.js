import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetReservationThunk } from '../../store/reservation';
import { useParams, NavLink, useHistory } from 'react-router-dom'

function Reservation() {
    const dispatch = useDispatch()
    const reservations = useSelector(state => Object.values(state.reservations))
    const userId = useSelector(state => state.session.user?.id)
    const session = useSelector(state => state.session)
    const {id} = useParams()


    useEffect(() => {
        dispatch(GetReservationThunk(id))
    },[dispatch, id]);

    return (
        <>
            {reservations && reservations.map(reservation => {
            <div key={reservation.id}>
                <div>{reservation.id}</div>
                <div>{reservation.restaurant_id}</div>
                <div>{reservation.res_date}</div>
                <div>{reservation.res_time}</div>
                <div>{reservation.party_size}</div>
            </div>
            })}
        </>
    )

}

export default Reservation
