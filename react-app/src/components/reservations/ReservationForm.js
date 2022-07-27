import React, { useState, useEffect } from 'react';
import { CreateReservationThunk } from '../../store/reservation'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

function ReservationForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector(state => state.session.user.id);
    const { id } = useParams();
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [partySize, setPartySize] = useState(1);
    const [errors, setErrors] = useState([]);
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
        if(newRes){
            history.push(`/users/${userId}`)
        }
    }
    useEffect(()=>{
        const current = Date.now();
        const reservedDate = new Date(`${date}T${time}:00`)
        const arr =[]
        if(current>=reservedDate){
            arr.push('Please select appropriate time')
        }
        setErrors(arr)
    },[date, time])

    return (
        <form onSubmit={onSubmit}>
            <ul>
                {errors.length>0 && errors.map(error=>
                    <li className="errors">{error}</li>
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
            <button type='submit' disabled={errors.length===0 ? false : true}>Submit</button>
        </form>

    )

}

export default ReservationForm
