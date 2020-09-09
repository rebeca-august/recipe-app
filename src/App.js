import React, { useState, useEffect } from 'react';
import Recipe from "./components/Recipe";
import heart from "./assets/heart.png";

import styles from './App.module.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("choco");

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search.trim());
  };

  const APP_ID = "22961b0c";
  const APP_KEY = "267a8479f969f9b1474fec115bfd119c";


  useEffect(() => {
    const getRecipes = async () => {
      setIsLoading(true);
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json();

      setRecipes(data.hits);
      setIsLoading(false);
    };
    if (query) {
      getRecipes();
    }
  }, [query]);

  return (
    <div className={styles.app}>
      <form onSubmit={getSearch} className={styles.searchForm}>
        <img className={styles.heart} src={heart} alt="" />
        <input className={styles.searchBar} value={search} onChange={updateSearch} required />
        <button className={styles.searchButton} disabled={isLoading}>{isLoading ? "Loading..." : "Search"}</button>
      </form>

      <div className={styles.recipes}>
        {recipes.map(data => (
          <Recipe
            key={data.recipe.label}
            title={data.recipe.label}
            ingredients={data.recipe.ingredients}
            image={data.recipe.image}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
