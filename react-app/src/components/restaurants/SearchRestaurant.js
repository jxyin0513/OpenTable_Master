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
          <Link to={`/restaurants/${result.id}`}><div key={result.id} className='individual-result'>
            {result.name}
          </div></Link>
        ))}
      </div>
    </>
  )
};

export default Search;
