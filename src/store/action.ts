import { createAction } from '@reduxjs/toolkit';
import { NameSpace, AppRoutes } from '../const';

export const REDIRECT_TO_ROUTE_TYPE = `${NameSpace.App}/redirectToRoute`;

export const redirectToRoute = createAction<AppRoutes>(REDIRECT_TO_ROUTE_TYPE);
