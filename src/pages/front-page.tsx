import { OfferType } from '../types/offer-type';
import OffersList from '../components/offers-list';
import { CitiesList } from '../components/cities-list';
import { useAppSelector } from '../hooks';
import { useEffect, useState } from 'react';
import { ListType } from '../const';
import { Map } from '../components/map';
import OffersSorting from '../components/offers-sorting';
import Header from '../components/header';

function FrontPage(): JSX.Element {
  const offers: OfferType[] = useAppSelector((state) => state.offers);
  const city = useAppSelector((state) => state.city);
  const [currentCityOffers, setCurrentCityOffers] = useState<OfferType[]>(offers);
  const [selectedOffer, setSelectedOffer] = useState<OfferType | undefined>(undefined);

  useEffect(() => {
    const filteredOffers = offers.filter((offer) => offer.city.name === city.name);
    setCurrentCityOffers(filteredOffers);
  }, [city, offers]);

  const handleSelectedOfferEnter = (id: string) => {
    setSelectedOffer(offers.find((offer) => offer.id === id));
  };

  const handleSelectedOfferLeave = () => {
    setSelectedOffer(undefined);
  };

  return (
    <div className="page page--gray page--main">
      <Header/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          {currentCityOffers.length ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{currentCityOffers.length} places to stay in {city.name}</b>
                <OffersSorting />
                <OffersList offers={currentCityOffers} type={ListType.FRONT} onMouseEnter={handleSelectedOfferEnter} onMouseLeave={handleSelectedOfferLeave} />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map
                    offers={currentCityOffers}
                    city={city}
                    selectedOffer={selectedOffer}
                  />
                </section>
              </div>
            </div>
          ) : (
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in {city.name}</p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default FrontPage;
