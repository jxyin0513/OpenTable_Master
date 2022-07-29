import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteRestaurantThunk, GetRestaurantDetailThunk } from '../../store/restaurant';
import { getFavoritesThunk, removeFavoriteThunk, setFavoriteThunk } from '../../store/favorite';
import EditRestaurant from './RestaurantEdit';
import Reviews from '../reviews/Reviews';
import ReviewForm from '../reviews/ReviewForm';
import ReservationForm from '../reservations/ReservationForm'
import { useParams, useHistory, Route } from 'react-router-dom'

function RestaurantDetail() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const restaurant = useSelector(state => state.restaurants[id])
    const userId = useSelector(state => state.session.user?.id)
    const session = useSelector(state => state.session)
    const favorite = useSelector(state => state.favorites[id])
    const history = useHistory()
    const [edit, setEdit] = useState(false);
    const [review, setReview] = useState(false)
    const [starFill, setStarFill] = useState('noFill');
    const reviews = useSelector(state => state.reviews)
    let review_user;
    if (reviews) {
        review_user = Object.values(reviews).filter(review => review.user_id === userId)
    }

    //Converts 24hr format to 12hr format
    const timeConverter = (time) => {
        let hours = time.split(':')[0];
        if (+hours > 12) {
            hours = `${((+hours + 11) % 12 + 1)}PM`;
        }
        else {
            hours = `${hours}AM`;
        }
        return hours;
    }

    //Adds and removes a restaurant from a user's favorites
    const handleFav = async (e) => {
        const fav = {
            user_id: userId,
            restaurant_id: +id
        };

        if (e.target.innerText === 'Add to Favorites') {
            setStarFill('fill');
            await dispatch(setFavoriteThunk(fav));
        } else {
            setStarFill('noFill');
            await dispatch(removeFavoriteThunk(fav));
        }
    };

    //Checks if the currently viewed restaurant is a favorite
    useEffect(() => {
        (async () => {
            if (userId) await dispatch(getFavoritesThunk(userId, id))
            await dispatch(GetRestaurantDetailThunk(id))
        })()
    }, [dispatch, id, userId]);

    //Deletes a restaurant if the user is the owner
    async function handleDelete(e) {
        e.preventDefault();
        await dispatch(DeleteRestaurantThunk(id))
        history.push('/')
    }

    //Dispatches edits to the current restaurant if the owner is the user
    function handleEdit(e) {
        e.preventDefault()
        setEdit(true);
    }
    function reviewClick(e) {
        if (!session.user) {
            history.push('/login')
        }
        setReview(true)
    }
    if (restaurant) {
        return (
            <>
                <img id='restaurant-image' src={restaurant.image_url} alt="restaurant"></img>

                <span id='restaurant-page'>
                    <div>
                        {session.user && (
                            <button onClick={(e) => {
                                handleFav(e);
                            }} className={`star-${starFill}`}>{favorite !== undefined ? "Remove from Favorites" : "Add to Favorites"}
                            </button>

                        )}

                    </div>
                    {session && restaurant && (
                        <span id='restaurant-box'>

                            <div id='restaurant-details'>
                                <div>{restaurant.name}</div>
                                <div>{restaurant.phone}</div>
                                <div>{restaurant.cuisine}</div>
                                <div>Hours Open: {timeConverter(restaurant.open_hours)} - {timeConverter(restaurant.close_hours)}</div>

                                <div>Price Point: {'$'.repeat(restaurant.price_point)}</div>
                            </div>
                        </span>
                    )}
                    {session.user && restaurant && restaurant.user_id === userId && (
                        <>
                            <button id='edit-restaurant' onClick={handleEdit}>Edit</button>
                            <button id='delete-restaurant' onClick={handleDelete}>Delete</button>
                        </>
                    )}

                    {review && <ReviewForm restaurantId={id} hide={() => setReview(false)} />}
                    <Reviews restaurantId={id} />
                    {edit && <EditRestaurant id={id} hide={() => setEdit(false)} />}
                    <ReservationForm />
                    {review_user.length === 0 && <button onClick={reviewClick}>Write a Review</button>}


                </span>
            </>
        )
    } else {
        return (<Route><h1>404 Page Not Found</h1></Route>)
    }
}

export default RestaurantDetail
