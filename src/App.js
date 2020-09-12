import React, { useState, useEffect } from "react";
import Recipe from "./components/Recipe";
import Header from "./components/Header";

import styles from "./App.module.css";

const getFavoriteRecipes = () =>
  JSON.parse(localStorage.getItem("favoriteRecipes")) || [];

function App() {
  const APP_ID = "22961b0c";
  const APP_KEY = "267a8479f969f9b1474fec115bfd119c";

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("choco");
  const [showFavorite, setShowFavorite] = useState(false);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search.trim());
  };

  useEffect(() => {
    const getRecipes = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      const favRecipes = getFavoriteRecipes();
      const recipesData = data.hits.map((recipeData) => {
        const hasFavRecipe = favRecipes.find(
          (favRecipe) => favRecipe.recipe.label === recipeData.recipe.label
        );
        if (hasFavRecipe) {
          return { ...recipeData, bookmarked: true };
        }
        return recipeData;
      });

      setRecipes(recipesData);
      setIsLoading(false);
    };
    if (query) {
      getRecipes();
    }
  }, [query]);
  const updateLocalStorage = (newRecipes) => {
    const favoriteRecipes = newRecipes.filter((recipe) => recipe.bookmarked);
    localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
  };

  const toggleFavorite = (title) => {
    const updatedRecipes = recipes.map((data) => {
      if (data.recipe.label === title) {
        return { ...data, bookmarked: !data.bookmarked };
      }
      return data;
    });
    setRecipes(updatedRecipes);
    updateLocalStorage(updatedRecipes);
  };

  const toggleFavoriteList = () => {
    setShowFavorite((prevState) => !prevState);
  };

  const filteredRecipes = showFavorite ? getFavoriteRecipes() : recipes;

  return (
    <div className={styles.app}>
      <Header
        getSearch={getSearch}
        search={search}
        updateSearch={updateSearch}
        isLoading={isLoading}
        toggleFavoriteList={toggleFavoriteList}
        showFavorite={showFavorite}
      />
      <div className={styles.recipes}>
        {filteredRecipes.map((data) => (
          <Recipe
            toggleFavorite={toggleFavorite}
            key={data.recipe.label}
            title={data.recipe.label}
            ingredients={data.recipe.ingredients}
            image={data.recipe.image}
            bookmarked={data.bookmarked}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
