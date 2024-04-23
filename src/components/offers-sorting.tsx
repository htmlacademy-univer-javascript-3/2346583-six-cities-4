import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setSortType } from '../store/action';
import { SORT_TYPES } from '../const';

function OffersSorting() {
  const [isOpen, setIsOpen] = useState(false);
  const selectedSortType = useAppSelector((state) => state.selectedSortType);

  const dispatch = useAppDispatch();

  return (
    <form className="places__sorting" action="#" method="get" onClick={() => setIsOpen(!isOpen)}>
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}>
        {selectedSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={
          `places__options places__options--custom
          ${isOpen ? 'places__options--opened' : ''}`
        }
      >
        {Object.values(SORT_TYPES).map((type) => (
          <li
            key={type}
            className={`places__option ${selectedSortType === type.toString() && 'places__option--active'}`}
            tabIndex={0}
            onClick={() => dispatch(setSortType(type))}
          >
            {type}
          </li>
        ))}

      </ul>
    </form>
  );
}

export default OffersSorting;
