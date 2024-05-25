import { AuthorizationStatus, NameSpace } from '../../../const';
import { State } from '../../../types/state';
import { UserDataType } from '../../../types/user-data';

export const getAuthCheckedStatus = (state: State): boolean =>
  state[NameSpace.User].authorizationStatus === AuthorizationStatus.Auth;

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.User].authorizationStatus;

export const getUserInfo = (state: State): UserDataType | null =>
  state[NameSpace.User].userInfo;

export const getIsSubmittingLogin = (state: State): boolean =>
  state[NameSpace.User].isSubmittingLogin;
