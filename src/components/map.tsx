import { useEffect, useRef } from 'react';
import { FullOfferType, OfferType } from '../types/offer-type';
import useMap from '../hooks/use-map';
import { Icon, Marker } from 'leaflet';
import { CityType } from '../types/city-type';

type MapProps = {
  offers: OfferType[];
  city: CityType;
  selectedOffer: OfferType | FullOfferType | undefined;
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

export function Map({offers, selectedOffer, city}: MapProps){
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const markersRef = useRef<Marker[]>([]);

  useEffect(() => {
    if (map){
      map.setView({
        lat: city.location.latitude,
        lng: city.location.longitude
      }, city.location.zoom);
    }
  }, [city, map]);

  useEffect(() => {
    if (map) {
      markersRef.current.forEach((marker) => map.removeLayer(marker));
      markersRef.current = [];

      offers
        .filter((offer) => offer !== selectedOffer)
        .forEach((offer) => {
          const marker = new Marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {icon: defaultCustomIcon}).addTo(map);
          markersRef.current.push(marker);
        });

      if (selectedOffer) {
        const selectedMarker = new Marker({
          lat: selectedOffer.location.latitude,
          lng: selectedOffer.location.longitude,
        }, {icon: currentCustomIcon}).addTo(map);
        markersRef.current.push(selectedMarker);
      }
    }

  }, [city, map, offers, selectedOffer]);


  return <div style={{height: '100%'}} ref={mapRef}></div>;
}
