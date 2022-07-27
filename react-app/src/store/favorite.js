const GET_FAVORITE_RESTAURANTS = 'get/favoriteRestaurants'
const POST_FAVORITE_RESTAURANT = 'post/favoriteRestaurant'
const REMOVE_FAVORITE_RESTAURANT = 'delete/favoriteRestaurant'

const get = (payload) => ({
  type: GET_FAVORITE_RESTAURANTS,
  payload,
})

const favorite = (payload) => ({
  type: POST_FAVORITE_RESTAURANT,
  payload
});

const removeFavorite = (payload) => ({
  type: REMOVE_FAVORITE_RESTAURANT,
  payload
});

export const getFavoritesThunk = (userId, id) => async dispatch => {

  const response = await fetch(`/api/restaurants/favorites/${userId}/${id}`)
  console.log('you hit the getFavoriteThunk')
  if (response.ok) {
    const data = await response.json();
    console.log(data)
    dispatch(get(data))
    return data
  } else {
    return 'You had a bad response'
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
  console.log(payload)
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

const favoriteReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_FAVORITE_RESTAURANTS:
      // action.payload.forEach(favorite =>
      //   newState[favorite.restaurants] = favorite
      // )
      newState[action.payload.restaurant_id] = action.payload

      console.log(newState, 'in GET_FAVORITE_RESTAURANTS in reducer')
      return newState;

    case POST_FAVORITE_RESTAURANT:
      newState[action.payload.restaurant_id] = action.payload;
      return newState;

    case REMOVE_FAVORITE_RESTAURANT:
      delete newState[action.payload.restaurant_id];
      return newState;

    default:
      return state;
  };
};

export default favoriteReducer;
