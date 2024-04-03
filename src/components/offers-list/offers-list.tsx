import { useState } from 'react';
import { OfferType } from '../../types/offer-type';
import Offer from '../front/offer';
import { Map } from '../map/map';
import { ListType } from '../../const';

type OfferListProps = {
  offers: OfferType[];
  type: ListType;
};

function OffersList({offers, type}: OfferListProps): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<OfferType | undefined>(undefined);

  const handleMouseEnter = (id: string) => {
    const activeOffer = offers.find((offer) => offer.id === id);
    if (activeOffer !== undefined && activeOffer !== selectedOffer) {
      setSelectedOffer(activeOffer);
    }
  };

  const handleMouseLeave = () => {
    setSelectedOffer(undefined);
  };


  return (
    type === ListType.FRONT
      ?
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in Amsterdam</b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0}>
                    Popular
              <svg className="places__sorting-arrow" width="7" height="4">
                <use xlinkHref="#icon-arrow-select"></use>
              </svg>
            </span>
            <ul className="places__options places__options--custom places__options--opened">
              <li className="places__option places__option--active" tabIndex={0}>Popular</li>
              <li className="places__option" tabIndex={0}>Price: low to high</li>
              <li className="places__option" tabIndex={0}>Price: high to low</li>
              <li className="places__option" tabIndex={0}>Top rated first</li>
            </ul>
          </form>
          <div className="cities__places-list places__list tabs__content">
            {offers.map((offer) => (<Offer key={offer.id} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} offerData={offer}/>))}
          </div>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map offers={offers} selectedOffer={selectedOffer} city={offers[0].city}/>
          </section>
        </div>
      </div>
      :
      <>
        <section className="offer__map map">
          <Map offers={offers} selectedOffer={selectedOffer} city={offers[0].city}/>
        </section>
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {offers.map((offer) => (<Offer key={offer.id} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} offerData={offer}/>))}
          </div>
        </section>
      </>
  );
}

export default OffersList;
