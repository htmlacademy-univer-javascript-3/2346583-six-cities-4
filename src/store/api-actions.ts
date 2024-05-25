import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FullOfferType, OfferType } from '../types/offer-type';
import { addReview, loadOfferPageData, setAuthorizationStatus, setUser, setError, setFavourites, setFavouritesLoadingState, setOffers, setOffersLoadingState, setSelectedOfferLoadingState } from './action';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { store } from '.';
import { AuthData, UserDataType } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { ReviewType } from '../types/review-type';
import { CommentFormDataType } from '../types/offer-page-data-type';


type ThunkArgs = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const clearError = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR
    );
  }
);

export const loadOffers = createAsyncThunk<void, undefined, ThunkArgs>(
  'loadOffers',
  (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoadingState(true));
    api.get<OfferType[]>(APIRoute.Offers)
      .then((response) => {
        dispatch(setOffers(response.data));
      })
      .catch(() => {
        dispatch(setOffers([]));
      })
      .finally(() => {
        dispatch(setOffersLoadingState(false));
      });
  }
);

export const loadFavourites = createAsyncThunk<void, undefined, ThunkArgs>(
  'loadFavourites',
  (_arg, {dispatch, extra: api}) => {
    dispatch(setFavouritesLoadingState(true));
    api.get<OfferType[]>(APIRoute.Favoutites)
      .then((response) => {
        dispatch(setFavourites(response.data));
      })
      .catch(() => {
        dispatch(setFavourites([]));
      })
      .finally(() => {
        dispatch(setFavouritesLoadingState(false));
      });
  }
);

export const checkAuth = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }
>(
  'checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserDataType>(APIRoute.Login);
      dispatch(setAuthorizationStatus(AuthorizationStatus.VALID));
      dispatch(loadFavourites());
      dispatch(setUser(data));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.INVALID));
    }
  },
);

export const login = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }
>(
  'login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserDataType>(
      APIRoute.Login,
      {
        email,
        password
      }
    );
    saveToken(data.token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.VALID));
    dispatch(setUser(data));
  },
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }
>(
  'logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.INVALID));
    dispatch(setUser(undefined));
  },
);

export const fetchOfferPageData = createAsyncThunk<void, { id: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('fetchOfferPageData', async ({ id }, { dispatch, extra: api }) => {
  try {
    const { data: detailedOffer } = await api.get<FullOfferType>(`${APIRoute.Offers}/${id}`);
    const { data: nearestOffers } = await api.get<OfferType[]>(`${APIRoute.Offers}/${id}/nearby`);
    const { data: reviews } = await api.get<ReviewType[]>(`${APIRoute.Comments}/${id}`);
    dispatch(loadOfferPageData({ fullOffer: detailedOffer, nearestOffers, reviews }));
    dispatch(setSelectedOfferLoadingState(false));
  } catch {
    dispatch(setSelectedOfferLoadingState(false));
  }
});

export const sendComment = createAsyncThunk<void,
  {
    postId: string;
    rewiew: CommentFormDataType;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('sendComment', async ({ postId, rewiew }, { dispatch, extra: api }) => {
  const { data: review } = await api.post<ReviewType>(
    `${APIRoute.Comments}/${postId}`,
    {
      comment: rewiew.comment,
      rating: rewiew.rating,
    }
  );
  dispatch(addReview(review));
});

export const changeOfferStatus = createAsyncThunk<void,
  {
    offerId: string;
    status: number;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('changeOfferStatus', async ({ offerId, status }, { dispatch, extra: api }) => {
  await api.post<FullOfferType>(`${APIRoute.Favoutites}/${offerId}/${status}`);
  dispatch(loadFavourites());
});
