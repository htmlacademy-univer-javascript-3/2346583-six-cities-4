import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferType } from '../../../types/offer-type';
import { NameSpace } from '../../../const';
import {
  changefavoriteStatusAction,
  fetchfavoritesAction,
} from './api-actions';
import { updateFavorites } from './utils';

type favoritesData = {
  favorites: OfferType[];
  isFavoritesLoading: boolean;
  isFavoriteStatusSubmitting: boolean;
  hasError: boolean;
};

const initialState: favoritesData = {
  favorites: [],
  isFavoritesLoading: false,
  isFavoriteStatusSubmitting: false,
  hasError: false,
};

export const favoritesData = createSlice({
  name: NameSpace.favoritesData,
  initialState,
  reducers: {
    updateFewFavorites: (state, action: PayloadAction<OfferType>) => {
      updateFavorites(state.favorites, action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchfavoritesAction.pending, (state) => {
        state.hasError = false;
        state.isFavoritesLoading = true;
      })
      .addCase(fetchfavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isFavoritesLoading = false;
      })
      .addCase(fetchfavoritesAction.rejected, (state) => {
        state.hasError = true;
        state.isFavoritesLoading = false;
      })
      .addCase(changefavoriteStatusAction.pending, (state) => {
        state.isFavoriteStatusSubmitting = true;
      })
      .addCase(changefavoriteStatusAction.fulfilled, (state) => {
        state.isFavoriteStatusSubmitting = false;
      })
      .addCase(changefavoriteStatusAction.rejected, (state) => {
        state.isFavoriteStatusSubmitting = false;
      });
  },
});

export const { updateFewFavorites } = favoritesData.actions;
