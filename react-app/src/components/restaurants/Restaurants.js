import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getFavoritesThunk } from '../../store/favorite';
import { GetRestaurantThunk } from '../../store/restaurant';
import Search from './SearchRestaurant';
function Restaurants() {
    const dispatch = useDispatch();
    const restaurants = useSelector(state => state.restaurants)
    console.log(restaurants)
    const allRestaurants = Object.values(restaurants)

    useEffect(() => {
        dispatch(GetRestaurantThunk())
        // dispatch(getFavoritesThunk())
    }, [dispatch])

    return (
        <>
            <Search />
            {allRestaurants && allRestaurants.map(restaurant =>
            (
                <NavLink to={`/restaurants/${restaurant.id}`}>
                    <div key={restaurant.id}>
                        <img src={restaurant.image_url} alt="image"></img>
                        <div>{restaurant.name}</div>
                        <div>{restaurant.phone}</div>
                        <div>{restaurant.street}</div>
                        <div>{restaurant.cuisine}</div>
                        <div>{restaurant.hours}</div>
                        <div>{restaurant.price_point}</div>
                    </div>
                </NavLink>
            ))}
        </>
    )
}

export default Restaurants;
