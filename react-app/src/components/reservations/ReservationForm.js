import React, { useState, useEffect } from 'react';
import { CreateReservationThunk } from '../../store/reservation'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

function ReservationForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    const userId = useSelector(state => state.session.user?.id);
    const { id } = useParams();
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [partySize, setPartySize] = useState(1);
    const [errors, setErrors] = useState([]);
    const restaurant = useSelector(state => state.restaurants[id])


    // Form select field contains times starting from opening to closing in half hour increments
    async function onSubmit(e) {
        e.preventDefault();
        const reservation = {
            user_id: userId,
            restaurant_id: id,
            res_date: date,
            res_time: time,
            party_size: partySize
        }

        const newRes = await dispatch(CreateReservationThunk(reservation))
        if (newRes) {
            history.push(`/users/${userId}`)
        }
    }
    useEffect(() => {
        // Prevent users from setting invalid reservation dates
        const reservedDate = new Date(`${date}T${time}:00`)
        const current = Date.now();
        const arr = []
        if (restaurant) {
            const open = restaurant.open_hours
            const close = restaurant.close_hours
            const openCheck = new Date(`${date}T${open}`)
            const closeCheck = new Date(`${date}T${close}`)
            if (reservedDate < openCheck) {
                arr.push('Please select a time after open')
            }
            if (reservedDate > closeCheck) {
                arr.push('Please select a time before close')
            }
        }
        if (current >= reservedDate) {
            arr.push('Please select appropriate time')
        }
        setErrors(arr)
    }, [date, time, id, restaurant])

    if (userId) {
        return (
            <form onSubmit={onSubmit}>
                <ul>
                    {errors.length > 0 && errors.map(error =>
                        <li key={error} className="errors">{error}</li>
                    )}
                </ul>
                <label>Date
                    <input type='date' name='date' onChange={(e) => setDate(e.target.value)}></input>
                </label>
                <label>Time
                    <input type='time' name='time' onChange={(e) => setTime(e.target.value)}></input>
                </label>
                <label>Party Size
                    <input type='number' name='partySize' onChange={(e) => setPartySize(e.target.value)} min={1} max={10}></input>
                </label>
                <button type='submit' disabled={errors.length === 0 ? false : true}>Submit</button>
            </form>

        )
    }
    else { return null }

}

export default ReservationForm
