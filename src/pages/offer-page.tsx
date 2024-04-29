import { Link, useParams } from 'react-router-dom';
import Page404 from './page404';
import HeaderLogo from '../components/header-logo';
import { OfferType } from '../types/offer-type';
import CommentForm from '../components/comment-form';
import ReviewsList from '../components/reviews-list';
import { mockReviews } from '../mock/reviews';
import OffersList from '../components/offers-list';
import { ListType } from '../const';
import { useAppSelector } from '../hooks';
import { Map } from '../components/map';
import { useState } from 'react';

function OfferPage(): JSX.Element {
  const offers: OfferType[] = useAppSelector((state) => state.offers);
  const params = useParams();
  const currentOffer = offers.find((offer) => offer.id === params.id);
  const offersNearby = useAppSelector((state) => state.offersNearby);
  const selectedCity = useAppSelector((state) => state.city);
  const [selectedOffer, setSelectedOffer] = useState<OfferType | undefined>(undefined);

  const handleSelectedOfferEnter = (id: string) => {
    setSelectedOffer(offers.find((offer) => offer.id === id));
  };

  const handleSelectedOfferLeave = () => {
    setSelectedOffer(undefined);
  };

  const premiumBlock = (
    <div className="offer__mark">
      <span>Premium</span>
    </div>
  );

  return currentOffer ? (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <HeaderLogo />
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to="/login">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="#todo">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              <div className="offer__image-wrapper">
                <img className="offer__image" src={currentOffer.previewImage} alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src={currentOffer.previewImage} alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src={currentOffer.previewImage} alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src={currentOffer.previewImage} alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src={currentOffer.previewImage} alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src={currentOffer.previewImage} alt="Photo studio" />
              </div>
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium ? premiumBlock : null}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${currentOffer.rating / 5 * 100}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  3 Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max 4 adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  <li className="offer__inside-item">
                    Wi-Fi
                  </li>
                  <li className="offer__inside-item">
                    Washing machine
                  </li>
                  <li className="offer__inside-item">
                    Towels
                  </li>
                  <li className="offer__inside-item">
                    Heating
                  </li>
                  <li className="offer__inside-item">
                    Coffee machine
                  </li>
                  <li className="offer__inside-item">
                    Baby seat
                  </li>
                  <li className="offer__inside-item">
                    Kitchen
                  </li>
                  <li className="offer__inside-item">
                    Dishwasher
                  </li>
                  <li className="offer__inside-item">
                    Cabel TV
                  </li>
                  <li className="offer__inside-item">
                    Fridge
                  </li>
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    Angelina
                  </span>
                  <span className="offer__user-status">
                    Pro
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                  </p>
                  <p className="offer__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList reviews={mockReviews}/>
                <CommentForm />
              </section>
            </div>
          </div>
        </section>
        <div className="container">
          <section className="offer__map map">
            <Map offers={offersNearby} selectedOffer={selectedOffer} city={selectedCity}/>
          </section>
          <OffersList offers={offersNearby} type={ListType.NEARBY} onMouseEnter={handleSelectedOfferEnter} onMouseLeave={handleSelectedOfferLeave}/>
        </div>
      </main>
    </div>
  ) : (<Page404 />);
}

export default OfferPage;
