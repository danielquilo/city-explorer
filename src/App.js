import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [pokemon, setPokemon] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  async function getPokemon() {
    try {
      const API = "https://pokeapi.co/api/v2/pokemon/" + searchQuery.toLowerCase();
      const res = await axios.get(API);
      setPokemon(res.data.sprites.front_default);
    } catch (error) {
      console.log(error);
      // show a 404 image when there is an error... NICE
      setPokemon("https://aioseo.com/wp-content/uploads/2021/04/how-to-find-and-fix-404-errors-in-wordpress.png.webp");
    }
  }

  function handleChange(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <div className="App">
      <h1>API Demo</h1>
      <input onChange={handleChange} placeholder="What Pokemon?" />
      <button onClick={getPokemon}>Show me the Pokemon!</button>
      {pokemon && <img src={pokemon} alt="Pokemon" />}
    </div>
  );
}

export default App;