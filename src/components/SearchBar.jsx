import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ searchInput, setSearchInput }) => {
  return (
    <>
      <div className='searchBar'>
        <div className='iconContainer'>
          <FaSearch className='searchIcon' />
        </div>
        <input
          className='searchInput'
          type='text'
          name='Search'
          placeholder='Search...'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        ></input>
      </div>
    </>
  );
};

export default SearchBar;
