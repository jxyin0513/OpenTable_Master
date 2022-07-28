import React, { useState, useEffect } from 'react';
import { getReviewsThunk } from '../../store/review';
import { deleteReviewThunk } from '../../store/review';
import EditReview from './ReviewEdit';
// import { editReviewsThunk } from '../../store/review';
import { useDispatch, useSelector } from 'react-redux'
import {NavLink} from 'react-router-dom'

function Reviews({ restaurantId }) {
    const dispatch = useDispatch();
    const allReviews = Object.values(useSelector(state => state.reviews))
    const reviews = allReviews.filter(review => (review.restaurant_id === Number(restaurantId)))
    const user = useSelector(state => state.session.user)
    const [editReview, setEditReview] = useState(false)

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
                    {reviews.map(review => {
                        return (
                            <div key={review.id}>

                                <p>{review.rating}</p>
                                <p>{review.content}</p>
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
