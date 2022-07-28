import React, { useState, useEffect } from 'react';
import { editReviewsThunk } from '../../store/review';
import { useDispatch, useSelector } from 'react-redux'

function EditReview({ id, hide }) {
    const dispatch = useDispatch();
    const review = useSelector(state => state.reviews[id])
    const [content, setContent] = useState(review.content);
    const [rating, setRating] = useState(review.rating);
    const [errors, setErrors] = useState([])
    console.log(review)
    function onClick(){
        hide()
    }

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
    useEffect(()=>{
        const arr = []
        if(rating<1|| rating>5){
            arr.push("Please provide rating between 1 and 5.")
        }
        if(content.length>255){
            arr.push('Please provide content in 255 characters.')
        }
        setErrors(arr)
    }, [rating, content]);

    return (
        <>
            <form onSubmit={onSubmit}>
                <ul>
                    {errors.length>0 && errors.map(error=>
                        <li className="errors">{error}</li>
                    )}
                </ul>
                <div>
                    <label>Comment: </label>
                    <input type='text' name='content' value={content} onChange={e => setContent(e.target.value)}></input>
                </div>
                <div>
                    <label>rating: </label>
                    <input type='number' name='rating' value={rating} onChange={e => setRating(e.target.value)}></input>
                </div>
                <button type='submit' disabled={errors.length===0 ? false : true}>Edit</button>
                <button onClick={onClick}>Cancel</button>
            </form>
        </>
    )
}

export default EditReview;
