import "./App.css";
import axios from "axios";
import { useState } from "react";



function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState({});
  const [map,setMap] =useState ("");
  const[apiError, setApiError] = useState("");

  function handleChange(event) {
    setSearchQuery(event.target.value);
  }

  async function getLocation() {
    try {
      // https://eu1.locationiq.com/v1/search?key=YOUR_ACCESS_TOKEN&q=SEARCH_STRING&format=json
      const API = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&format=json`;
      const res = await axios.get(API);
      const newLocation = res.data[0];
      setLocation(newLocation);
      getMap(newLocation);
      setApiError("");
    } catch (error) {
      console.log(error);
      setApiError(error.message);
      setLocation({});
      setMap("");
    }
  }

  async function getMap(newLocation) {
    const API =  `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${newLocation.lat},${newLocation.lon}&zoom=11`;
    setMap(API);

  }


  return (
  <div className="App">
      <h1>City Explorer Demo</h1>
      <input onChange={handleChange} placeholder="Place name" />
      <button onClick={getLocation}>Explore</button>
      <p>{apiError}</p>
      <h2>{location.display_name}</h2>
      {map && <img src={map} alt="map" />}
    </div>
  );
}

export default App;