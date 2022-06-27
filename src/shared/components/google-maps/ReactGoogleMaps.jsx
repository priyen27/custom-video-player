import React, { useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

import Data from "./data.json";
import makeStyles from "./style";

const ReactGoogleMaps = () => {
  const [selectedPark, setSelectedPark] = useState(null);

  const REACT_GOOGLE_MAP_API_KEY = "AIzaSyB2X_PHCSqNRGBA-fg9F0GMis-XNiXisFM";

  const map = () => (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 23.014509, lng: 72.591759 }}
      defaultOptions={{ styles: makeStyles }}
    >
      {Data.markers.map((item) => (
        <Marker
          key={item.id}
          position={{ lat: item.position[0], lng: item.position[1] }}
          onClick={() => {
            setSelectedPark(item);
          }}
        />
      ))}
      {selectedPark && (
        <InfoWindow
          position={{
            lat: selectedPark.position[0],
            lng: selectedPark.position[1],
          }}
          onCloseClick={() => {
            setSelectedPark(null);
          }}
        >
          <div>
            <h2>{selectedPark.name}</h2>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );

  const WrappedMap = withScriptjs(withGoogleMap(map));

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${REACT_GOOGLE_MAP_API_KEY}`}
        loadingElement={<div style={{ height: "100% " }} />}
        containerElement={<div style={{ height: "100% " }} />}
        mapElement={<div style={{ height: "100% " }} />}
      />
    </div>
  );
};

export default ReactGoogleMaps;
