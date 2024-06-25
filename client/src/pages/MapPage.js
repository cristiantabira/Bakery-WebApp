import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import crisanaData from "../assets/regiuniHarta/crisana.json";

const MapPage = () => {
    const onEachRegion = (region, layer) => {
        const regionName = region.properties.name;

        // Adăugare eveniment de click
        layer.on({
            click: () => {
                console.log(`Regiunea ${regionName} a fost apăsată`);
            },
        });

        // Afișare nume regiune pe hartă
        if (regionName) {
            layer.bindTooltip(regionName, {
                permanent: true,
                direction: "center",
                className: "region-label",
            });
        }
    };

    const regionStyle = {
        color: "#4a83ec",
        weight: 1,
        fillColor: "#1a1d62",
        fillOpacity: 0.9,
    };

    return (
        <div style={{ height: "80vh", width: "100%" }}>
            <MapContainer
                center={[46.5, 24.5]}
                zoom={7}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <GeoJSON
                    data={crisanaData}
                    style={regionStyle}
                    onEachFeature={onEachRegion}
                />
            </MapContainer>
        </div>
    );
};

export default MapPage;
