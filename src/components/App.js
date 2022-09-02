import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import SearchBar from "./Locationinput";
import Hotel from "./Hotel";
import { fetchHotels } from "../redux/store";

export default function App() {
  const dispatch = useDispatch();
  const { isFetching, hotelsList, error } = useSelector((state) => state.hotels);

  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  return (
    <div>
      {/* <SearchBar /> */}
      {
        isFetching ? <h3>Fetching details...!!</h3> :
          (error ? <h3>{error}</h3> : 
            <ul>
              {hotelsList.map((item) => {
                return <Hotel key={item.hotelID} {...item}/>
              })}
            </ul>
          )
      }
    </div>
  );
}
