import {createReducer} from '@reduxjs/toolkit';
import { addReview, changeCity, clearOfferPageData, loadOfferPageData, setAuthorizationStatus, setUser, setError, setOffers, setOffersLoadingState, setSelectedOffer, setSortType, setSelectedOfferLoadingState, setFavourites, setFavouritesLoadingState } from './action';
import { AuthorizationStatus, CITIES, SORT_TYPES } from '../const';
import { CityType } from '../types/city-type';
import { OfferType } from '../types/offer-type';
import { OfferPageDataType } from '../types/offer-page-data-type';
import { UserDataType } from '../types/user-data';

type StateType = {
  city: CityType;
  selectedSortType: string;

  offers: OfferType[];
  offersLoadingState: boolean;

  favourites: OfferType[];
  favouritesLoadingState: boolean;
  favouritesNumber: number;

  selectedOffer: OfferType | undefined;
  selectedOfferLoadingState: boolean;

  authorizationStatus: AuthorizationStatus;
  user: UserDataType| undefined;
  error: string | null;

  offerPageData: OfferPageDataType;
}

const initialState: StateType = {
  city: CITIES.Paris,
  selectedSortType: SORT_TYPES.Popular,

  offers: [],
  offersLoadingState: false,

  favourites: [],
  favouritesLoadingState: false,
  favouritesNumber: 0,

  selectedOffer: undefined,
  selectedOfferLoadingState: true,

  authorizationStatus: AuthorizationStatus.Unknown,
  user: undefined,
  error: null,

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
    .addCase(setSortType, (state, action) => {
      state.selectedSortType = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingState, (state, action) => {
      state.offersLoadingState = action.payload;
    })
    .addCase(setFavourites, (state, action) => {
      state.favourites = action.payload;
      state.favouritesNumber = action.payload.length;
    })
    .addCase(setFavouritesLoadingState, (state, action) => {
      state.favouritesLoadingState = action.payload;
    })
    .addCase(setSelectedOffer, (state, action) => {
      state.selectedOffer = action.payload;
    })
    .addCase(setSelectedOfferLoadingState, (state, action) => {
      state.selectedOfferLoadingState = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
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
