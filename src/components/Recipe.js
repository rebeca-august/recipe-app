import React, { useState } from "react";
import styles from "./Recipe.module.css";
import heart from "../assets/heart.png";

const Recipe = ({ title, image, ingredients }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(prevState => !prevState);
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
            <img className={`${styles.heart} ${isFavorite ? styles.active : ''}`} src={heart} alt="heart" onClick={toggleFavorite} />
        </div>
    );
};

export default Recipe;
