const GET_RESTAURANTS = '/get/restaurants'
const GET_RESTAURANT = '/get/restaurant/detail'
const CREATE_RESTAURANT = '/post/restaurant'
const EDIT_RESTAURANT = '/edit/restaurant'
const DELETE_RESTAURANT = '/delete/restaurant'

const getRestaurants = (restaurants)=>({
    type: GET_RESTAURANTS,
    restaurants
})

const getRestaurant = (restaurant)=>({
    type: GET_RESTAURANT,
    restaurant
})

const createRestaurant = (restaurant)=>({
    type: CREATE_RESTAURANT,
    restaurant
})

const editRestaurant = (restaurant)=>({
    type: EDIT_RESTAURANT,
    restaurant
})

const deleteRestaurant = (restaurant)=>({
    type: DELETE_RESTAURANT,
    restaurant
})

export const GetRestaurantThunk = ()=> async(dispatch)=>{
    const response = await fetch('/all/restaurants')
    if(response.ok){
       const data = await response.json()
       dispatch(getRestaurants(data.restaurants))
       return data
    }
}

export const GetRestaurantDetailThunk =(id)=> async(dispatch)=>{
    const response = await fetch(`/api/restaurants/${id}`)
    if(response.ok){
        const data = await response.json()
        console.log(data)
        dispatch(getRestaurant(data))
        return data
     }

}
export const CreateRestaurantThunk = (restaurant)=>async(dispatch)=>{
    const response = await fetch(`/api/restaurants/newRestaurant`,{
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

export const EditRestaurantThunk = (restaurant)=>async(dispatch)=>{
    const response = await fetch(`/api/restaurants/${restaurant.id}/edit`,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body: JSON.stringify(restaurant)
    })
    if(response.ok){
        const data = await response.json()
        dispatch(editRestaurant(data))
        return data
    }
}

export const DeleteRestaurantThunk = (restaurant)=>async(dispatch)=>{
    const response = await fetch(`/api/restaurants/${restaurant.id}/delete`,{
        method:"DELETE",
        headers:{"content-type":"application/json"}
    })
    if(response.ok){
        const data = await response.json()
        dispatch(deleteRestaurant(data))
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

        case GET_RESTAURANT:
            const new_State = {}
            new_State[action.restaurant.id] = action.restaurant
            return new_State;

        case CREATE_RESTAURANT:
            newState[action.restaurant.id] = action.restaurant
            return newState;

        case EDIT_RESTAURANT:
            newState[action.restaurant.id] = action.restaurant
            return newState

        case DELETE_RESTAURANT:
            delete newState[action.restaurant.id];
            return newState;

        default:
            return state
    }
}
