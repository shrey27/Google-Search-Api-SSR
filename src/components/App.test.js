import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from "react-dom/test-utils";
import axios from 'axios';
import { Provider } from 'react-redux'
import createStoreFromState, { fetchData, getHotel } from "../redux/store";
import App from './App';

const sampledata = {
    locations: ['New Delhi'],
    hotels: [
        {
            title: "FabHotel The Pearl",
            address:"Gurugram, India",
            hotelID: "ht456a001",
            description: "FabHotel The Pearl is one of the preferred budget hotels in Gurgaon"
        }
    ]
}

const sampleOutput = {
    "hotels": {
        "error": "", 
        "hotel": null, 
        "isFetching": false, 
        "locations": ["New Delhi"],
        "hotels": [
            {
                "address": "Gurugram, India", 
                "description": "FabHotel The Pearl is one of the preferred budget hotels in Gurgaon", 
                "hotelID": "ht456a001", 
                "title": "FabHotel The Pearl"}],
            }
}  

const selectedOption = {
    hotels: {
      isFetching: false,
      locations: [],
      hotels: [],
      hotel: {
        title: 'FabHotel The Pearl',
        address: 'Gurugram, India',
        hotelID: 'ht456a001',
        description: 'FabHotel The Pearl is one of the preferred budget hotels in Gurgaon'
      },
      error: ''
    }
  }

let postSpy;
let store;

beforeEach(() => {
    postSpy = jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: sampledata });
    store = createStoreFromState();
    render(<Provider store={store}><App/></Provider>);
})

describe('Google Search API Unit Testing', () => {
    test('For input field', async() => {
        const inputEl = screen.getByTestId("search-input");
        expect(inputEl).toBeInTheDocument();
    })

    test('For redux states to be updated post thunk action call', async() => {
        await act(() => {
            store.dispatch(fetchData("new"));
        });
        expect(postSpy).toBeCalledWith('https://hotels-api.shrey27.repl.co/hotels', {input: "new"});
        const state = store.getState();
        expect(state).toEqual(sampleOutput);
    })

    test('For suggestions based on a keyword to be visible on UI', async() => {
        await act(() => {
            store.dispatch(fetchData("new"));
        });
        let option = screen.getByText("FabHotel The Pearl, Gurugram, India")
        expect(option).toBeInTheDocument();
    })

    test('For Selected option state to be updated', async() => {
        await act(() => {
            store.dispatch(fetchData("new"));
        });        
        let searchOption = screen.getByTestId("search-option");
        userEvent.click(searchOption);
        store.dispatch(getHotel("ht456a001"));

        let state = store.getState();
        expect(state).toEqual(selectedOption);

        render(<Provider store={store}><App/></Provider>)
        expect(screen.getByTestId("hotel-title")).toBeInTheDocument();
        expect(screen.getByTestId("hotel-address")).toBeInTheDocument();
        expect(screen.getByTestId("hotel-description")).toBeInTheDocument();
    })
})