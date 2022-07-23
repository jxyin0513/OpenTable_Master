const GET_RESTAURANTS = '/get/restaurants'
const CREATE_RESTAURANT = '/post/restaurant'

const getRestaurants = (restaurants)=>({
    type: GET_RESTAURANTS,
    restaurants
})

const createRestaurant = (restaurant)=>({
    type: CREATE_RESTAURANT,
    restaurant
})

export const GetRestaurantThunk = ()=> async(dispatch)=>{
    const response = await fetch('/all/restaurants')
    console.log(response)
    if(response.ok){
       const data = await response.json()
       console.log(data, "here -----")
       dispatch(getRestaurants(data.restaurants))
       return data
    }
}

export const CreateRestaurantThunk = (restaurant)=>async(dispatch)=>{
    const response = await fetch(`/${restaurant.user_id}/newRestaurant`,{
        method:"POST",
        headers:{"content-type":"application/json"},
        body: JSON.stringify(restaurant)
    })
    if(response.ok){
        const data = await response.json()
        dispatch(createRestaurant(data))
        return data
    }
}
const initialState = {}
export const restaurantReducer = (state=initialState, action)=>{
    let newState = {...state}
    switch(action.type){
        case GET_RESTAURANTS:
            action.restaurants.forEach(restaurant=>newState[restaurant.id]=restaurant)
            return newState;

        default:
            return state
    }
}
