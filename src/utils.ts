import { SORT_TYPES } from './const';
import { OfferType } from './types/offer-type';

export const sortOffers = (
  offers: OfferType[],
  sortType: string
): OfferType[] => {
  const sortedOffers = [...offers];
  switch (sortType) {
    case SORT_TYPES.Popular: {
      return sortedOffers;
    }
    case SORT_TYPES.LowToHigh:
      return sortedOffers.sort((offerA, offerB) => offerA.price - offerB.price);
    case SORT_TYPES.HighToLow:
      return sortedOffers.sort((offerA, offerB) => offerB.price - offerA.price);
    case SORT_TYPES.TopRatedFirst:
      return sortedOffers.sort((offerA, offerB) => offerB.rating - offerA.rating);
    default:
      throw new Error('Unknown sort type');
  }
};

export const formatRating = (rate: number) => `${(rate / 5) * 100}%`;
