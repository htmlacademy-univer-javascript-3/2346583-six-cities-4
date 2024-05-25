import { createAction } from '@reduxjs/toolkit';
import { NameSpace, ROUTES } from '../const';

export const REDIRECT_TO_ROUTE_TYPE = `${NameSpace.App}/redirectToRoute`;

export const redirectToRoute = createAction<ROUTES>(REDIRECT_TO_ROUTE_TYPE);
