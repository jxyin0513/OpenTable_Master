const GET_FAVORITE_RESTAURANTS = 'get/favoriteRestaurants'
const GET_ALL_FAVORITES = 'get/allFavoriteRestaurants'
const POST_FAVORITE_RESTAURANT = 'post/favoriteRestaurant'
const REMOVE_FAVORITE_RESTAURANT = 'delete/favoriteRestaurant'
// const DESTROY_ALL_FAVORITES = 'delete/restaurantFavorites'

const get = (payload) => ({
  type: GET_FAVORITE_RESTAURANTS,
  payload,
});

const getAll = (payload) => ({
  type: GET_ALL_FAVORITES,
  payload
});

const favorite = (payload) => ({
  type: POST_FAVORITE_RESTAURANT,
  payload
});

const removeFavorite = (payload) => ({
  type: REMOVE_FAVORITE_RESTAURANT,
  payload
});

// const destroyAllFavorites = (payload) => ({
//   type: DESTROY_ALL_FAVORITES,
//   payload
// });

export const getFavoritesThunk = (userId, id) => async dispatch => {

  const response = await fetch(`/api/restaurants/favorites/${userId}/${id}`)
  if (response.ok) {
    const data = await response.json();
    dispatch(get(data))
    return data
  } else {
    return 'You had a bad response'
  }
}

export const getAllFavoritesThunk = (userId) => async dispatch => {
  const response = await fetch(`/api/restaurants/favorites/${userId}`)
  if (response.ok) {
    const data = await response.json();
    dispatch(getAll(data.favorites));
    return data;
  } else {
    return 'Bad request'
  }
}

export const setFavoriteThunk = (payload) => async dispatch => {
  const res = await fetch('/api/restaurants/favorites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(favorite(data));
    return data;
  };
};

export const removeFavoriteThunk = (payload) => async dispatch => {
  const { user_id, restaurant_id } = payload
  const res = await fetch(`/api/restaurants/${user_id}/${restaurant_id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(removeFavorite(data));
    return data;
  };
};

// export const destroyAllFavoritesThunk = (restaurantId) => async dispatch => {
//   const res = await fetch(`/api/restaurants/favorites/${restaurantId}`, {
//     method: 'DELETE',
//     headers: { 'Content-Type': 'application/json' },
//   });
//   if (res.ok) {
//     const data = await res.json();
//     console.log(data);
//     dispatch(destroyAllFavorites(data));
//     return data;
//   }
// }

const favoriteReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_FAVORITE_RESTAURANTS:
      newState={}
      if (action.payload["message"]) {
        return newState

      }
      newState[action.payload.restaurant_id] = action.payload
      return newState;

    case GET_ALL_FAVORITES:
      newState = {}
      action.payload.forEach(favorite => {
        newState[favorite.id] = favorite
      });
      return newState;

    case POST_FAVORITE_RESTAURANT:
      newState[action.payload.restaurant_id] = action.payload;
      return newState;

    case REMOVE_FAVORITE_RESTAURANT:
      delete newState[action.payload.restaurant_id];
      return newState;

    // case DESTROY_ALL_FAVORITES:
    //   newState = { ...state };
    //   delete newState[action.payload.restaurant_id];
    //   return newState;
    default:
      return state;
  };
};

export default favoriteReducer;
