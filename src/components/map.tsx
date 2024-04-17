import { useEffect, useRef } from 'react';
import { OfferType } from '../types/offer-type';
import useMap from '../hooks/use-map';
import {Icon, Marker, layerGroup} from 'leaflet';
import { CityType } from '../types/city-type';

type MapProps = {
  offers: OfferType[];
  selectedOffer: OfferType | undefined;
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

export function Map({offers, selectedOffer, city}: MapProps){
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });
        marker
          .setIcon(
            selectedOffer !== undefined && offer.title === selectedOffer.title
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer]);


  return <div style={{height: '100%'}} ref={mapRef}></div>;
}
