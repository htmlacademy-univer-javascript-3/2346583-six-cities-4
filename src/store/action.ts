import {createAction} from '@reduxjs/toolkit';
import { CityType } from '../types/city-type';
import { OfferType } from '../types/offer-type';
import { AuthorizationStatus } from '../const';

export const changeCity = createAction('changeCity', (City: CityType) => ({payload: City}));
export const setOffers = createAction('setOffers', (Offers: OfferType[]) => ({payload: Offers}));
export const setSelectedOffer = createAction('selectOffer', (offer: OfferType | undefined) => ({payload: offer}));
export const setSortType = createAction('setSortType', (sortType: string) => ({payload: sortType}));
export const setOffersLoadingState = createAction('setOffersLoadingState', (state: boolean) => ({payload: state}));
export const setError = createAction('setError', (message: string | null) => ({payload: message}));
export const setAuthorizationStatus = createAction('setAuthorizationStatus', (status: AuthorizationStatus) => ({payload: status}));
