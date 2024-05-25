import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, NameSpace } from '../../../const';
import { AppDispatch, State } from '../../../types/state';
import { AxiosInstance } from 'axios';
import { OfferType } from '../../../types/offer-type';


export const fetchNearbyAction = createAsyncThunk<
  OfferType[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${NameSpace.NearbyOffersData}/fetchNearby`,
  async (id, { extra: api }) => {
    const { data } = await api.get<OfferType[]>(
      `${APIRoute.Offers}/${id}${APIRoute.Nearby}`
    );
    return data;
  });
