import { NameSpace } from '../../../const';
import { OfferType } from '../../../types/offer-type';
import { State } from '../../../types/state';

export const getFavorites = (state: State): OfferType[] =>
  state[NameSpace.favoritesData].favorites;

export const getFavoritesCount = (state: State): number =>
  state[NameSpace.favoritesData].favorites.length;

export const getAreFavoritesLoading = (state: State): boolean =>
  state[NameSpace.favoritesData].isFavoritesLoading;

export const getIsFavoriteStatusSubmitting = (state: State): boolean =>
  state[NameSpace.favoritesData].isFavoriteStatusSubmitting;
