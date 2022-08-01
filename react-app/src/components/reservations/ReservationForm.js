import React, { useState, useEffect } from 'react';
import { CreateReservationThunk } from '../../store/reservation'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import './reservation-form.css'

function ReservationForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    const userId = useSelector(state => state.session.user?.id);
    const { id } = useParams();
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [partySize, setPartySize] = useState(0);
    const [errors, setErrors] = useState([]);
    const [errorsB, setErrorsB] = useState([]);
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
        if (!newRes) {
            history.push(`/users/${userId}`)
        }else{
            setErrorsB(newRes)
        }
    }

    function onClick() {
        history.push('/login')
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
        if(partySize<1 || partySize>10){
            arr.push('Please select your group party size 1-10.')
        }
        setErrors(arr)
    }, [date, time, id, restaurant, partySize])

    if (userId) {
        return (
            <div>
                <h3>Save a table!</h3>
                <div className='reservation-form-container'>
                    <form onSubmit={onSubmit}>
                        {errors.length > 0 && errors.map(error =>
                            <div key={error} className="reservation-error">{error}</div>
                        )}
                        {errorsB.length > 0 && errorsB.map(error =>
                            <div key={error} className="reservation-error">{error}</div>
                        )}
                        <div className='reservation-date-field'>
                            <p>Date: </p><input type='date' name='date' onChange={(e) => setDate(e.target.value)}></input>
                        </div>
                        <div className='reservation-time-field'>
                            <p>Time: </p><input type='time' name='time' onChange={(e) => setTime(e.target.value)}></input>
                        </div>
                        <div className='reservation-party-field'>
                            <p>Party Size: </p><input type='number' name='partySize' min={0} max={10} onChange={(e) => setPartySize(e.target.value)}></input>
                        </div>
                        <button className='reservation-submit' type='submit' disabled={errors.length === 0 ? false : true}>Submit</button>
                    </form>
                </div>
            </div>
        );
    } else {
        return (
            <div className='no-user-message'>
                <p>Want to make a reservation?</p>
                <button onClick={onClick}>login</button>
            </div>
        )
    }

}

export default ReservationForm
