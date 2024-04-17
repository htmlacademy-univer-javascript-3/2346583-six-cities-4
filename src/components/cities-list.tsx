import { CITIES } from '../const';
import { useAppDispatch } from '../hooks';
import { changeCity } from '../store/action';
import { CityType } from '../types/city-type';
import { CitiesElement } from './cities-element';

export function CitiesList() {
  const dispatch = useAppDispatch();
  const handleCityChange = (city: CityType) => {
    dispatch(changeCity(city));
  };
  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <CitiesElement
          key={city.name}
          city={city}
          onCityChange={handleCityChange}
        />
      ))}
    </ul>
  );
}
