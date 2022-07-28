import React, { useEffect, useState } from 'react';
import { createReviewsThunk } from '../../store/review';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

function ReviewForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { restaurantId } = useParams()
    const user = useSelector(state => state.session.user)
    // const restaurant = useSelector(state=>state.session.restaurants)
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(1);
    const [errors, setErrors] = useState([]);

    function onClick(){
        history.push(`/restaurants/${restaurantId}`)
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
        if(newReview){
            history.push(`/restaurants/${restaurantId}`)
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
                    <input type='text' name='content' onChange={e => setContent(e.target.value)}></input>
                </div>
                <div>
                    <label>rating: </label>
                    <input type='number' name='rating' onChange={e => setRating(e.target.value)}></input>
                </div>
                <button type='submit' disabled={errors.length===0? false : true}>Edit</button>
                <button onClick={onClick}>Cancel</button>
            </form>
        </>
    )
}

export default ReviewForm
