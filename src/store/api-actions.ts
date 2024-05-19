import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { OfferType } from '../types/offer-type';
import { setAuthorizationStatus, setError, setOffers, setOffersLoadingState } from './action';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { store } from '.';
import { AuthData, UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';


type ThunkArgs = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const clearErrorAction = createAsyncThunk(
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

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }
>(
  'checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(setAuthorizationStatus(AuthorizationStatus.VALID));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.INVALID));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }
>(
  'login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.VALID));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
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
  },
);
