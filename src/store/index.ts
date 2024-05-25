export { store } from './store';

export {
  fetchOfferAction,
  updateSingleOffer,
  getOffer,
  getIsOfferLoading,
} from './slices/single-offer';

export {
  fetchReviewsAction,
  postReviewAction,
  setReviewsErrorStatus,
  getReviewsHasError,
  getHasError,
  getReviews,
  getIsReviewsLoading,
  getIsReviewsStatusSubmitting,
} from './slices/review';

export {
  fetchNearbyAction,
  updateFewNearby,
  getNearbyOffers,
  getIsNearbyOffersLoading,
} from './slices/near-offers';

export {
  fetchfavoritesAction,
  changefavoriteStatusAction,
  updateFewFavorites,
  getFavorites,
  getIsFavoriteStatusSubmitting,
  getFavoritesCount,
  getAreFavoritesLoading,
} from './slices/favorites';

export {
  changeSortingType,
  changeCity,
  getSelectedSortType,
  getSelectedCity,
} from './slices/global';

export {
  fetchOffersAction,
  updateFewOffers,
  getOffers,
  getIsOffersLoading,
} from './slices/few-offers';

export {
  checkAuthAction,
  loginAction,
  logoutAction,
  getIsSubmittingLogin,
  getAuthCheckedStatus,
  getUserInfo,
  getAuthorizationStatus,
} from './slices/user';
