import { FullOfferType, OfferType } from './offer-type';
import { ReviewType } from './review-type';

export type OfferPageDataType = {
  fullOffer: FullOfferType | undefined;
  nearestOffers: OfferType[];
  reviews: ReviewType[];
}

export type CommentFormDataType = {
  comment: string;
  rating: number;
};
