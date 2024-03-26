import { useNavigate } from 'react-router-dom';
import { OfferType } from '../../types/offer-type';


type OfferProps = {
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
  offerData: OfferType;
};

function Offer({onMouseEnter, onMouseLeave, offerData}: OfferProps): JSX.Element {
  const navigate = useNavigate();

  const premiumBlock = (
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
  );

  return (
    <article className="cities__card place-card"
      onMouseEnter={(evt) => {
        evt.preventDefault();
        onMouseEnter(offerData.id);
      }}
      onMouseLeave={(evt) => {
        evt.preventDefault();
        onMouseLeave();
      }}
    >
      {offerData.isPremium ? premiumBlock : null}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a onClick={() => navigate(`/offer/${offerData.id}`)}>
          <img className="place-card__image" src={offerData.previewImage} width="260" height="200" alt="Place image" />
        </a>
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
            <span style={{width: `${offerData.rating / 5 * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a onClick={() => navigate(`/offer/${offerData.id}`)}>{offerData.title}</a>
        </h2>
        <p className="place-card__type">{offerData.type}</p>
      </div>
    </article>
  );
}

export default Offer;
