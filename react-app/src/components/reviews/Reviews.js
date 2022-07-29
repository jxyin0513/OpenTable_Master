import React, { useState, useEffect } from 'react';
import { getReviewsThunk } from '../../store/review';
import { deleteReviewThunk } from '../../store/review';
// import { editReviewsThunk } from '../../store/review';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

function Reviews({ restaurantId }) {
    const dispatch = useDispatch();
    const allReviews = Object.values(useSelector(state => state.reviews))
    const reviews = allReviews.filter(review => (review.restaurant_id === Number(restaurantId)))
    const user = useSelector(state => state.session.user)

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

    // if (!reviews) {
    //     averageScore = 0;
    // } else {
    //     averageScore = Math.floor(reviews.map(review => review.rating).reduce((a, b) => (a + b)) / reviews.length)
    // }
    // const [editReview, setEditReview] = useState(false)
    const [users, setUsers] = useState([]);

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
    }, []);

    useEffect(() => {
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
                    {reviews.map(review => {
                        return (
                            <div key={review.id}>

                                <p>{'⭐'.repeat(review.rating)}</p>
                                <p>{userMatcher(users, review.user_id)} says "{review.content}"</p>
                                {user && user.id === review.user_id && (
                                    <div>
                                        <div>
                                            <NavLink to={`/edit/${review.id}`}>
                                                <button className={review.id}>edit</button>
                                            </NavLink>
                                            <button className={review.id} onClick={onDelete}>delete</button>
                                        </div>
                                        {/* <div>
                                            {editReview && (<EditReview id={review.id} hide={() => setEditReview(false)} />)}
                                        </div> */}
                                    </div>
                                )
                                }

                            </div>
                        )
                    })}

                </div>
            }
        </>
    )
}

export default Reviews
