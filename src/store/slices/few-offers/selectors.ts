import { NameSpace } from '../../../const';
import { OfferType } from '../../../types/offer-type';
import { State } from '../../../types/state';

export const getOffers = (state: State): OfferType[] =>
  state[NameSpace.FewOffersData].offers;

export const getIsOffersLoading = (state: State): boolean =>
  state[NameSpace.FewOffersData].isOffersLoading;
