import { NameSpace, SORT_TYPES } from '../../../const';
import { CityType } from '../../../types/city-type';
import { State } from '../../../types/state';

export const getSelectedSortType = (state: State): SORT_TYPES =>
  state[NameSpace.App].selectedSortType;

export const getSelectedCity = (state: State): CityType =>
  state[NameSpace.App].selectedCity;
