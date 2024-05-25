import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, NameSpace } from '../../../const';
import { AppDispatch, State } from '../../../types/state';
import { AxiosInstance } from 'axios';
import { ReviewType } from '../../../types/review-type';
import { ReviewData } from '../../../types/review-data-type';

export const fetchReviewsAction = createAsyncThunk<
  ReviewType[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(`${NameSpace.ReviewsData}/fetchReviews`, async (id, { extra: api }) => {
  const { data } = await api.get<ReviewType[]>(`${APIRoute.Comments}/${id}`);
  return data;
});

export const postReviewAction = createAsyncThunk<
  ReviewType,
  ReviewData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${NameSpace.ReviewsData}/postReview`,
  async ({ comment, rating, offerId }, { extra: api }) => {
    const { data } = await api.post<ReviewType>(`${APIRoute.Comments}/${offerId}`, {
      comment,
      rating,
    });
    return data;
  }
);
