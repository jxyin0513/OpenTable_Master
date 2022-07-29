import React, { useState } from 'react';
import { CreateRestaurantThunk } from '../../store/restaurant';
import { useDispatch, useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'

function RestaurantForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const userId = useSelector(state => state.session.user.id)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [cuisine, setCuisine] = useState('')
    const [openHours, setOpenHours] = useState('')
    const [closeHours, setCloseHours] = useState('')
    const [price_point, setPrice_Point] = useState(0)
    const [url, setURL] = useState('')
    const [errors, setErrors] = useState([])
    const cuisines = ['American', 'Barbecue', 'Cafe', 'Chinese', 'Fast Food', 'Indian', 'Italian', 'Japanese', 'Korean BBQ', 'Mediterranean', 'Mexican', 'Middle Earth', 'Thai', 'Vegan']

    //create new restaurant
    async function onSubmit(e) {
        e.preventDefault();
        const restaurant = {
            user_id: userId,
            name,
            phone,
            street,
            cuisine,
            open_hours: openHours,
            close_hours: closeHours,
            image_url: url,
            price_point
        }

        const newRestaurant = await dispatch(CreateRestaurantThunk(restaurant))
        if(!newRestaurant){
            history.push('/')
        }else{
            setErrors(newRestaurant)
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
                    <input type='text' name='name' onChange={e => setName(e.target.value)}></input>
                </label>
                <label>Phone:
                    <input type='text' name='phone' onChange={e => setPhone(e.target.value)}></input>
                </label>
                <label>Street:
                    <input type='text' name='street' onChange={e => setStreet(e.target.value)}></input>
                </label>
                <label>Cuisine:
                    <select name='cuisine' onChange={e => setCuisine(e.target.value)}>
                        {cuisines.map(cuisine=>(
                            <option key={cuisine} value={cuisine}>{cuisine}</option>
                        ))}
                    </select>
                </label>
                <label>Open Hours:
                    <input type='time' name='open_hours' onChange={e => setOpenHours(e.target.value)}></input>
                </label>
                <label>Close Hours:
                    <input type='time' name='close_hours' onChange={e => setCloseHours(e.target.value)}></input>
                </label>
                <label>Image URL:
                <input type='text' name='image_url' onChange={e => setURL(e.target.value)}></input>
                </label>
                <label>Price point:
                    <input type='text' name='price_point' onChange={e => setPrice_Point(e.target.value)}></input>
                </label>
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default RestaurantForm
