import { OfferType } from '../../../types/offer-type';


export const updateOffers = (offers: OfferType[], updatedOffer: OfferType) => {
  const offerIndex = offers.findIndex((element) => element.id === updatedOffer.id);
  if (offerIndex !== -1) {
    offers[offerIndex] = updatedOffer;
  }
};
