import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SearchRestaurantsThunk } from '../../store/restaurant'

const Search = () => {
  const dispatch = useDispatch()
  const [enhancedSearch, setEnhancedSearch] = useState([])
  const [keystroke, setKeystroke] = useState('');

  const cleanup = () => {
    setEnhancedSearch([])
  }

  return (
    <>
      <input
        className='restaurantSearch'
        type='text'
        value={keystroke}
        placeholder="Search your favorite restaurant or cuisine"
        onChange={async (e) => {
          setKeystroke(e.target.value)
          const res = await dispatch(SearchRestaurantsThunk(e.target.value))
          if (res) {
            setEnhancedSearch(res.restaurants)
          } else {
            cleanup()
          }
        }} />
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
