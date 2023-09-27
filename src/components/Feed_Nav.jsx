import react from 'react';

const Feed_Nav = ({ itemsPerPage, setItemsPerPage, filter, setFilter }) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <div className='feed-nav'>
        <select
          id='filterbox'
          value={filter}
          onChange={handleFilterChange}
          className='filter-box'
        >
          <option value='default'>Default</option>
          <option value='date'>Date</option>
          <option value='votes'>Votes</option>
        </select>
        <input
          className='number-per-page-input'
          id='userinput'
          type='number'
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          min='1'
          max='20'
        />
      </div>
    </>
  );
};

export default Feed_Nav;
