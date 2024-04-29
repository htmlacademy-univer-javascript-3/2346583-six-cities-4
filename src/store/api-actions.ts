import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { OfferType } from '../types/offer-type';
import { setOffers, setOffersLoadingState } from './action';
import { APIRoute } from '../const';


type ThunkArgs = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

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
