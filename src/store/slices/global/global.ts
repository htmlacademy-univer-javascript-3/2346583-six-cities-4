import { CITIES, NameSpace, SORT_TYPES } from '../../../const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityType } from '../../../types/city-type';


type GlobalState = {
  selectedCity: CityType;
  selectedSortType: SORT_TYPES;
};

const initialState: GlobalState = {
  selectedCity: CITIES.Paris,
  selectedSortType: SORT_TYPES.Popular,
};

export const globalState = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<CityType>) => {
      state.selectedCity = action.payload;
    },
    changeSortingType: (state, action: PayloadAction<SORT_TYPES>) => {
      state.selectedSortType = action.payload;
    },
  },
});

export const { changeCity, changeSortingType } = globalState.actions;
