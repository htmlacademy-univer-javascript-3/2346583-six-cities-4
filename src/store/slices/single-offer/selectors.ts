import { NameSpace } from '../../../const';
import { FullOfferType } from '../../../types/offer-type';
import { State } from '../../../types/state';

export const getOffer = (state: State): FullOfferType | null =>
  state[NameSpace.SingleOfferData].offer;

export const getIsOfferLoading = (state: State): boolean =>
  state[NameSpace.SingleOfferData].isOfferLoading;
