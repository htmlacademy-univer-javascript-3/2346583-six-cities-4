import { OfferType } from '../types/offer-type';
import Offer from './offer';
import { ListType } from '../const';
import { useAppSelector } from '../hooks';
import { sortOffers } from '../utils';
import NearOffer from './near-offer';

type OfferListProps = {
  offers: OfferType[];
  type: ListType;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
};

function OffersList({offers, type, onMouseEnter, onMouseLeave}: OfferListProps): JSX.Element {
  const selectedSortType = useAppSelector((state) => state.selectedSortType);
  return (
    type === ListType.FRONT
      ?
      <div className="cities__places-list places__list tabs__content">
        {sortOffers(offers, selectedSortType).map((offer) => (
          <Offer key={offer.id} offerData={offer} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}/>
        ))}
      </div>
      :
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {offers.map((offer) => (<NearOffer key={offer.id} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} offerData={offer}/>))}
        </div>
      </section>
  );
}

export default OffersList;

