import React, { useState, useRef, useCallback } from 'react';
import { GoogleMap, Marker, Autocomplete, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '8px',
};

const defaultCenter = {
    lat: -23.55052,
    lng: -46.633308,
};

interface LatLng {
    lat: number;
    lng: number;
}

interface MapWithAutocompleteProps {
    apiKey: string;
    zoom?: number;
    onPlaceSelected?: (position: LatLng, placeName?: string) => void;
    initialCenter?: LatLng;
}

const MapWithAutocomplete: React.FC<MapWithAutocompleteProps> = ({ apiKey, zoom = 30, onPlaceSelected, initialCenter = defaultCenter }) => {

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: apiKey,
        libraries: ['places'],
    });

    const [mapCenter, setMapCenter] = useState<LatLng>(initialCenter);
    const [markerPosition, setMarkerPosition] = useState<LatLng>(initialCenter);

    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const onLoadAutocomplete = useCallback((autocomplete: google.maps.places.Autocomplete) => {
        autocompleteRef.current = autocomplete;
    }, []);

    const onPlaceChanged = useCallback(() => {
        if (autocompleteRef.current !== null) {
            const place = autocompleteRef.current.getPlace();
            if (place.geometry && place.geometry.location) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();

                setMapCenter({ lat, lng });
                setMarkerPosition({ lat, lng });

                if (onPlaceSelected) {
                    onPlaceSelected({ lat, lng }, place.formatted_address);
                }
            }
        }
    }, [onPlaceSelected]);

    if (loadError) return <div>Erro ao carregar o mapa</div>;
    if (!isLoaded) return <div>Carregando mapa...</div>;

    return (
        <div style={{ position: 'relative' }}>
            <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged}>
                <input
                    type="text"
                    placeholder="Digite o endereço aqui"
                    ref={inputRef}
                    style={{
                        boxSizing: 'border-box',
                        border: '1px solid transparent',
                        width: '300px',
                        height: '40px',
                        padding: '0 12px',
                        borderRadius: '4px',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                        fontSize: '16px',
                        position: 'absolute',
                        top: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 10,
                    }}
                />
            </Autocomplete>

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCenter}
                zoom={zoom}
            >
                <Marker position={markerPosition} />
            </GoogleMap>
        </div>
    );
};

export default React.memo(MapWithAutocomplete);
