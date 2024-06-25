import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { GeoJSON } from "react-leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import regionsData from "../assets/regiuniHarta/regiuni.json";
import "../styles/MapPage.css";

const MapPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await fetch("http://localhost:5000/recipes", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            console.log(data); // Log the fetched recipes
            setRecipes(data);
            setFilteredRecipes(data);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    const fetchRecipesByRegion = async (regionName) => {
        try {
            const response = await fetch(
                `http://localhost:5000/recipes/region/${regionName}`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            setFilteredRecipes(data);
        } catch (error) {
            console.error("Error fetching recipes by region:", error);
        }
    };

    const onEachRegion = (region, layer) => {
        const regionName = region.properties.name;
        layer
            .bindTooltip(regionName, {
                permanent: true,
                direction: "center",
                className: "region-label",
            })
            .openTooltip();

        layer.on({
            click: () => {
                console.log(`Regiunea ${regionName} a fost apăsată`);
                fetchRecipesByRegion(regionName);
            },
        });
    };

    return (
        <div className="map-page">
            <MapContainer center={[45.5432, 24.9668]} zoom={7} className="map">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <GeoJSON
                    data={regionsData.features}
                    onEachFeature={onEachRegion}
                />
            </MapContainer>
            <div className="recipe-list">
                <h2>Recipes List</h2>
                {filteredRecipes.length > 0 ? (
                    <ul>
                        {filteredRecipes.map((recipe) => (
                            <li key={recipe.id}>
                                <h3>{recipe.name}</h3>
                                <p>
                                    <strong>Ingredients:</strong>{" "}
                                    {Array.isArray(recipe.ingredients)
                                        ? recipe.ingredients.join(", ")
                                        : recipe.ingredients}
                                </p>
                                <p>
                                    <strong>Preparation:</strong>{" "}
                                    {recipe.preparation}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No recipes yet added</p>
                )}
            </div>
        </div>
    );
};

export default MapPage;
