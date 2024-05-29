import { SortTypes } from './const';
import { OfferType } from './types/offer-type';

export const sortOffers = (
  offers: OfferType[],
  sortType: string
): OfferType[] => {
  const sortedOffers = [...offers];
  switch (sortType) {
    case SortTypes.Popular: {
      return sortedOffers;
    }
    case SortTypes.LowToHigh:
      return sortedOffers.sort((offerA, offerB) => offerA.price - offerB.price);
    case SortTypes.HighToLow:
      return sortedOffers.sort((offerA, offerB) => offerB.price - offerA.price);
    case SortTypes.TopRatedFirst:
      return sortedOffers.sort((offerA, offerB) => offerB.rating - offerA.rating);
    default:
      throw new Error('Unknown sort type');
  }
};

export const formatRating = (rate: number) => `${(rate / 5) * 100}%`;

export const isPasswordValid = (password: string): boolean => {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return hasLetter && hasNumber;
};

export function getRandomArrayElement<T>(array: T[]) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}
