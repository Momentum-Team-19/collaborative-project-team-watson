import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

const SearchBar = ({ setSearchTerm }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleClick = () => {
    const encodedSearchTerm = encodeURIComponent(searchInput);
    setSearchTerm(encodedSearchTerm);
  };

  return (
    <>
      <div className='searchBar'>
        <div className='iconContainer'>
          <FaSearch className='searchIcon' onClick={handleClick} />
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
