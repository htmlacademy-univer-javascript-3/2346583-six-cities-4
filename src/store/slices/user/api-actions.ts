import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, NameSpace } from '../../../const';
import { dropToken, saveToken } from '../../../services/token';
import { fetchOffersAction } from '../few-offers';
import { AppDispatch, State } from '../../../types/state';
import { AxiosInstance } from 'axios';
import { AuthData, UserDataType } from '../../../types/user-data';

export const checkAuthAction = createAsyncThunk<
  UserDataType,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${NameSpace.User}/checkAuth`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserDataType>(APIRoute.Login);
    return data;
  });

export const loginAction = createAsyncThunk<
  UserDataType,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${NameSpace.User}/login`,
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserDataType>(APIRoute.Login, {
      email,
      password,
    });
    dispatch(fetchOffersAction());
    saveToken(data.token);
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined,
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  `${NameSpace.User}/logout`,
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dispatch(fetchOffersAction());
    dropToken();
  }
);
