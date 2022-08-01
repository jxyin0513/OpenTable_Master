import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SearchRestaurantsThunk } from '../../store/restaurant'

const Search = () => {
  const dispatch = useDispatch()
  const [enhancedSearch, setEnhancedSearch] = useState([])
  const [keystroke, setKeystroke] = useState('');
  const allRestaurants = useSelector(state=>state.restaurants)
  const restaurants = Object.values(allRestaurants);
  let search = []
  // const cleanup = () => {
  //   setEnhancedSearch([])
  // }
  const filteredRestaurant = (e)=>{
    if(e.target.value){
      search = restaurants.filter(restaurant=>{
        if(restaurant.name.toLowerCase().startsWith(e.target.value.toLowerCase()) || restaurant.cuisine.toLowerCase().startsWith(e.target.value.toLowerCase())){
          return true;
        }
      })
    }
    console.log(search)
    setEnhancedSearch(search)
  }
  return (
    <>
      <input
        className='restaurantSearch'
        type='text'
        placeholder="Search your favorite restaurant or cuisine"
        onChange={
          filteredRestaurant
          }
          // setKeystroke(e.target.value)
          // const res = await dispatch(SearchRestaurantsThunk(e.target.value))
          // if (res) {
          //   setEnhancedSearch(res.restaurants)
          // } else {
          //   cleanup()
          // }
         />
      <div className='results-container'>
        {enhancedSearch.map(result => (
          <Link key={result.id} to={`/restaurants/${result.id}`}>
            <div className='individual-result'>
              <p className='search-name'>{result.name}</p>
              <p>{result.cuisine}</p>
              <p className='search-detail'>Street Address: {result.street} | Phone: {result.phone}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
};

export default Search;
