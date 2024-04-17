import { OfferType } from '../types/offer-type';
import Offer from './offer';
import { ListType } from '../const';
import { changeSelectedOffer, changeSelectedOfferNearby } from '../store/action';
import { useAppDispatch} from '../hooks';

type OfferListProps = {
  offers: OfferType[];
  type: ListType;
};

function OffersList({offers, type}: OfferListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const handleMouseEnterFront = (id: string) => {
    const activeOffer = offers.find((offer) => offer.id === id);
    if (activeOffer !== undefined) {
      dispatch(changeSelectedOffer(activeOffer));
    }
  };

  const handleMouseEnterNearby = (id: string) => {
    const activeOffer = offers.find((offer) => offer.id === id);
    if (activeOffer !== undefined) {
      dispatch(changeSelectedOfferNearby(activeOffer));
    }
  };

  const handleMouseLeave = () => {
    dispatch(changeSelectedOffer(undefined));
  };

  return (
    type === ListType.FRONT
      ?
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer) => (<Offer key={offer.id} onMouseEnter={handleMouseEnterFront} onMouseLeave={handleMouseLeave} offerData={offer}/>))}
      </div>
      :
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {offers.map((offer) => (<Offer key={offer.id} onMouseEnter={handleMouseEnterNearby} onMouseLeave={handleMouseLeave} offerData={offer}/>))}
        </div>
      </section>
  );
}

export default OffersList;

