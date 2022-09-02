import React from 'react';

export default function Hotel(props) {
    const { title, address, description } = props;  
    return (
      <li>
        <h2>{title}</h2>
        <h3>{address}</h3>
        <p>{description}</p>
      </li>
    );
  }