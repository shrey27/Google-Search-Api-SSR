import React from 'react';

export default function Hotel(props) {
    const { title, address, description } = props;  
    return (
      <div className='hotel'>
        <h2 data-testid='hotel-title'>{title}</h2>
        <h2 data-testid='hotel-address'>{address}</h2>
        <p data-testid='hotel-description'>{description}</p>
      </div>
    );
  }