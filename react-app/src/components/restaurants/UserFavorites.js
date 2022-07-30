import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllFavoritesThunk, removeFavoriteThunk } from '../../store/favorite';
import { Link } from 'react-router-dom';

const UserFavorites = () => {
  const dispatch = useDispatch();

  const userId = useSelector(state => state.session.user.id);
  const favorites = useSelector(state => Object.values(state.favorites))

  //Grab a user's favorites
  useEffect(() => {
    dispatch(getAllFavoritesThunk(userId))
  }, [dispatch, userId]);

  return (
    <>
      <div className='userFavoritesHeader'>
        <h3>Your Favorites</h3>
      </div>
      <div className='user-favorites-container'>
        <div className='userFavoritesCardWrapper'>
          {favorites.map(favorite => (
            <div key={favorite.id} className='user-favorite-card'>
              <Link to={`/restaurants/${favorite.id}`}>{favorite.name}</Link>
              <p>{favorite.phone}</p>
              <p>{favorite.cuisine}</p>
              <p>{favorite.hours}</p>
              <p>{'$'.repeat(favorite.price_point)}</p>
              <button className="remove-fav" onClick={async () => {
                const fav = {
                  user_id: userId,
                  restaurant_id: favorite.id
                }
                await dispatch(removeFavoriteThunk(fav))
              }}>Remove From Favorites</button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
};

export default UserFavorites;
