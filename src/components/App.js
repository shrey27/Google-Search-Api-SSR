import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Hotel from "./Hotel";
import Searchbar from './Searchbar';

export default function App() {
  const { isFetching, hotel, error } = useSelector((state) => state.hotels);

  return (
    <div>
      <Searchbar />
      {error && <h3>{error}</h3>}
      {hotel && <Hotel {...hotel} />}
    </div>
  );
}
