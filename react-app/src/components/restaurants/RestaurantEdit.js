import React, { useState } from 'react';
import { EditRestaurantThunk } from '../../store/restaurant';
import { useDispatch, useSelector } from 'react-redux'

function EditRestaurant({ id, hide }) {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)
    const restaurant = useSelector(state => state.restaurants[id])
    const [name, setName] = useState(restaurant.name)
    const [phone, setPhone] = useState(restaurant.phone)
    const [street, setStreet] = useState(restaurant.street)
    const [cuisine, setCuisine] = useState(restaurant.cuisine)
    const [hours, setHours] = useState(restaurant.hours)
    const [price_point, setPrice_Point] = useState(restaurant.price_point)

    async function onSubmit(e) {
        e.preventDefault();

        const restaurant = {
            id,
            user_id: userId,
            name,
            phone,
            street,
            cuisine,
            hours,
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
                <label>Hours:
                    <input type='text' name='hours' value={hours} onChange={e => setHours(e.target.value)}></input>
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
