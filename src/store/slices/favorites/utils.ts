import { OfferType } from '../../../types/offer-type';

export const updateFavorites = (favorites: OfferType[], updatedOffer: OfferType) => {
  const favoriteOfferIndex = favorites.findIndex(
    (element) => element.id === updatedOffer.id
  );

  if (updatedOffer.isFavorite && favoriteOfferIndex === -1) {
    favorites.push(updatedOffer);
  } else if (!updatedOffer.isFavorite && favoriteOfferIndex !== -1) {
    favorites.splice(favoriteOfferIndex, 1);
  }
};
