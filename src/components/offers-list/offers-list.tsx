import { OfferType } from '../../types/offer-type';
import Offer from '../front/offer';

type OfferListProps = {
  offers: OfferType[];
};

function OffersList({offers}: OfferListProps): JSX.Element {
  const offersList: JSX.Element[] = [];
  for (let i = 0; i < offers.length; i++) {
    offersList.push(
      <Offer
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

export default OffersList;
