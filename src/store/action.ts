import {createAction} from '@reduxjs/toolkit';
import { CityType } from '../types/city-type';
import { OfferType } from '../types/offer-type';

export const changeCity = createAction('changeCity', (City: CityType) => ({payload: City}));
export const getOffers = createAction('getOffers', (Offers: OfferType[]) => ({payload: Offers}));
export const setSelectedOffer = createAction('selectOffer', (offer: OfferType | undefined) => ({payload: offer}));
export const setSortType = createAction('setSortType',(sortType: string) => ({payload: sortType}));
