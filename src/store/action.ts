import {createAction} from '@reduxjs/toolkit';
import { CityType } from '../types/city-type';
import { OfferType } from '../types/offer-type';
import { AuthorizationStatus } from '../const';
import { OfferPageDataType } from '../types/offer-page-data-type';
import { ReviewType } from '../types/review-type';
import { UserDataType } from '../types/user-data';

export const changeCity = createAction<CityType>('changeCity');
export const setSortType = createAction<string>('setSortType');

export const setOffers = createAction<OfferType[]>('setOffers');
export const setOffersLoadingState = createAction<boolean>('setOffersLoadingState');

export const setFavourites = createAction<OfferType[]>('setFavourites');
export const setFavouritesLoadingState = createAction<boolean>('setFavouritesLoadingState');
export const setFavouritesNumber = createAction<number>('setFavouritesNumber');

export const setSelectedOffer = createAction<OfferType | undefined>('selectOffer');
export const setSelectedOfferLoadingState = createAction<boolean>('setselectedOfferLoadingState');

export const setAuthorizationStatus = createAction<AuthorizationStatus>('setAuthorizationStatus');
export const setUser = createAction<UserDataType | undefined>('setUser');
export const setError = createAction<string | null>('setError');

export const loadOfferPageData = createAction<OfferPageDataType>('loadOfferPageData');
export const clearOfferPageData = createAction('clearOfferPageData');
export const addReview = createAction<ReviewType>('addReview');
