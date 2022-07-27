import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteRestaurantThunk, GetRestaurantDetailThunk } from '../../store/restaurant';
import { getFavoritesThunk, removeFavoriteThunk, setFavoriteThunk } from '../../store/favorite';
import EditRestaurant from './RestaurantEdit';
import Reviews from '../reviews/Reviews';
import ReservationForm from '../reservations/ReservationForm'
import { useParams, NavLink, useHistory } from 'react-router-dom'

function RestaurantDetail() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const restaurant = useSelector(state => state.restaurants[id])
    console.log(restaurant, 'this is the restaurant')
    const userId = useSelector(state => state.session.user?.id)
    const session = useSelector(state => state.session)
    const history = useHistory()
    const [edit, setEdit] = useState(false);
    const [isFav, setIsFav] = useState(false);
    const [starFill, setStarFill] = useState('noFill');
    const [favorited, setFavorited] = useState('Add to Favorites');

    const handleFav = (e) => {
        if (favorited === 'Add to Favorites') {
            setFavorited('Remove from Favorites');
            setStarFill('fill');
        } else {
            setFavorited('Add to Favorites');
            setStarFill('noFill');
        };
    };

    const postFav = async (e) => {
        if (isFav === false) {
            setIsFav(true);
            const fav = {
                user_id: userId,
                restaurant_id: +id
            };

            await dispatch(setFavoriteThunk(fav));
        };
    };

    const removeFromFav = async (e) => {
        if (isFav === true) {
            setIsFav(false);
            const fav = {
                user_id: userId,
                restaurant_id: +id,
            };
            await dispatch(removeFavoriteThunk(fav))
        }
    }

    useEffect(() => {
        dispatch(GetRestaurantDetailThunk(id))
        dispatch(getFavoritesThunk(userId, id))
    }, [dispatch, id]);


    async function handleDelete(e) {
        e.preventDefault();
        await dispatch(DeleteRestaurantThunk(id))
        history.push('/')
    }

    function handleEdit(e) {
        e.preventDefault()
        setEdit(true);
    }

    return (

        <>
            <div>
                <button onClick={() => {
                    postFav();
                    removeFromFav();
                    handleFav();
                }} className={`star-${starFill}`}>{favorited}</button>
            </div>
            {session && restaurant && (
                <div>
                    <img src={restaurant.image_url} alt="Image"></img>
                    <div>{restaurant.name}</div>
                    <div>{restaurant.phone}</div>
                    <div>{restaurant.cuisine}</div>
                    <div>Hours Open: {restaurant.open_hours} - {restaurant.close_hours}</div>

                    <div>{restaurant.price_point}</div>
                </div>)
            }
            {session.user && restaurant && restaurant.user_id === userId && (
                <>
                    <button id='edit-restaurant' onClick={handleEdit}>Edit</button>
                    <button id='delete-restaurant' onClick={handleDelete}>Delete</button>
                </>
            )}
            <NavLink to={`/${id}/review`}>
                <button>Write a Review</button>
            </NavLink>
            <Reviews restaurantId={id} />
            {edit && <EditRestaurant id={id} hide={() => setEdit(false)} />}
            <ReservationForm />

        </>

    )
}

export default RestaurantDetail
