import { Link } from 'react-router-dom';
import { OfferType } from '../../types/offer-type';
import FavoritesOffer from '../favourites/favourites-offer';

type FavouritesListProps = {
  offers: OfferType[];
};

function FavouritesList({offers}: FavouritesListProps): JSX.Element {
  return (
    <div className="page__favorites-container container">
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          <li className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <Link className="locations__item-link" to="#todo">
                  <span>Amsterdam</span>
                </Link>
              </div>
            </div>
            <div className="favorites__places">
              <div className="cities__places-list places__list tabs__content">
                {offers.map((offer) => (<FavoritesOffer key={offer.id} offerData={offer}/>))}
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default FavouritesList;
