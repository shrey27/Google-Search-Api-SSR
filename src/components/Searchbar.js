import React , { useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, getHotel, clearData } from '../redux/store';

export const useDebounce = (func, delay) => {
  const dispatch = useDispatch()
  const timerId = useRef(null);

  const debouncedFunc = useCallback(
    (search) => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
      timerId.current = setTimeout(() => {
        if(search) {
            dispatch(fetchData(search))
        }
        else{
            dispatch(clearData());
        }
      }, delay);
    },
    [func, delay]
  );

  return debouncedFunc;
};

export default function App() {
  const dispatch = useDispatch()
  const [search, setSearch] = useState("");
  const { locations, hotels } = useSelector(state => state.hotels)
  const debounced = useDebounce(fetchData, 0);

  const handleChange = useCallback(
    (e) => {
      setSearch(e.target.value);
      debounced(e.target.value)
    },
    [debounced]
  );

  return (
    <div className="search-box">
      <input type="text" onChange={handleChange} value={search} className="search-input" />
      <div className="search-options">
        {locations.length > 0 && <h3>Cities</h3>}
        <div>{locations.map(item => {
                return <div className="search-option">{item}</div>
            })}</div>
        {hotels.length > 0 && <h3>Hotels</h3>}
        <div>{hotels.map(item => {
                return <div 
                    key={item.hotelID} 
                    onClick={() => dispatch(getHotel(item.hotelID))} 
                    className="search-option">
                    {`${item.title}, ${item.address}`}
                </div>
            })}
        </div>
      </div>
    </div>
  );
}
