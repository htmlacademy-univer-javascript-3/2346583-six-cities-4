import { OfferType } from '../types/offer-type';
import FavoritesOffer from './favourites-offer';

type FavouritesListProps = {
  offers: OfferType[];
};

function FavouritesList({offers}: FavouritesListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (<FavoritesOffer key={offer.id} offerData={offer}/>))}
    </div>
  );
}

export default FavouritesList;
