import React, { useState } from 'react';
import { EditRestaurantThunk } from '../../store/restaurant';
import { useDispatch, useSelector } from 'react-redux'

function EditRestaurant({ id, hide }) {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)
    const restaurant = useSelector(state => state.restaurants[id])
    // const openHoursArr = restaurant.open_hours.split(':')
    // const [hour, minute, seconds] = openHoursArr
    // const openHour = new Date(null, null, null, hour, minute)
    const trimOpen = restaurant.open_hours.split(':').slice(0,2).join(':')
    const trimClose = restaurant.close_hours.split(':').slice(0,2).join(':')
    console.log(trimOpen)
    const [name, setName] = useState(restaurant.name)
    const [phone, setPhone] = useState(restaurant.phone)
    const [street, setStreet] = useState(restaurant.street)
    const [cuisine, setCuisine] = useState(restaurant.cuisine)
    const [openHours, setOpenHours] = useState(trimOpen)
    const [closeHours, setCloseHours] = useState(trimClose)
    const [url, setURL] = useState(restaurant.image_url)
    const [price_point, setPrice_Point] = useState(restaurant.price_point)
    const [errors, setErrors] = useState([]);

    const openHoursArr = openHours.split(':')
    const closeHoursArr = closeHours.split(':')
    const [hour, minute, seconds] = openHoursArr
    const [hourC, minuteC, secondsC] = closeHoursArr
    console.log(openHours, closeHours)
    async function onSubmit(e) {
        e.preventDefault();
        console.log(openHours, closeHours)
        const restaurant = {
            id,
            user_id: userId,
            name,
            phone,
            street,
            cuisine,
            open_hours: openHours,
            close_hours: closeHours,
            image_url:url,
            price_point
        }
        const edited = await dispatch(EditRestaurantThunk(restaurant))

        if (edited) {
            hide();
        }
    }


    return (
        <>
            <form onSubmit={onSubmit}>
                <ul>
                    {errors.length>0 && errors.map(error=>
                        <li className="errors">{error}</li>
                    )}
                </ul>
                <label>Name:
                    <input type='text' name='name' value={name} onChange={e => setName(e.target.value)}></input>
                </label>
                <label>Phone:
                    <input type='text' name='phone' value={phone} onChange={e => setPhone(e.target.value)}></input>
                </label>
                <label>Street:
                    <input type='text' name='street' value={street} onChange={e => setStreet(e.target.value)}></input>
                </label>
                <label>Cuisine:
                    <input type='text' name='cuisine' value={cuisine} onChange={e => setCuisine(e.target.value)}></input>
                </label>
                <label>Open Hours:
                    <input type='time' name='open_hours' value={`${hour}:${minute}`} onChange={e => setOpenHours(e.target.value)}></input>
                </label>
                <label>Close Hours:
                    <input type='time' name='close_hours' value={`${hourC}:${minuteC}`} onChange={e => setCloseHours(e.target.value)}></input>
                </label>
                <label>Image URL:
                <input type='text' name='image_url' value={url} onChange={e => setURL(e.target.value)}></input>
                </label>
                <label>Price point:
                    <input type='text' name='price_point' value={price_point} onChange={e => setPrice_Point(e.target.value)}></input>
                </label>
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default EditRestaurant;
