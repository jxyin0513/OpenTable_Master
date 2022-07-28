import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SearchRestaurantsThunk } from '../../store/restaurant'
// import SearchResults from './SearchResults';

const Search = () => {
  const dispatch = useDispatch()

  const [search, setSearch] = useState('');
  const [resultsFound, setResultsFound] = useState(false);
  const [results, setResults] = useState([])
  const [enhancedSearch, setEnhancedSearch] = useState([])
  const [keystroke, setKeystroke] = useState('');

  const cleanup = () => {
    setEnhancedSearch([])
  }

  const searchQuery = async (e) => {
    e.preventDefault();
    const res = await dispatch(SearchRestaurantsThunk(search));
    // console.log("RES:: ", res.restaurants);
    if (res) {
      setResultsFound(true);
      setResults(res.restaurants)
    } else {
      return <h3>0 Results Found</h3>
    }
  }

  return (
    <>
      {resultsFound && (
        <div className='results_container'>
          <h3>{results.length} results found.</h3>
          {results.map(result => (
            <div key={result.id} className='results_container'>
              <Link to={`/restaurants/${result.id}`}>{result.name}</Link>
              <p>{result.hours}</p>
              <p>{result.street}</p>
              <p>{result.phone}</p>
            </div>
          ))}
        </div>
      )}
      {/* <input type='text'
        value={search}
        onChange={e => setSearch(e.target.value)} />
      <button onClick={searchQuery}>Search</button> */}

      <input
        className='restaurantSearch'
        type='text'
        value={keystroke}
        placeholder="Search your favorite restaurant or cuisine"
        onChange={async (e) => {
          setKeystroke(e.target.value)
          const res = await dispatch(SearchRestaurantsThunk(e.target.value))
          if (res) {
            console.log("RES:: ", res)
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
