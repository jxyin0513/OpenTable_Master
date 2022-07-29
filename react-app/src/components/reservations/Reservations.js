import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetReservationThunk, DeleteReservationThunk } from '../../store/reservation';
import { useParams } from 'react-router-dom'


function Reservation() {
    const dispatch = useDispatch()
    const signedInUserId = useSelector(state => state.session.user?.id)
    const { userId } = useParams()
    const reservations = useSelector(state => Object.values(state.reservations).filter(reservation => reservation.user_id = userId))
    useEffect(() => {
        dispatch(GetReservationThunk(userId))
    }, [dispatch, userId]);

    //Delete / cancel a reservation
    async function deleteRes(e) {
        e.preventDefault()
        const deleteNum = e.target.className.split('_')[1]
        await dispatch(DeleteReservationThunk(deleteNum))
    }
    //Converts time from 24hr format to 12hr format
    const timeConverter = (time) => {
        let hours = time.split(':')[0];
        let min = time.split(':')[1];
        if (+hours > 12) {
            hours = `${((+hours + 11) % 12 + 1)}:${min}PM`;
        }
        else {
            hours = `${hours}:${min}AM`;
        }
        return hours;
    }

    return (
        <>
            <p>Reservations --</p>
            {signedInUserId && reservations && reservations.map(reservation => (
                <div key={reservation.id}>
                    <div key={reservation.id}>
                        <div>Id: {reservation.id}</div>
                        <div>Restaurant Id: {reservation.restaurant_id}</div>
                        <div>Date: {reservation.res_date}</div>
                        <div>Time: {timeConverter(reservation.res_time)}</div>
                        <div>Party Size: {reservation.party_size}</div>
                        <button className={`del_${reservation.id}`} onClick={deleteRes}>Cancel Reservation</button>
                    </div>
                </div>
            ))}

        </>
    )

}

export default Reservation
