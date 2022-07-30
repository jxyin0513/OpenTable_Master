import React, { useEffect, useState } from 'react';
import { createReviewsThunk } from '../../store/review';
import { useDispatch, useSelector } from 'react-redux'
import './review-form.css'

function ReviewForm({ restaurantId, hide }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    // const restaurant = useSelector(state=>state.session.restaurants)
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(1);
    const [errors, setErrors] = useState([]);

    function onClick() {
        hide()
    }

    async function onSubmit(e) {
        e.preventDefault();

        const review = {
            user_id: user.id,
            restaurant_id: restaurantId,
            content,
            rating
        }
        const newReview = await dispatch(createReviewsThunk(review))
        if (newReview) {
            hide()
        }
    }
    useEffect(() => {
        const arr = []
        if (rating < 1 || rating > 5) {
            arr.push("Please provide rating between 1 and 5.")
        }
        if (content.length > 255) {
            arr.push('Please provide content in 255 characters.')
        }
        setErrors(arr)
    }, [rating, content]);

    return (
        <div className='review-form'>
            <form onSubmit={onSubmit}>
                <div>
                    {errors.length > 0 && errors.map(error =>
                        <div className="review-error">{error}</div>
                    )}
                </div>
                <div>
                    <textarea className='review-content' name='content' placeholder="Write a review here...or don't!" onChange={e => setContent(e.target.value)}></textarea>
                </div>
                <div className='review-rating'>
                    <p>Rating: </p><input type='number' className='review-rating' name='rating' onChange={e => setRating(e.target.value)}></input>
                </div>
                <div className='review-actions'>
                    <button type='submit' disabled={errors.length === 0 ? false : true}>Submit</button>
                    <button onClick={onClick}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default ReviewForm
