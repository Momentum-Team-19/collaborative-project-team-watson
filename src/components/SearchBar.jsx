import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

const SearchBar = ({ setSearchTerm }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    const encodedSearchTerm = encodeURIComponent(searchInput);
    setSearchTerm(encodedSearchTerm);
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <div className='searchBar'>
        <div className='iconContainer'>
          <FaSearch className='searchIcon' onClick={handleSearch} />
        </div>
        <input
          className='searchInput'
          type='text'
          name='Search'
          placeholder='Search...'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleEnter}
        ></input>
      </div>
    </>
  );
};

export default SearchBar;
