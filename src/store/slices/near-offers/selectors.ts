import { NameSpace } from '../../../const';
import { OfferType } from '../../../types/offer-type';
import { State } from '../../../types/state';

export const getNearbyOffers = (state: State): OfferType[] =>
  state[NameSpace.NearbyOffersData].nearby;

export const getIsNearbyOffersLoading = (state: State): boolean =>
  state[NameSpace.NearbyOffersData].isNearbyOffersLoading;
