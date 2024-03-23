import { useEffect, useRef } from 'react';
import { OfferType } from '../../types/offer-type';
import useMap from '../../hooks/use-map';
import leaflet from 'leaflet';

type MapProps = {
  offers: OfferType[];
  selectedOffer: OfferType;
};

export function Map({offers, selectedOffer}: MapProps){
  const mapRef = useRef(null);
  const map = useMap(mapRef, selectedOffer);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: 'img/pin-active.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.title === selectedOffer.title)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, offers, selectedOffer]);


  return (
    <div
      style={{height: '400px', width:'400px'}}
      ref={mapRef}
    >
    </div>
  );
}
