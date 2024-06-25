import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import regionsData from "../assets/regiuniHarta/regiuni.json";
import "../styles/MapPage.css";

const MapPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const geojsonRef = useRef(null);

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

    const resetHighlight = () => {
        if (geojsonRef.current) {
            geojsonRef.current.eachLayer((layer) => {
                geojsonRef.current.resetStyle(layer);
            });
        }
    };

    const highlightRegion = (e) => {
        const layer = e.target;
        layer.setStyle({
            weight: 5,
            color: "purple",
            dashArray: "",
            fillOpacity: 0.7,
            fillColor: "purple",
        });
    };

    const onEachRegion = (region, layer) => {
        const regionName = region.properties.name;

        layer.on({
            click: (e) => {
                setSelectedRegion(regionName);
                fetchRecipesByRegion(regionName);
                highlightRegion(e);
            },
        });

        layer.bindTooltip(regionName, {
            permanent: true,
            direction: "center",
            className: "region-label",
        });
    };

    return (
        <div className="map-page">
            <MapContainer
                center={[45.5432, 24.9668]}
                zoom={7}
                className="map"
                whenCreated={(mapInstance) => {
                    geojsonRef.current = mapInstance;
                }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <GeoJSON
                    data={regionsData.features}
                    style={() => ({
                        fillColor: "blue",
                        weight: 2,
                        opacity: 1,
                        color: "white",
                        dashArray: "3",
                        fillOpacity: 0.6,
                    })}
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
