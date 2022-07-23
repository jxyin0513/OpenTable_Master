import React, { useState, useEffect } from 'react';
import { CreateRestaurantThunk } from '../../store/restaurant';
import {useDispatch, useSelector} from 'react-redux'
function RestaurantForm(){
    const dispatch = useDispatch()
    const userId = useSelector(state=>state.session.user.id)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [cuisine, setCuisine] = useState('')
    const [hours, setHours] = useState('')
    const [price_point, setPrice_Point] = useState(0)
    function onSubmit(e){
        e.preventDefault();
        const restaurant = {
            user_id:userId,
            name,
            phone,
            street,
            cuisine,
            hours,
            price_point
        }
        dispatch(CreateRestaurantThunk(restaurant))
    }
    return (
        <>

            <form onSubmit={onSubmit}>
                <label>Name:
                    <input name='name' onChange={e=>setName(e.target.value)}></input>
                </label>
                <label>Phone:
                    <input name = 'phone' onChange={e=>setPhone(e.target.value)}></input>
                </label>
                <label>Street:
                    <input name = 'street' onChange={e=>setStreet(e.target.value)}></input>
                </label>
                <label>Cuisine:
                    <input name = 'cuisine' onChange={e=>setCuisine(e.target.value)}></input>
                </label>
                <label>Hours:
                    <input name = 'hours' onChange={e=>setHours(e.target.value)}></input>
                </label>
                <label>Price point:
                    <input name = 'price_point' onChange={e=>setPrice_Point(e.target.value)}></input>
                </label>
                <button>Submit</button>
            </form>
        </>
    )
}

export default RestaurantForm
