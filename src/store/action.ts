import {createAction} from '@reduxjs/toolkit';
import { CityType } from '../types/city-type';
import { OfferType } from '../types/offer-type';

export const changeCity = createAction('changeCity', (City: CityType) => ({payload: City}));
export const getOffers = createAction('getOffers', (Offers: OfferType[]) => ({payload: Offers}));
export const changeSelectedOffer = createAction('changeSelectedOffer', (Offer: OfferType | undefined) => ({payload: Offer}));
export const changeSelectedOfferNearby = createAction('changeSelectedOfferNearby', (Offer: OfferType | undefined) => ({payload: Offer}));
