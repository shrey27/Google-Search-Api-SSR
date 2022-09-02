import React from 'react';

export default function Hotel(props) {
    const { title, address, description } = props;  
    return (
      <div className='hotel'>
        <h2>{title}</h2>
        <h2>{address}</h2>
        <p>{description}</p>
      </div>
    );
  }