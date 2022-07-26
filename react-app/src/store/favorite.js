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

export const getFavoritesThunk = (payload) => async dispatch => {

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
