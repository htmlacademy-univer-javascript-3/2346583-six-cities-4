import FrontPage from '../pages/front-page';
import {Route, Routes} from 'react-router-dom';
import LoginPage from '../pages/login-page';
import FavoritesPage from '../pages/favourites-page';
import Page404 from '../pages/page404';
import OfferPage from '../pages/offer-page';
import PrivateRoute from '../private-route/private-route';
import LoadingScreen from '../pages/loading-screen';
import { useAppDispatch, useAppSelector } from '../hooks';
import HistoryRouter from '../components/history-route';
import { browserHistory } from '../browser-history';
import { useEffect } from 'react';
import { ROUTES } from '../const';
import { fetchfavoritesAction, getAuthCheckedStatus, getAuthorizationStatus, getIsOffersLoading } from '../store';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const areOffersLoading = useAppSelector(getIsOffersLoading);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isAuthChecked) {
      dispatch(fetchfavoritesAction());
    }
  }, [dispatch, isAuthChecked]);

  if (areOffersLoading) {
    return (
      <LoadingScreen />
    );
  }
  return (areOffersLoading)
    ? <LoadingScreen /> : (
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={ROUTES.Main}>
            <Route index element={<FrontPage />} />
            <Route path={ROUTES.Login} element={<LoginPage />} />
            <Route path={ROUTES.Offer} element={<OfferPage />} />s
            <Route
              path={ROUTES.Favorites}
              element={
                <PrivateRoute authorizationStatus={authorizationStatus}>
                  <FavoritesPage />
                </PrivateRoute>
              }
            />
            <Route path={ROUTES.NotFound} element={<Page404 />} />
          </Route>
        </Routes>
      </HistoryRouter>
    );
}

export default App;
