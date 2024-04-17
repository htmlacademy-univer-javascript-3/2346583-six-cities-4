import {createReducer} from '@reduxjs/toolkit';
import { changeCity, changeSelectedOffer, changeSelectedOfferNearby, getOffers } from './action';
import { mockNearby, mockOffers } from '../mock/offers';
import { CITIES } from '../const';
import { CityType } from '../types/city-type';
import { OfferType } from '../types/offer-type';

type StateType = {
  city: CityType;
  offers: OfferType[];
  selectedOffer: OfferType | undefined;
  offersNearby: OfferType[];
  selectedOfferNearby: OfferType | undefined;
}

const initialState: StateType = {
  city: CITIES[0],
  offers: mockOffers,
  selectedOffer: undefined,
  offersNearby: mockNearby,
  selectedOfferNearby: undefined
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    });
  builder
    .addCase(getOffers, (state) => {
      state.offers = mockOffers;
    });
  builder
    .addCase(changeSelectedOffer, (state, action) => {
      state.selectedOffer = action.payload;
    });
  builder
    .addCase(changeSelectedOfferNearby, (state, action) => {
      state.selectedOfferNearby = action.payload;
    });
});

export {reducer};
