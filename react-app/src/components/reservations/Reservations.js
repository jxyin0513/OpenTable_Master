import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetReservationThunk, DeleteReservationThunk } from '../../store/reservation';
import { useParams, NavLink, useHistory } from 'react-router-dom'


function Reservation({userId}) {
    const dispatch = useDispatch()
    const reservations = useSelector(state => Object.values(state.reservations))
    const signedInUserId = useSelector(state => state.session.user?.id)
    const session = useSelector(state => state.session)
    const {id} = useParams()

    console.log('--------------')
    console.log(reservations[0])
    useEffect(() => {
        dispatch(GetReservationThunk(userId))
    },[dispatch, userId]);

    async function deleteRes(e) {
        e.preventDefault()
        const deleteNum = e.target.className.split('_')[1]
        await dispatch(DeleteReservationThunk(deleteNum))
    }


    return (
        <>
            <p>Reservations --</p>
            {signedInUserId && reservations.map(reservation => (

                <div key={reservation.id}>
                    <div>Id: {reservation.id}</div>
                    <div>Restaurant Id: {reservation.restaurant_id}</div>
                    <div>Date: {reservation.res_date}</div>
                    <div>Time: {reservation.res_time}</div>
                    <div>Party Size: {reservation.party_size}</div>
                    <button className={`del_${reservation.id}`} onClick={deleteRes}>Delete Reservation</button>
                </div>
            ))}

        </>
    )

}

export default Reservation
