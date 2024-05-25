import { useParams } from 'react-router-dom';
import Page404 from './page404';
import CommentForm from '../components/comment-form';
import ReviewsList from '../components/reviews-list';
import OffersList from '../components/offers-list';
import { AuthorizationStatus, ListType } from '../const';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Map } from '../components/map';
import { useEffect } from 'react';
import Header from '../components/header';
import { fetchOfferPageData } from '../store/api-actions';
import LoadingScreen from './loading-screen';

function OfferPage(): JSX.Element {
  const params = useParams();
  const selectedCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOfferPageData({ id: params.id ?? '' }));
  }, [params.id, dispatch]);

  const { currentOffer, nearestOffers, reviews } = useAppSelector(
    ({ offerPageData }) => ({
      currentOffer: offerPageData.fullOffer,
      nearestOffers: offerPageData.nearestOffers,
      reviews: offerPageData.reviews,
    })
  );
  const selectedOfferLoadingState = useAppSelector((state) => state.selectedOfferLoadingState);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isAuthed = (authorizationStatus === AuthorizationStatus.VALID);

  const premiumBlock = (
    <div className="offer__mark">
      <span>Premium</span>
    </div>
  );
  if (selectedOfferLoadingState){
    return <LoadingScreen />;
  }
  if (currentOffer === undefined) {
    return <Page404 />;
  }
  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && premiumBlock}
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
                  {currentOffer.bedrooms} Bedroom{currentOffer.bedrooms === 1 || 's'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adult{currentOffer.maxAdults === 1 || 's'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map(
                    (good) => (<li key={good} className="offer__inside-item">{good}</li>)
                  )}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host.name}
                  </span>
                  {currentOffer.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList
                  reviews={reviews.slice().sort((a, b) => {
                    const dateA = new Date(a.date).getTime();
                    const dateB = new Date(b.date).getTime();
                    return dateB - dateA;
                  }).slice(0, 10)}
                />
                { isAuthed && <CommentForm id={params.id!} />}
              </section>
            </div>
          </div>
        </section>
        <div className="container">
          <section className="offer__map map">
            <Map offers={nearestOffers.slice(0,3)} selectedOfferLocation={currentOffer.location} city={selectedCity}/>
          </section>
          <OffersList offers={nearestOffers.slice(0,3)} type={ListType.NEARBY} onMouseEnter={() => {}} onMouseLeave={() => {}}/>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
