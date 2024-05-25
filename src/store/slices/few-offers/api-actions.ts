import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, NameSpace } from '../../../const';
import { AppDispatch, State } from '../../../types/state';
import { AxiosInstance } from 'axios';
import { OfferType } from '../../../types/offer-type';


export const fetchOffersAction = createAsyncThunk<
  OfferType[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${NameSpace.FewOffersData}/fetchOffers`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferType[]>(APIRoute.Offers);
    return data;
  }
);
