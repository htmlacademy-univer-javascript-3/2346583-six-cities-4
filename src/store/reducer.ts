import { NameSpace } from '../const';
import { combineReducers } from '@reduxjs/toolkit';
import { userData } from './slices/user';
import { fewOffersData } from './slices/few-offers/few-offers-data';
import { singleOfferData } from './slices/single-offer';
import { nearbyOffersData } from './slices/near-offers';
import { reviewsData } from './slices/review';
import { favoritesData } from './slices/favorites';
import { globalState } from './slices/global';

export const reducer = combineReducers({
  [NameSpace.App]: globalState.reducer,
  [NameSpace.User]: userData.reducer,
  [NameSpace.FewOffersData]: fewOffersData.reducer,
  [NameSpace.SingleOfferData]: singleOfferData.reducer,
  [NameSpace.favoritesData]: favoritesData.reducer,
  [NameSpace.NearbyOffersData]: nearbyOffersData.reducer,
  [NameSpace.ReviewsData]: reviewsData.reducer
});
