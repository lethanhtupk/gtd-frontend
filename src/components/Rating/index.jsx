import React from 'react';
import { Star } from '../Icons';

const Rating = ({ rate }) => {
  return (
    <div className="flex flex-row">
      <Star isEmpty={rate < 1} />
      <Star isEmpty={rate < 2} />
      <Star isEmpty={rate < 3} />
      <Star isEmpty={rate < 4} />
      <Star isEmpty={rate < 5} />
    </div>
  );
};

export default Rating;
