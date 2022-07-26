import React, { useState } from 'react';
import { editReviewsThunk } from '../../store/review';
import { useDispatch, useSelector } from 'react-redux'

function EditReview({ id, hide }) {
    const dispatch = useDispatch();
    const review = useSelector(state => state.reviews[id])
    const [content, setContent] = useState(review.content);
    const [rating, setRating] = useState(review.rating);

    async function onSubmit(e) {
        e.preventDefault()

        const review = {
            id,
            content,
            rating
        }

        const editedReview = await dispatch(editReviewsThunk(review))
        if (editedReview) {
            hide();
        }

    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Comment: </label>
                    <input type='text' name='content' value={content} onChange={e => setContent(e.target.value)}></input>
                </div>
                <div>
                    <label>rating: </label>
                    <input type='number' name='rating' value={rating} onChange={e => setRating(e.target.value)}></input>
                </div>
                <button type='submit'>Edit</button>
            </form>
        </>
    )
}

export default EditReview;
