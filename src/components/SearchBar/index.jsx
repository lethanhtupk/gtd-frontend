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
        state: { search: searchPattern, page: 1 },
      };
      props.history.push(location);
      setSearchPattern('');
      props.setOpenNavigation(false);
    }
    return null;
  };

  const onSubmit = () => {
    const location = {
      pathname: ROUTES.SEARCH_RESULT,
      state: { search: searchPattern, page: 1 },
    };
    props.history.push(location);
    setSearchPattern('');
    props.setOpenNavigation(false);
  };

  const onChangeValue = (e) => {
    setSearchPattern(e.target.value);
  };

  return (
    <section className="relative flex flex-row justify-between px-4 py-2 search-bar md:px-0 md:py-0">
      <div className="absolute inset-y-0 flex items-center pl-2 text-gray-400 lef-0">
        <SearchIcon />
      </div>
      <input
        type="text"
        placeholder="Search directly on Tiki"
        value={searchPattern}
        onChange={onChangeValue}
        onKeyPress={handleKeyPress}
        className="w-3/4 px-10 py-2 text-white bg-gray-900 rounded-lg md:w-auto focus:outline-none focus:bg-white focus:text-gray-900"
      />
      <button
        type="submit"
        onClick={onSubmit}
        className="px-4 py-2 text-white bg-gray-500 rounded-lg md:hidden border-lg focus:outline-none hover:bg-gray-400"
      >
        Search
      </button>
    </section>
  );
};

export default withRouter(SearchBar);
