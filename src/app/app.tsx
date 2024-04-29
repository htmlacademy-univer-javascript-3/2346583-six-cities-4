import FrontPage from '../pages/front-page';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import LoginPage from '../pages/login-page';
import FavouritesPage from '../pages/favourites-page';
import Page404 from '../pages/page404';
import OfferPage from '../pages/offer-page';
import { AuthorizationStatus } from '../const';
import PrivateRoute from '../private-route/private-route';
import { mockFavoutites} from '../mock/offers';
import LoadingScreen from '../pages/loading-screen';
import { useAppSelector } from '../hooks';

function App(): JSX.Element {
  const areOffersLoading = useAppSelector((state) => state.offersLoadingState);
  if (areOffersLoading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<FrontPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="favourites" element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.VALID}>
              <FavouritesPage offers = {mockFavoutites} />
            </PrivateRoute>
          }
          />
          <Route path="offer/:id" element={<OfferPage />} />
        </Route>
        <Route path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
