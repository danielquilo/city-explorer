import "./App.css";
import axios from "axios";
import { useState } from "react";


function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState({});

  function handleChange(event) {
    setSearchQuery(event.target.value);
  }

  async function getLocation() {
    try {
      // https://eu1.locationiq.com/v1/search?key=YOUR_ACCESS_TOKEN&q=SEARCH_STRING&format=json
      const API = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&format=json`;
      const res = await axios.get(API);
      setLocation(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <h1>City Explorer </h1>
      <input onChange={handleChange} placeholder="Place name" />
      <button onClick={getLocation}>Explore</button>
      <h2>{location.display_name}</h2>
    </div>
  );
}

export default App;