import React, { useState, useEffect } from 'react';
import { getReviewsThunk } from '../../store/review';
import { deleteReviewThunk } from '../../store/review';
// import { editReviewsThunk } from '../../store/review';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './reviews.css'

function Reviews({ restaurantId }) {
    const dispatch = useDispatch();
    const allReviews = Object.values(useSelector(state => state.reviews))
    const reviews = allReviews.filter(review => (review.restaurant_id === Number(restaurantId)))
    const user = useSelector(state => state.session.user)
    const [users, setUsers] = useState([]);

    const avgOf = (array) => {
        let total = 0;
        if (!array.length) {
            return null;
        } else {
            for (let i = 0; i < array.length; i++) {
                let num = array[i];
                total += num
            };
            return total / array.length
        }
    }

    const averageScore = avgOf(reviews.map(review => review.rating))

    const userMatcher = (userArr, id) => {
        return userArr?.find(user => user.id === id)?.username
    }

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
        dispatch(getReviewsThunk())
    }, [dispatch])

    function onDelete(e) {
        e.preventDefault();

        dispatch(deleteReviewThunk(e.target.className))

    }

    return (
        <>
            {reviews &&
                <div>
                    {!averageScore && (
                        <h2>No Ratings Yet! Be the first!</h2>
                    )}
                    {averageScore && (
                        <h2>Average Rating: {'⭐'.repeat(averageScore)}</h2>
                    )}
                    <h3>Foodie Reviews</h3>
                    {reviews.map(review => {
                        return (
                            <div key={review.id} className='review-card'>
                                {!review.content && (
                                    <div className='review-content'>
                                        {userMatcher(users, review.user_id)} is speechless...
                                    </div>
                                )}
                                {review.content && (
                                    <div className='review-speechless'>
                                        <p>{userMatcher(users, review.user_id)} says: "{review.content}"</p>
                                    </div>
                                )}
                                <p className='rating-stars'>{userMatcher(users, review.user_id)}'s rating: {'⭐'.repeat(review.rating)}</p>
                                {user && user.id === review.user_id && (
                                    <div className='review-action-buttons'>
                                        <NavLink to={`/edit/${review.id}`}>
                                            <button className={`edit-${review.id}`}>Edit</button>
                                        </NavLink>
                                        <button className={`delete-${review.i}`} onClick={onDelete}>Delete</button>
                                    </div>
                                )}
                            </div>
                        )
                    })}

                </div>
            }
        </>
    )
}

export default Reviews
