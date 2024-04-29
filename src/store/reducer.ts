import {createReducer} from '@reduxjs/toolkit';
import { changeCity, setOffers, setOffersLoadingState, setSelectedOffer, setSortType } from './action';
import { mockNearby} from '../mock/offers';
import { CITIES, SORT_TYPES } from '../const';
import { CityType } from '../types/city-type';
import { OfferType } from '../types/offer-type';

type StateType = {
  city: CityType;
  offers: OfferType[];
  offersNearby: OfferType[];
  selectedOffer: OfferType | undefined;
  selectedSortType: string;
  offersLoadingState: boolean;
}

const initialState: StateType = {
  city: CITIES[0],
  offers: [],
  offersNearby: mockNearby,
  selectedOffer: undefined,
  selectedSortType: SORT_TYPES.Popular,
  offersLoadingState: false
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setSelectedOffer, (state, action) => {
      state.selectedOffer = action.payload;
    })
    .addCase(setSortType, (state, action) => {
      state.selectedSortType = action.payload;
    })
    .addCase(setOffersLoadingState, (state, action) => {
      state.offersLoadingState = action.payload;
    });
});

export {reducer};
