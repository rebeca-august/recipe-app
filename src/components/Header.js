import React from "react";
import heart from "../assets/heart.png";

import styles from "./Header.module.css";

const Header = ({
  getSearch,
  search,
  updateSearch,
  isLoading,
  showFavorite,
  toggleFavoriteList,
}) => {
  return (
    <div className={styles.container}>
      <img
        className={`${styles.heart} ${showFavorite ? styles.active : ""}`}
        src={heart}
        alt=""
        onClick={toggleFavoriteList}
      />
      <form onSubmit={getSearch} className={styles.searchForm}>
        <input
          className={styles.searchBar}
          value={search}
          onChange={updateSearch}
          required
        />
        <button className={styles.searchButton} disabled={isLoading}>
          {isLoading ? "Loading..." : "Search"}
        </button>
      </form>
    </div>
  );
};

export default Header;
