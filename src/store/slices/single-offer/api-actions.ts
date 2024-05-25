import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, ROUTES, NameSpace } from '../../../const';
import { redirectToRoute } from '../../action';
import { AppDispatch, State } from '../../../types/state';
import { AxiosInstance } from 'axios';
import { FullOfferType } from '../../../types/offer-type';

export const fetchOfferAction = createAsyncThunk<
FullOfferType | null,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${NameSpace.SingleOfferData}/fetchOffer`,
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<FullOfferType>(`${APIRoute.Offers}/${id}`);
      return data;
    } catch (e) {
      dispatch(redirectToRoute(ROUTES.NotFound));
      return null;
    }
  }
);
