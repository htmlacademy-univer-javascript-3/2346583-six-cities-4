import { NameSpace, SortTypes } from '../../../const';
import { CityType } from '../../../types/city-type';
import { State } from '../../../types/state';

export const getSelectedSortType = (state: State): SortTypes =>
  state[NameSpace.App].selectedSortType;

export const getSelectedCity = (state: State): CityType =>
  state[NameSpace.App].selectedCity;
