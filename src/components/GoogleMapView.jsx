// src/components/GoogleMapView.jsx

import { GoogleMap, Polyline, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 37.11,
  lng: 127.56,
};

const flightPath = [
  { lat: 37.1000, lng: 127.5400 },
  { lat: 37.1100, lng: 127.5500 },
  { lat: 37.1200, lng: 127.5600 },
  { lat: 37.1234, lng: 127.5678 },
];

const minePins = [
  {
    id: 1,
    lat: 37.1234,
    lng: 127.5678,
    status: "Uncleared",
    confidence: 1,
    time: "2025-12-08 13:20",
  },
  {
    id: 2,
    lat: 37.1201,
    lng: 127.5600,
    status: "Cleared",
    confidence: 1,
    time: "2025-12-08 13:18",
  },
  {
    id: 3,
    lat: 37.1100,
    lng: 127.5500,
    status: "False positive",
    confidence: 2,
    time: "2025-12-08 13:10",
  },
];

function GoogleMapView({ onSelectMine }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  });

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={14}
      center={defaultCenter}
      options={{
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      {/* 비행 경로 */}
      <Polyline
        path={flightPath}
        options={{
          strokeColor: "#1d4ed8",
          strokeOpacity: 0.9,
          strokeWeight: 4,
        }}
      />

      {/* 지뢰 핀 */}
      {minePins.map((mine) => (
        <Marker
          key={mine.id}
          position={{ lat: mine.lat, lng: mine.lng }}
          label={{
            text: mine.confidence === 1 ? "✔" : "⚠",
            color: mine.confidence === 1 ? "#15803d" : "#b45309",
            fontSize: "14px",
            fontWeight: "bold",
          }}
          onClick={() => {
            if (onSelectMine) {
              onSelectMine(mine);
            }
          }}
        />
      ))}
    </GoogleMap>
  );
}

export default GoogleMapView;
