import React from "react";
import styles from "./Recipe.module.css";
import heart from "../assets/heart.png";

const Recipe = ({ title, image, ingredients, toggleFavorite, bookmarked }) => {
    const handleFavorite = () => {
        toggleFavorite(title);
    };

    return (
        <div className={styles.recipe}>
            <h1 className={styles.title}>{title}</h1>
            <img className={styles.recipeImage} src={image} alt="" />
            <ul className={styles.ingredients}>
                {ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient.text}</li>
                ))}
            </ul>
            <img className={`${styles.heart} ${bookmarked ? styles.active : ''}`} src={heart} alt="heart" onClick={handleFavorite} />
        </div>
    );
};

export default Recipe;
