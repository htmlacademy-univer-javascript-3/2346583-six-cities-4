import {createReducer} from '@reduxjs/toolkit';
import { addReview, changeCity, clearOfferPageData, loadOfferPageData, setAuthorizationStatus, setError, setOffers, setOffersLoadingState, setSelectedOffer, setSortType } from './action';
import { AuthorizationStatus, CITIES, SORT_TYPES } from '../const';
import { CityType } from '../types/city-type';
import { OfferType } from '../types/offer-type';
import { OfferPageDataType } from '../types/offer-page-data-type';

type StateType = {
  city: CityType;
  offers: OfferType[];
  selectedOffer: OfferType | undefined;
  selectedSortType: string;
  offersLoadingState: boolean;
  error: string | null;
  authorizationStatus: AuthorizationStatus;
  offerPageData: OfferPageDataType;
}

const initialState: StateType = {
  city: CITIES.Paris,
  offers: [],
  selectedOffer: undefined,
  selectedSortType: SORT_TYPES.Popular,
  offersLoadingState: false,
  error: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  offerPageData: {
    fullOffer: undefined,
    nearestOffers: [],
    reviews: []
  }
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
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadOfferPageData, (state, action) => {
      state.offerPageData = action.payload;
    })
    .addCase(clearOfferPageData, (state) => {
      state.offerPageData = {
        fullOffer: undefined,
        nearestOffers: [],
        reviews: []
      };
    })
    .addCase(addReview, (state, action) => {
      state.offerPageData.reviews = [...state.offerPageData.reviews, action.payload];
    });
});

export {reducer};
