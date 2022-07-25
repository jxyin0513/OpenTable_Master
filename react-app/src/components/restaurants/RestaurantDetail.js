import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { GetRestaurantDetailThunk } from '../../store/restaurant';
import Reviews from '../reviews/Reviews';
import {useParams, NavLink} from 'react-router-dom'

function RestaurantDetail(){
    const dispatch = useDispatch()
    const {id} = useParams()
    const restaurant = useSelector(state=>state.restaurants[id])

    useEffect(()=>{
        dispatch(GetRestaurantDetailThunk(id))
    }, [dispatch, id])

    return (

        <>
        {restaurant&&
            <div>
                <div>{restaurant.name}</div>
                <div>{restaurant.phone}</div>
                <div>{restaurant.street}</div>
                <div>{restaurant.cuisine}</div>
                <div>{restaurant.hours}</div>
                <div>{restaurant.price_point}</div>
            </div>
        }
        <NavLink to={`/${id}/review`}>
            <button>Write a Review</button>
        </NavLink>
        <Reviews restaurantId={id} />
        </>

    )
}

export default RestaurantDetail
