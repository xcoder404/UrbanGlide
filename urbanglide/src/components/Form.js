import React, { useState, useEffect } from "react";
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const Recenter = ({ lat, lng, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], zoom);
    //eslint-disable-next-line
  }, [lat, lng, zoom]);
  return null;
}
function Form() {
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState("");
  const [location, setLocation] = useState({ longitude: -75.6926685, latitude: 45.4445993, place: '', zoom: 10 });

  const handleChange = (e) => {
    setError("");
    setLocation(prev => ({ ...prev, place: '' }));
    setPostalCode(e.target.value);
  };
  const onClick = async () => {
    setLocation(prev => ({ ...prev, place: '' }));
    const flatZipCode = postalCode.replaceAll(/\s/g, '');
    if (!flatZipCode) {
      setError("Please enter a postal code");
      return;
    } else if (flatZipCode.length <= 3) {
      setError("Please enter a valid postal code");
      return;
    }
    try {
      const { data: response } = await axios.get(`http://api.geonames.org/postalCodeSearchJSON?postalcode=${flatZipCode}&country=CA&maxRows=1&username=UrbanGlide`)
      console.log("🚀 ~ file: Form.js:18 ~ onClick ~ response:", response);
      if (response.postalCodes.length) {
        setLocation({
          longitude: response.postalCodes[0].lng,
          latitude: response.postalCodes[0].lat,
          place: response.postalCodes[0].placeName + ', ' + response.postalCodes[0].adminName1,
          zoom: 15
        })
        setError("");
        setPostalCode("");
      } else {
        setError("Please enter a valid postal code of canada");
      }
    } catch (error) {
      setError('Error while fetching your request');
      console.log(error);
    }

  };
  return (
    <div class="urban-form">
      <div class="urban-search">
        <div class="map-section">
          <MapContainer style={{ height: '500px', width: '100%' }} center={[location.latitude, location.longitude]} zoom={10} scrollWheelZoom={false}>
            <Recenter lat={location.latitude} lng={location.longitude} zoom={location.zoom} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[location.latitude, location.longitude]} />
          </MapContainer>
        </div>
        <div class="form-section">
          <label for="postalCode">Location</label>
          <input type="search" value={postalCode} name="postalCode" onChange={handleChange}></input>
          <button type="button" onClick={onClick}>Search</button>
          {error && <p style={{ color: "red", fontSize: ".75rem" }}>{error}</p>}
          {location.place && <p style={{ color: "green", fontSize: ".75rem" }}>{location.place}</p>}
        </div>
      </div>
    </div>
  );
}

export default Form;
