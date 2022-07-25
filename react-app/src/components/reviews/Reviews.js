import React, { useState, useEffect } from 'react';
import { getReviewsThunk } from '../../store/review';
import {useDispatch, useSelector} from 'react-redux'

function Reviews({restaurantId}){
    const dispatch = useDispatch();
    const allReviews = Object.values(useSelector(state=>state.reviews))
    const reviews = allReviews.filter(review=>(review.restaurant_id===Number(restaurantId)))
    useEffect(()=>{
        dispatch(getReviewsThunk())
    }, [dispatch])

    return (
        <>
        {reviews&&
            <table>
                    <thead>
                        <tr>
                            <th>rating</th>
                            <th>comment</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                        reviews.map(review=>{
                            return(
                                <tr key={review.id}>
                                    <td>{review.rating}</td>
                                    <td>{review.content}</td>

                                </tr>
                                )
                            })}
                    </tbody>
                </table>
        }
        </>
    )
}

export default Reviews
