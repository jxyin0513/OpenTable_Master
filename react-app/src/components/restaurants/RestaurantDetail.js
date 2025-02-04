import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteRestaurantThunk, GetRestaurantDetailThunk } from '../../store/restaurant';
import { getFavoritesThunk, removeFavoriteThunk, setFavoriteThunk } from '../../store/favorite';
import EditRestaurant from './RestaurantEdit';
import Reviews from '../reviews/Reviews';
import ReviewForm from '../reviews/ReviewForm';
import ReservationForm from '../reservations/ReservationForm'
import { useParams, useHistory, Route } from 'react-router-dom'
import './restaurantDetail.css'


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
    console.log(userId, favorite, starFill)
    const reviews = useSelector(state => state.reviews)
    let review_user;
    if (reviews) {
        review_user = Object.values(reviews).filter(review => { if (review.user_id === userId && review.restaurant_id === Number(id)) return true })
    }

    //Converts 24hr format to 12hr format
    const timeConverter = (time) => {
        let hours = time.split(':')[0];
        if (+hours > 12) {
            hours = `${((+hours + 11) % 12 + 1)}PM`;
        }
        else {
            hours = `${((+hours + 11) % 12 + 1)}AM`;
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
        await fetch(`/api/restaurants/favorites/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(async () => await dispatch(DeleteRestaurantThunk(id)));
        history.push('/')
    }

    //Dispatches edits to the current restaurant if the owner is the user
    function handleEdit(e) {
        e.preventDefault()
        setReview(false)
        setEdit(true);
    }
    function reviewClick(e) {
        if (!session.user) {
            history.push('/login')
        }
        setEdit(false)
        setReview(true)
    }
    if (restaurant) {
        return (

            <span id='overall-box'>
                <div id='detail-image-wrapper'>
                    {!restaurant.image_url && (
                        <img id='restaurant-image' src='https://i.imgur.com/W5l5B9n.png' alt="default restaurant"></img>
                    )}
                    {restaurant.image_url && (
                        <img id='restaurant-image' src={restaurant.image_url} alt="restaurant"></img>
                    )}
                </div>
                <div id='favorite-button-box'>
                    {session.user && (
                        <button id='favorite-button' onClick={(e) => {
                            handleFav(e);
                        }} className={`star-${favorite !== undefined ? 'fill' : 'noFill'}`}>{favorite !== undefined ? "Remove from Favorites" : "Add to Favorites"}
                        </button>
                    )}

                </div>
                <span id='restaurant-page'>

                    <span id='restaurant-details'>
                        {session && restaurant && (
                            <span id='restaurant-box'>

                                <div id='restaurant-info'>
                                    <h1 id='restaurant-name'>{restaurant.name}</h1>
                                    <div id='below-name'>
                                        <div id='phone'>
                                            <div id='phone-tag'>PHONE:  </div>
                                            <div>{restaurant.phone}</div>
                                        </div>
                                        <div id='cuisine'>
                                            <div id='cuisine-tag'>CUISINE:  </div>
                                            <div>{restaurant.cuisine}</div>
                                        </div>
                                        <div id='price-point'>
                                            <div id='price-tag'>PRICE: </div>
                                            <div id='price-scale'> {'$'.repeat(restaurant.price_point)}</div>
                                        </div>
                                        <div id='hours'>
                                            <div id='hours-tag'>HOURS:  </div>
                                            <div>{timeConverter(restaurant.open_hours)} - {timeConverter(restaurant.close_hours)}</div>
                                        </div>
                                    </div>

                                </div>
                            </span>
                        )}
                        {session.user && restaurant && restaurant.user_id === userId && (
                            <div id="user-owned-buttons">
                                <button className='detail-button' id='edit-restaurant' onClick={handleEdit}>Edit</button>
                                <button className='detail-button' id='delete-restaurant' onClick={handleDelete}>Delete</button>
                            </div>
                        )}
                        {edit && <EditRestaurant id={id} hide={() => setEdit(false)} />}
                        <Reviews restaurantId={id} />
                        {review && <ReviewForm restaurantId={id} hide={() => setReview(false)} />}
                        {review_user.length === 0 && <button className='detail-button' onClick={reviewClick}>Write a Review</button>}


                    </span>
                    <div id='reservation-form-box'>
                        <ReservationForm />
                    </div>
                </span>
            </span>

        )
    } else {
        return (<Route><h1>404 Page Not Found</h1></Route>)
    }
}

export default RestaurantDetail
