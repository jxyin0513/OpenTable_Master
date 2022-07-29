import React, { useState } from 'react';
import { CreateRestaurantThunk } from '../../store/restaurant';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './new-restaurant-form.css'

function RestaurantForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const userId = useSelector(state => state.session.user.id)

    const messages = [
        'Best restaurant in the world?',
        'I hope they have fancy drinks. 🍹',
        'Ooh! I hope it\'s got tacos!',
        'Is it in the nice part of town?',
        'Watch out other restaurants! New competition coming through.',
        'Does it have outside seating?',
        'I hope they\'re open late!',
        'I\'m gonna be the first to visit!',
        'Think they\'ll seat 20? 🤔',
        '🗿'
    ]

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState(messages[Math.floor(Math.random() * messages.length)])
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
        if (!newRestaurant) {
            history.push('/')
        } else {
            setErrors(newRestaurant)
        }
    }

    return (
        <div className='restaurant-form-container'>
            <div className='restaurant-form'>
                <h2 className='restaurant-form-header'>Add a Restaurant</h2>
                <h3 className='restaurant-form-message'>{message}</h3>
                <form onSubmit={onSubmit}>
                    {errors.length > 0 && errors.map(error =>
                        <div className="restaurant-error">{error}</div>
                    )}
                    <input type='text' className='restaurant-field' name='name' placeholder='Restaurant Name' onChange={e => setName(e.target.value)}></input>

                    <input type='text' className='restaurant-field' name='phone' placeholder='Phone Number' onChange={e => setPhone(e.target.value)}></input>

                    <input type='text' className='restaurant-field' name='street' placeholder='Street Address' onChange={e => setStreet(e.target.value)}></input>

                    <select name='cuisine' className='restaurant-field' onChange={e => setCuisine(e.target.value)}>
                        <option selected disabled>--Cuisine--</option>
                        {cuisines.map(cuisine => (
                            <option key={cuisine} value={cuisine}>{cuisine}</option>
                        ))}
                    </select>
                    <p>Opening</p>
                    <input type='time' className='restaurant-field' name='open_hours' onChange={e => setOpenHours(e.target.value)}></input>
                    <p>Closing</p>
                    <input type='time' className='restaurant-field' name='close_hours' onChange={e => setCloseHours(e.target.value)}></input>

                    <input type='text' className='restaurant-field' name='image_url' placeholder='Image Url' onChange={e => setURL(e.target.value)}></input>

                    <input type='number' className='restaurant-field' name='price_point' placeholder='Price Point' min='1' max='5' onChange={e => setPrice_Point(e.target.value)}></input>
                    <button type='submit' className='restaurant-submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default RestaurantForm
