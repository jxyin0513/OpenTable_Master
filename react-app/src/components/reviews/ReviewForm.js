import React, { useState } from 'react';
import { createReviewsThunk } from '../../store/review';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function ReviewForm() {
    const dispatch = useDispatch();
    const { restaurantId } = useParams()
    const user = useSelector(state => state.session.user)
    // const restaurant = useSelector(state=>state.session.restaurants)
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(0);

    function onSubmit(e) {
        e.preventDefault();

        const review = {
            user_id: user.id,
            restaurant_id: restaurantId,
            content,
            rating
        }
        dispatch(createReviewsThunk(review))
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Comment: </label>
                    <input type='text' name='content' onChange={e => setContent(e.target.value)}></input>
                </div>
                <div>
                    <label>rating: </label>
                    <input type='number' name='rating' onChange={e => setRating(e.target.value)}></input>
                </div>
                <button type='submit'>Edit</button>
            </form>
        </>
    )
}

export default ReviewForm
