import FrontPage from '../front/front-page';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import LoginPage from '../login/login-page';
import FavouritesPage from '../favourites/favourites-page';
import Page404 from '../page404/page404';
import OfferPage from '../offer/offer-page';
import AuthorizationStatus from '../const';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  offersCount: number;
};

function App({offersCount}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<FrontPage offersCount={offersCount}/>} />
          <Route path="login" element={<LoginPage />} />
          <Route path="favourites" element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.VALID}>
              <FavouritesPage offersCount = {offersCount} />
            </PrivateRoute>
          }
          />
          <Route path="offer/:id" element={<OfferPage offers={[{id: '1', title: 'First'}, {id: '2', title: 'Second'}, {id: '3', title: 'Third'}]} />} />
        </Route>
        <Route path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
