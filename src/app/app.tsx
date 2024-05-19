import FrontPage from '../pages/front-page';
import {Route, Routes} from 'react-router-dom';
import LoginPage from '../pages/login-page';
import FavouritesPage from '../pages/favourites-page';
import Page404 from '../pages/page404';
import OfferPage from '../pages/offer-page';
import { AuthorizationStatus } from '../const';
import PrivateRoute from '../private-route/private-route';
import { mockFavoutites} from '../mock/offers';
import LoadingScreen from '../pages/loading-screen';
import { useAppSelector } from '../hooks';
import HistoryRouter from '../components/history-route';
import { browserHistory } from '../browser-history';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const areOffersLoading = useAppSelector((state) => state.offersLoadingState);
  if (areOffersLoading) {
    return (
      <LoadingScreen />
    );
  }
  return (authorizationStatus === AuthorizationStatus.Unknown || areOffersLoading)
    ? <LoadingScreen /> : (
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path='/'>
            <Route index element={<FrontPage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='offer/:id' element={<OfferPage />} />
            <Route
              path='favorites'
              element={
                <PrivateRoute authorizationStatus={authorizationStatus}>
                  <FavouritesPage offers = {mockFavoutites}/>
                </PrivateRoute>
              }
            />
            <Route path='*' element={<Page404 />} />
          </Route>
        </Routes>
      </HistoryRouter>
    );
}

export default App;
