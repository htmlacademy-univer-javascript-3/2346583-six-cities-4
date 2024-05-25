import { NameSpace, LoadingStatus } from '../../../const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchReviewsAction, postReviewAction } from './api-actions';
import { ReviewType } from '../../../types/review-type';

type ReviewsData = {
  reviews: ReviewType[];
  isReviewsLoading: boolean;
  isReviewsStatusSubmitting: boolean;
  reviewsStatus: LoadingStatus;
  hasError: boolean;
};

const initialState: ReviewsData = {
  reviews: [],
  isReviewsLoading: false,
  isReviewsStatusSubmitting: false,
  reviewsStatus: LoadingStatus.Idle,
  hasError: false,
};
export const reviewsData = createSlice({
  name: NameSpace.ReviewsData,
  initialState,
  reducers: {
    setReviewsErrorStatus: (state, action: PayloadAction<LoadingStatus>) => {
      state.reviewsStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.hasError = false;
        state.isReviewsLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsLoading = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.hasError = true;
        state.isReviewsLoading = false;
      })
      .addCase(postReviewAction.pending, (state) => {
        state.reviewsStatus = LoadingStatus.Loading;
        state.isReviewsStatusSubmitting = true;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviewsStatus = LoadingStatus.Success;
        state.isReviewsStatusSubmitting = false;
        state.reviews.push(action.payload);
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.reviewsStatus = LoadingStatus.Error;
        state.isReviewsStatusSubmitting = false;
      });
  },
});

export const { setReviewsErrorStatus } = reviewsData.actions;
