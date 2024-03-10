import { OfferType } from '../../types/offer-type';
import FavoritesOffer from '../favourites/favourites-offer';

type FavouritesListProps = {
  offers: OfferType[];
};

function FavouritesList({offers}: FavouritesListProps): JSX.Element {
  const offersList: JSX.Element[] = [];
  for (let i = 0; i < offers.length; i++) {
    offersList.push(
      <FavoritesOffer
        id = {offers[i].id}
        mark = {offers[i].mark}
        src={offers[i].src}
        price={offers[i].price}
        description={offers[i].description}
        type={offers[i].type}
      />);
  }
  return (
    <div className="cities__places-list places__list tabs__content">
      {offersList}
    </div>
  );
}

export default FavouritesList;
