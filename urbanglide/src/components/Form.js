import React, { useState, useEffect } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMap, Tooltip } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const Recenter = ({ lat, lng, zoom }) => {
	const map = useMap();
	useEffect(() => {
		map.flyTo([lat, lng], zoom);
		//eslint-disable-next-line
	}, [lat, lng, zoom]);
	return null;
};
const getRandomCoordinates = (latitude, longitude, radius, numPoints) => {
	const randomCoords = [];
	for (let i = 0; i < numPoints; i++) {
		const randomAngle = Math.random() * Math.PI * 2;
		const randomRadius = Math.random() * radius;
		const randomLatitude = latitude + randomRadius * Math.cos(randomAngle);
		const randomLongitude = longitude + randomRadius * Math.sin(randomAngle);
		randomCoords.push([randomLatitude, randomLongitude]);
	}
	return randomCoords;
};
function Form() {
	const [postalCode, setPostalCode] = useState("");
	const [error, setError] = useState("");
	const [location, setLocation] = useState({
		longitude: -75.6926685,
		latitude: 45.4445993,
		place: "Ottawa, Ontario",
		zoom: 10,
		code: "",
	});
	const [currentPostalPlace, setCurrentPostalPlace] = useState("");
	const [selectedHour, setSelectedHour] = useState("00");
	const [selectedMinute, setSelectedMinute] = useState("00");
	const [randomMarkers, setRandomMarkers] = useState([]);
	const [nearbyPlaces, setNearbyPlaces] = useState([]);
	const handleChange = (e) => {
		setError("");
		setCurrentPostalPlace("");
		setPostalCode(e.target.value);
	};

	const handleHourChange = (e) => {
		setSelectedHour(e.target.value);
	};

	// Function to handle changes in the minute selection
	const handleMinuteChange = (e) => {
		setSelectedMinute(e.target.value);
	};

	const onClick = async () => {
		setCurrentPostalPlace("");
		const flatZipCode = postalCode.replaceAll(/\s/g, "");
		if (!flatZipCode) {
			setError("Please enter a postal code");
			return;
		} else if (flatZipCode.length <= 3) {
			setError("Please enter a valid postal code");
			return;
		}
		try {
			const { data: response } = await axios.get(
				`http://api.geonames.org/postalCodeSearchJSON?postalcode=${flatZipCode}&country=CA&maxRows=1&username=UrbanGlide`
			);
			console.log("🚀 ~ file: Form.js:18 ~ onClick ~ response:", response);
			if (response.postalCodes.length) {
				const latitude = response.postalCodes[0].lat;
				const longitude = response.postalCodes[0].lng;
				setLocation({
					longitude: response.postalCodes[0].lng,
					latitude: response.postalCodes[0].lat,
					place: response.postalCodes[0].placeName + ", " + response.postalCodes[0].adminName1,
					zoom: 14,
					code: response.postalCodes[0].postalCode,
				});
				setCurrentPostalPlace(
					response.postalCodes[0].placeName + ", " + response.postalCodes[0].adminName1
				);
				setError("");
				setPostalCode("");
				const { data: nearbyPlacesRes } = await axios.get(
					`http://api.geonames.org/findNearbyPlaceNameJSON?lat=${latitude}&lng=${longitude}&radius=5&maxRows=5&username=UrbanGlide`
				);
				console.log("nearbyPlacesRes", nearbyPlacesRes.geonames);
				setNearbyPlaces(nearbyPlacesRes.geonames);
				const randomCoords = getRandomCoordinates(latitude, longitude, 5000, 5);
				setRandomMarkers(randomCoords);
			} else {
				setError("Please enter a valid postal code of canada");
			}
		} catch (error) {
			setError("Error while fetching your request");
			console.log(error);
		}
	};

	return (
		<div class='urban-form'>
			<div class='urban-search'>
				<div class='map-section'>
					<MapContainer
						style={{ height: "500px", width: "100%" }}
						center={[location.latitude, location.longitude]}
						zoom={10}
						scrollWheelZoom={true}>
						<Recenter lat={location.latitude} lng={location.longitude} zoom={location.zoom} />
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
						/>
						{nearbyPlaces?.length &&
							nearbyPlaces.map((place, index) => (
								<Marker
									key={index}
									position={[place.lat, place.lng]} // Position should be an array of latitude and longitude
								>
									<Tooltip direction='top' offset={[13, 0]} permanent>
										<strong>{place.name}</strong>
									</Tooltip>
								</Marker>
							))}
						<Marker position={[location.latitude, location.longitude]}>
							<Tooltip direction='top' offset={[13, 0]} permanent>
								<p style={{ fontSize: "16px" }}>
									<strong>{location.place}</strong>
								</p>
								<strong>{location.code}</strong>
							</Tooltip>
						</Marker>
					</MapContainer>
				</div>
				<div class='form-section'>
					<label for='postalCode'>Location</label>
					<input
						type='search'
						value={postalCode}
						name='postalCode'
						onChange={handleChange}
						placeholder='Enter zip code of your lcoation'></input>
					<div class='urban-time'>
						<label for='hour'>Hour:</label>
						<select id='hour' value={selectedHour} onChange={handleHourChange}>
							{Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0")).map((hour) => (
								<option key={hour} value={hour}>
									{hour}
								</option>
							))}
						</select>

						<label for='minute'>Minute:</label>
						<select id='minute' value={selectedMinute} onChange={handleMinuteChange}>
							{Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0")).map((minute) => (
								<option key={minute} value={minute}>
									{minute}
								</option>
							))}
						</select>
					</div>
					<button type='button' onClick={onClick} class='search-btn'>
						Search
					</button>
					{error && <p style={{ color: "red", fontSize: ".75rem" }}>{error}</p>}
					{currentPostalPlace && (
						<p style={{ color: "green", fontSize: ".75rem" }}>{currentPostalPlace}</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default Form;
