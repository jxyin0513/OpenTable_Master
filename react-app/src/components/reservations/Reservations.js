import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetReservationThunk, DeleteReservationThunk } from '../../store/reservation';
import { useParams } from 'react-router-dom'


function Reservation() {
    const dispatch = useDispatch()
    const signedInUserId = useSelector(state => state.session.user?.id)
    // const session = useSelector(state => state.session)
    const { userId } = useParams()
    const reservations = useSelector(state => Object.values(state.reservations).filter(reservation => reservation.user_id = userId))

    // console.log(reservations[0])
    useEffect(() => {
        dispatch(GetReservationThunk(userId))
    }, [dispatch, userId]);

    async function deleteRes(e) {
        e.preventDefault()
        const deleteNum = e.target.className.split('_')[1]
        await dispatch(DeleteReservationThunk(deleteNum))
    }

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
                        <div>Time: {timeConverter(reservation.res_time)}</div>
                        <div>Party Size: {reservation.party_size}</div>
                        <button className={`del_${reservation.id}`} onClick={deleteRes}>Cancel Reservation</button>
                    </div>
                    {/* } */}
                </div>
            ))}

        </>
    )

}

export default Reservation
