import React, { useState, useEffect } from "react";
import MapView from "./Components/MapView.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import { getClusters } from "./Services/Api.js";
import "../Styles.css";

const App = () => {
    const [properties, setProperties] = useState([]);
    const [clusters, setClusters] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);

    const [loadingProperties, setLoadingProperties] = useState(false);

    // Secciones colapsables
    const [filtersCollapsed, setFiltersCollapsed] = useState(false); // expandido por defecto
    const [clustersCollapsed, setClustersCollapsed] = useState(false); // expandido por defecto
    const [propertiesCollapsed, setPropertiesCollapsed] = useState(true); // colapsado por defecto

    const [filters, setFilters] = useState({
        min_price: null,
        max_price: null,
        district: "",
    });

    useEffect(() => {
        const loadClusters = async () => {
            try {
                const res = await getClusters(filters);
                setClusters(res.data || []);
            } catch (err) {
                console.error(err);
                setClusters([]);
            }
        };
        loadClusters();
    }, [filters]);

    const filteredClusters = clusters
        .filter((c) =>
            filters.district
                ? c.district.toLowerCase().includes(filters.district.toLowerCase())
                : true
        )
        .sort((a, b) => (b.total_properties || 0) - (a.total_properties || 0));

    const handleSelectProperty = (prop) => {
        setSelectedProperty(prop);
    };

    const resetFilters = () =>
        setFilters({ min_price: null, max_price: null, district: "" });

    return (
        <div className="layout">
            {/* SIDEBAR */}
            <div className="sidebar">
                {/* FILTROS */}
                <div className="section">
                    <h3
                        className="section-title"
                        onClick={() => setFiltersCollapsed((prev) => !prev)}
                    >
                        Filtros {filtersCollapsed ? "▼" : "▲"}
                    </h3>
                    {!filtersCollapsed && (
                        <div className="section-content">
                            <input
                                type="number"
                                placeholder="Precio mínimo"
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        min_price: e.target.value ? Number(e.target.value) : null,
                                    }))
                                }
                            />
                            <input
                                type="number"
                                placeholder="Precio máximo"
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        max_price: e.target.value ? Number(e.target.value) : null,
                                    }))
                                }
                            />
                            <input
                                type="text"
                                placeholder="Distrito"
                                value={filters.district}
                                onChange={(e) =>
                                    setFilters((prev) => ({ ...prev, district: e.target.value }))
                                }
                            />
                            <button onClick={resetFilters}>Reset</button>
                        </div>
                    )}
                </div>

                {/* CLUSTERS */}
                <div className="section">
                    <h3
                        className="section-title"
                        onClick={() => setClustersCollapsed((prev) => !prev)}
                    >
                        Distritos (Cluster) {clustersCollapsed ? "▼" : "▲"}
                    </h3>
                    {!clustersCollapsed && (
                        <div className="section-content clusters">
                            {filteredClusters.map((c, i) => (
                                <div
                                    key={i}
                                    className={`card ${filters.district.toLowerCase() === c.district.toLowerCase()
                                            ? "selected"
                                            : ""
                                        }`}
                                    onClick={() =>
                                        setFilters((prev) => ({ ...prev, district: c.district }))
                                    }
                                >
                                    <b>{c.district}</b>
                                    <br />
                                    📦 {c.total_properties || 0}
                                    <br />
                                    💰 ${Math.round(c.avg_price_m2 || 0)} / m²
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* PROPIEDADES */}
                <div className="section">
                    <h3
                        className="section-title"
                        onClick={() => setPropertiesCollapsed((prev) => !prev)}
                    >
                        Propiedades {propertiesCollapsed ? "▼" : "▲"}
                    </h3>
                    {!propertiesCollapsed && (
                        <div className="section-content">
                            {loadingProperties && <p>⏳ Cargando...</p>}
                            <Sidebar
                                properties={properties}
                                onSelectProperty={handleSelectProperty}
                                selectedProperty={selectedProperty}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* MAPA */}
            <div className="map-container">
                <MapView
                    filters={filters}
                    onPropertiesLoaded={(data) => {
                        setProperties(data || []);
                        setLoadingProperties(false);
                    }}
                    onLoading={() => setLoadingProperties(true)}
                    selectedProperty={selectedProperty}
                />
            </div>
        </div>
    );
};

export default App;