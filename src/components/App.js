import React from "react";
import { useSelector } from "react-redux";
import Hotel from "./Hotel";
import Searchbar from './Searchbar';

export default function App() {
  const { hotel, error } = useSelector((state) => state.hotels);

  return (
    <>
      <Searchbar />
      {error && <h3>{error}</h3>}
      {hotel && <Hotel {...hotel} />}
    </>
  );
}
