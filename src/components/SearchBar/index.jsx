import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { SearchIcon } from '../Icons';
import * as ROUTES from '../../constants/routes';

const SearchBar = (props) => {
  const [searchPattern, setSearchPattern] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const location = {
        pathname: ROUTES.SEARCH_RESULT,
        state: { search: searchPattern },
      };
      console.log(location);
      props.history.replace(location);
      setSearchPattern('');
    }
    return null;
  };

  const onChangeValue = (e) => {
    setSearchPattern(e.target.value);
  };

  return (
    <section className="search-bar relative">
      <div className="absolute text-gray-400 inset-y-0 lef-0 flex items-center pl-2">
        <SearchIcon />
      </div>
      <input
        type="text"
        placeholder="Search directly on Tiki"
        value={searchPattern}
        onChange={onChangeValue}
        onKeyPress={handleKeyPress}
        className="px-10 py-2 text-white bg-gray-800 rounded-lg focus:outline-none focus:bg-white focus:text-gray-800"
      />
    </section>
  );
};

export default withRouter(SearchBar);
