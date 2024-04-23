import {createReducer} from '@reduxjs/toolkit';
import { changeCity, changeSelectedOffer, changeSelectedOfferNearby, getOffers, setSelectedOffer, setSortType } from './action';
import { mockNearby, mockOffers } from '../mock/offers';
import { CITIES, SORT_TYPES } from '../const';
import { CityType } from '../types/city-type';
import { OfferType } from '../types/offer-type';

type StateType = {
  city: CityType;
  offers: OfferType[];
  offersNearby: OfferType[];
  selectedOffer: OfferType | undefined;
  selectedSortType: string;
}

const initialState: StateType = {
  city: CITIES[0],
  offers: mockOffers,
  offersNearby: mockNearby,
  selectedOffer: undefined,
  selectedSortType: SORT_TYPES.Popular
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(getOffers, (state) => {
      state.offers = mockOffers;
    })
    .addCase(setSelectedOffer, (state, action) => {
      state.selectedOffer = action.payload;
    })
    .addCase(setSortType, (state, action) => {
      state.selectedSortType = action.payload;
    });
});

export {reducer};
