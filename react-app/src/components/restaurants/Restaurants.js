import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { GetRestaurantThunk } from '../../store/restaurant';
function Restaurants(){
    const dispatch = useDispatch();
    const restaurants = useSelector(state=>state.restaurants)
    console.log(restaurants)
    const allRestaurants = Object.values(restaurants)

    useEffect(()=>{
        dispatch(GetRestaurantThunk())
    }, [dispatch])

    return(
        <>
        {allRestaurants&&allRestaurants.map(restaurant=>
        (
            <div key={restaurant.id}>
                <div>{restaurant.name}</div>
                <div>{restaurant.phone}</div>
                <div>{restaurant.street}</div>
                <div>{restaurant.cuisine}</div>
                <div>{restaurant.hours}</div>
                <div>{restaurant.price_point}</div>
            </div>
        ))}
        </>
    )
}

export default Restaurants;
