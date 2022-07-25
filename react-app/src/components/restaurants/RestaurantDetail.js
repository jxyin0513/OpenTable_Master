import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteRestaurantThunk, GetRestaurantDetailThunk } from '../../store/restaurant';
import Reviews from '../reviews/Reviews';
import { useParams, NavLink, useHistory } from 'react-router-dom'

function RestaurantDetail() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const restaurant = useSelector(state => state.restaurants[id])
    console.log(restaurant, 'this is the restaurant')
    const userId = useSelector(state => state.session.user?.id)
    const session = useSelector(state => state.session)
    const history = useHistory()

    useEffect(() => {
        dispatch(GetRestaurantDetailThunk(id))
    }, [dispatch, id])


    async function handleDelete(e) {
        e.preventDefault();
        await dispatch(DeleteRestaurantThunk(id))
        history.push('/')
    }

    return (

        <>
            {session && restaurant && (
                <div>
                    <div>{restaurant.name}</div>
                    <div>{restaurant.phone}</div>
                    <div>{restaurant.cuisine}</div>
                    <div>{restaurant.hours}</div>
                    <div>{restaurant.price_point}</div>
                </div>)
            }
            {session.user && restaurant && restaurant.user_id === userId && (
                <>
                    <button id='edit-restaurant' >Edit</button>
                    <button id='delete-restaurant' onClick={handleDelete}>Delete</button>
                </>
            )}
            <NavLink to={`/${id}/review`}>
                <button>Write a Review</button>
            </NavLink>
            <Reviews restaurantId={id} />
        </>

    )
}

export default RestaurantDetail
