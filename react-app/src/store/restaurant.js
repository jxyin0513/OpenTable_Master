const GET_RESTAURANTS = '/get/restaurants'
const GET_RESTAURANT = '/get/restaurant/detail'
const SEARCH_RESTAURANTS = '/get/searchRestaurants'
const CREATE_RESTAURANT = '/post/restaurant'
const EDIT_RESTAURANT = '/edit/restaurant'
const DELETE_RESTAURANT = '/delete/restaurant'
const CREATE_IMAGE = '/upload/images'

const getRestaurants = (restaurants) => ({
    type: GET_RESTAURANTS,
    restaurants
});

const getRestaurant = (restaurant) => ({
    type: GET_RESTAURANT,
    restaurant
});

const createRestaurant = (restaurant) => ({
    type: CREATE_RESTAURANT,
    restaurant
});

const createImage = (image) =>({
    type:CREATE_IMAGE,
    image
})

const editRestaurant = (restaurant) => ({
    type: EDIT_RESTAURANT,
    restaurant
});

const deleteRestaurant = (restaurant) => ({
    type: DELETE_RESTAURANT,
    restaurant
});

const searchRestaurants = (restaurants) => ({
    type: SEARCH_RESTAURANTS,
    restaurants
});

export const GetRestaurantThunk = () => async (dispatch) => {
    const response = await fetch('/all/restaurants')
    if (response.ok) {
        const data = await response.json()
        dispatch(getRestaurants(data.restaurants))
        return data
    }
}

export const GetRestaurantDetailThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/restaurants/${id}`)
    if (response.ok) {
        const data = await response.json()
        dispatch(getRestaurant(data))
        return data
    }

}
export const CreateRestaurantThunk = (restaurant) => async (dispatch) => {
    console.log(restaurant)
    const response = await fetch(`/api/restaurants/newRestaurant`, {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: restaurant
    })
    if (response.ok) {
        const data = await response.json()
        console.log(data)
        dispatch(createRestaurant(data))
        return null
    } else if (response.status < 500) {
        const data = await response.json();
        console.log(data)
        if (data.errors) {
            return data.errors;
        }
    }
}
// export const UploadImageThunk = (image) => async (dispatch) => {
//     console.log(image)
//     const response = await fetch(`/api/restaurants/newRestaurant`, {
//         method: "POST",
//         // headers: { "Content-Type": "application/json" },
//         body: image.image_url
//     })
//     if (response.ok) {
//         const data = await response.json()
//         dispatch(createRestaurant(data.image))
//         return null
//     } else if (response.status < 500) {
//         const data = await response.json();
//         if (data.errors) {
//             return data.errors;
//         }
//     }
// }

export const EditRestaurantThunk = (restaurant, id) => async (dispatch) => {
    const response = await fetch(`/api/restaurants/${id}/edit`, {
        method: "PUT",
        // headers: { "Content-Type": "application/json" },
        body: restaurant
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(editRestaurant(data))
        return null
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
}

export const DeleteRestaurantThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/restaurants/${id}/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(deleteRestaurant(data))
        return data
    } else {
        console.log({ "message": "Unsuccessful" })
    }
}

export const SearchRestaurantsThunk = (params) => async (dispatch) => {
    const response = await fetch(`/api/restaurants/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(searchRestaurants(data.restaurants));
        return data;
    } else {
        return { "Message": "Unsuccessful" }
    }
};


const initialState = {}
export const restaurantReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_RESTAURANTS:
            action.restaurants.forEach(restaurant => newState[restaurant.id] = restaurant)
            return newState;

        case GET_RESTAURANT:
            const new_State = {}
            new_State[action.restaurant.id] = action.restaurant
            return new_State;

        case CREATE_RESTAURANT:
            if(action.restaurant.url) return newState;
            newState[action.restaurant.id] = action.restaurant
            return newState;

        case CREATE_IMAGE:
            newState[action.image.id]['image_url'] = action.image.url
            return newState;

        case EDIT_RESTAURANT:
            newState[action.restaurant.id] = action.restaurant
            return newState

        case DELETE_RESTAURANT:
            delete newState[action.restaurant.id];
            return newState;
        case SEARCH_RESTAURANTS:
            action.restaurants.forEach(restaurant => newState[restaurant.id] = restaurant)
            return newState;
        default:
            return state
    }
}
