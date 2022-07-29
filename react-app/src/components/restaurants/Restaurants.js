import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { GetRestaurantThunk } from '../../store/restaurant';
import Search from './SearchRestaurant';
import './restaurants.css'

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

            <div className='restaurantsContentWrapper'>
                <div className='searchBanner'>
                    <div className='searchWrapper'>
                        <h1 className='mainPageBanner'>Find your table tonight!</h1>
                        <Search />
                    </div>
                </div>
                <div className='restaurantsListWrapper'>
                    {allRestaurants && allRestaurants.map(restaurant =>
                    (
                        <NavLink key={restaurant.id} to={`/restaurants/${restaurant.id}`}>
                            <div key={restaurant.id} className='restaurantDiv'>
                                <img src={restaurant.image_url} alt="restaurant"></img>
                                <div className='restaurantName'>{restaurant.name}</div>
                                <div className='restaurantPhone'>{restaurant.phone}</div>
                                <div className='restaurantStreet'>{restaurant.street}</div>
                                <div className='restaurantCuisine'>{restaurant.cuisine}</div>
                                <div className='restaurantHours'>{restaurant.hours}</div>
                                <div className='restaurantPrice'>
                                    {'$'.repeat(restaurant.price_point)}
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Restaurants;
