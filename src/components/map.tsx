import { useEffect, useRef } from 'react';
import { OfferType } from '../types/offer-type';
import useMap from '../hooks/use-map';
import { Icon, Marker } from 'leaflet';
import { CityType } from '../types/city-type';
import { LocationType } from '../types/locationType';

type MapProps = {
  offers: OfferType[];
  selectedOfferLocation: LocationType | undefined;
  city: CityType;
};

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [28, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [28, 40],
  iconAnchor: [20, 40],
});

export function Map({offers, selectedOfferLocation, city}: MapProps){
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const markersRef = useRef<Marker[]>([]);

  useEffect(() => {
    if (map) {
      markersRef.current.forEach((marker) => map.removeLayer(marker));
      markersRef.current = [];

      offers
        .filter((offer) => offer.location !== selectedOfferLocation)
        .forEach((offer) => {
          const marker = new Marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {icon: defaultCustomIcon}).addTo(map);
          markersRef.current.push(marker);
        });

      if (selectedOfferLocation) {
        const selectedMarker = new Marker({
          lat: selectedOfferLocation.latitude,
          lng: selectedOfferLocation.longitude,
        }, {icon: currentCustomIcon}).addTo(map);
        markersRef.current.push(selectedMarker);
        map.setView({
          lat: selectedOfferLocation.latitude,
          lng: selectedOfferLocation.longitude
        }, selectedOfferLocation.zoom);
      }
    }

  }, [map, offers, selectedOfferLocation]);


  return <div style={{height: '100%'}} ref={mapRef}></div>;
}
