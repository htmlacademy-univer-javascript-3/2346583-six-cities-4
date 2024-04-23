import { OfferType } from '../types/offer-type';
import { Link } from 'react-router-dom';
import { formatRating } from '../utils';
import { useAppDispatch } from '../hooks';
import { setSelectedOffer } from '../store/action';

type NearOfferProps = {
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
  offerData: OfferType;
};

export default function NearOffer({onMouseEnter, onMouseLeave, offerData}: NearOfferProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <article
      onClick={(evt) => {
        evt.preventDefault();
        dispatch(setSelectedOffer(offerData));
      }}
      onMouseEnter={(evt) => {
        evt.preventDefault();
        onMouseEnter(offerData.id);
      }}
      onMouseLeave={(evt) => {
        evt.preventDefault();
        onMouseLeave();
      }}
      className="near-places__card place-card"
    >
      <Link to={`/offer/${offerData.id}`}>
        {offerData.isPremium && <div className="place-card__mark"> <span>Premium</span> </div>}
        <div className="cities__image-wrapper place-card__image-wrapper">

          <img className="place-card__image" src={offerData.previewImage} width="260" height="200" alt="Place image" />
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{offerData.price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className="place-card__bookmark-button button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: formatRating(offerData.rating)}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            {offerData.title}
          </h2>
          <p className="place-card__type">{offerData.type}</p>
        </div>
      </Link>
    </article>
  );
}
