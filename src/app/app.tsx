import FrontPage from '../pages/front/front-page';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import LoginPage from '../pages/login/login-page';
import FavouritesPage from '../pages/favourites/favourites-page';
import Page404 from '../pages/page404/page404';
import OfferPage from '../pages/offer/offer-page';
import { AuthorizationStatus } from '../const';
import PrivateRoute from '../private-route/private-route';
import { OfferType } from '../types/offer-type';
import { mockFavoutites } from '../mock/offers';

type AppProps = {
  offers: OfferType[];
};

function App({offers}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<FrontPage offers={offers}/>} />
          <Route path="login" element={<LoginPage />} />
          <Route path="favourites" element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.VALID}>
              <FavouritesPage offers = {mockFavoutites} />
            </PrivateRoute>
          }
          />
          <Route path="offer/:id" element={<OfferPage offers={offers} />} />
        </Route>
        <Route path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
