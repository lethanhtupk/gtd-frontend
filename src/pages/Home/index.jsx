import React from 'react';
import CreateWatch from '../../components/CreateWatch';

const HomePage = () => (
  <>
    <header>
      <title>GTD - Get The Deal | Home</title>
    </header>
    <div className="h-full justify-center items-center flex flex-col">
      <CreateWatch />
    </div>
  </>
);

export default HomePage;
