import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SearchRestaurantsThunk } from '../../store/restaurant'
import SearchResults from './SearchResults';

const Search = () => {
  const dispatch = useDispatch()

  const [search, setSearch] = useState('');

  const searchQuery = async (e) => {
    e.preventDefault();
    const res = await dispatch(SearchRestaurantsThunk(search));
    console.log("RES:: ", res);
    if (res) {
      return (
        <SearchResults restaurants={res} />
      )
    }
  }

  return (
    <>
      <input type='text'
        value={search}
        onChange={e => setSearch(e.target.value)} />
      <button onClick={searchQuery}>Search</button>
    </>
  )
};

export default Search;
