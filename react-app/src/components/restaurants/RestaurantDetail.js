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
    console.log(restaurant, 'this is the restaurant')
    const userId = useSelector(state => state.session.user?.id)
    const session = useSelector(state => state.session)
    const favorite = useSelector(state => state.favorites[id])
    const history = useHistory()
    const [edit, setEdit] = useState(false);
    const [review, setReview] = useState(false)
    // const [isFav, setIsFav] = useState(false);
    const [starFill, setStarFill] = useState('noFill');
    const reviews = useSelector(state=>state.reviews)
    let review_user;
    if(reviews){
        review_user = Object.values(reviews).filter(review=>review.user_id === userId)
        console.log(review_user)
    }

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

    // const postFav = async (e) => {
    //     const fav = {
    //         user_id: userId,
    //         restaurant_id: +id
    //     };
    //     if (isFav === false) {
    //         setIsFav(true);
    //         setFavorited('Add to Favorites');
    //         setStarFill('noFill');
    //         await dispatch(setFavoriteThunk(fav));
    //     }
    // };

    // const removeFromFav = async (e) => {
    //     // if (isFav === true) {
    //     setIsFav(false);
    //     const fav = {
    //         user_id: userId,
    //         restaurant_id: +id,
    //     };
    //     await dispatch(removeFavoriteThunk(fav))
    //     // }
    // }

    useEffect(() => {
        (async () => {
            if (userId) await dispatch(getFavoritesThunk(userId, id))
            await dispatch(GetRestaurantDetailThunk(id))
        })()
        // if (favorite) {
        //     setIsFav(true)
        // }
        // console.log(isFav, favorite)
        // if (isFav) {
        //     setFavorited('Remove from Favorites');
        //     setStarFill('fill');
        // } else {
        //     setFavorited('Add to Favorites');
        //     setStarFill('noFill');
        // }
    }, [dispatch, id, userId]);


    async function handleDelete(e) {
        e.preventDefault();
        await dispatch(DeleteRestaurantThunk(id))
        history.push('/')
    }

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
                <div>
                    {session.user && (
                        <button onClick={(e) => {
                            // removeFromFav();
                            handleFav(e);
                        }} className={`star-${starFill}`}>{favorite !== undefined ? "Remove from Favorites" : "Add to Favorites"}
                        </button>
                    )}

                    {/* {isFav === false && (
                    <button onClick={() => {
                        postFav();
                        handleFav();
                    }} className={`star-${starFill}`}>Add to Favorites</button>

                )} */}

                </div>
                {session && restaurant && (
                    <div>
                        <img src={restaurant.image_url} alt="restaurant"></img>
                        <div>{restaurant.name}</div>
                        <div>{restaurant.phone}</div>
                        <div>{restaurant.cuisine}</div>
                        <div>Hours Open: {timeConverter(restaurant.open_hours)} - {timeConverter(restaurant.close_hours)}</div>

                        <div>Price Point: {'$'.repeat(restaurant.price_point)}</div>
                    </div>)
                }
                {session.user && restaurant && restaurant.user_id === userId && (
                    <>
                        <button id='edit-restaurant' onClick={handleEdit}>Edit</button>
                        <button id='delete-restaurant' onClick={handleDelete}>Delete</button>
                    </>
                )}
                {/* {session.user && ( */}

                {review && <ReviewForm restaurantId={id} hide={() => setReview(false)} />}
                <Reviews restaurantId={id} />
                {edit && <EditRestaurant id={id} hide={() => setEdit(false)} />}
                <ReservationForm />
                {review_user.length===0 &&<button onClick={reviewClick}>Write a Review</button>}


            </>

        )
    } else {
        return (<Route><h1>404 Page Not Found</h1></Route>)
    }
}

export default RestaurantDetail
