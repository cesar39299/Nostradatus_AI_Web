import React, { useState, useEffect } from "react";
import MapView from "./Components/MapView.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import { getClusters } from "./Services/Api.js";
import "../Styles.css";

const App = () => {

    // ===============================
    // 🔥 ESTADO
    // ===============================
    const [properties, setProperties] = useState([]);
    const [clusters, setClusters] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);

    const [showProperties, setShowProperties] = useState(false);
    const [loadingProperties, setLoadingProperties] = useState(false);
    const [showMap, setShowMap] = useState(false);

    const [filters, setFilters] = useState({
        min_price: null,
        max_price: null,
        district: ""
    });

    // ===============================
    // 🔥 INIT
    // ===============================
    useEffect(() => {
        console.log("🚀 APP INIT");
    }, []);

    // ===============================
    // 🔥 CLUSTERS
    // ===============================
    useEffect(() => {
        const loadClusters = async () => {
            try {
                const res = await getClusters(filters);
                setClusters(res.data || []);
            } catch (err) {
                console.error("❌ [CLUSTERS]", err);
                setClusters([]);
            }
        };

        loadClusters();
    }, [filters]);

    // ===============================
    // 🔥 FILTRO + ORDEN
    // ===============================
    const filteredClusters = clusters
        .filter(c => {
            if (!filters.district) return true;

            return c.district
                ?.toLowerCase()
                .includes(filters.district.toLowerCase());
        })
        .sort((a, b) => (b.total_properties || 0) - (a.total_properties || 0));

    // ===============================
    // 🔥 MAP CALLBACKS
    // ===============================
    const handlePropertiesLoaded = (data) => {
        setProperties(data || []);
        setLoadingProperties(false);
    };

    const handleLoading = () => {
        setLoadingProperties(true);
    };

    // ===============================
    // 🔥 SELECCIÓN
    // ===============================
    const handleSelectProperty = (prop) => {
        setSelectedProperty(prop);
        setShowMap(true); // abre mapa automáticamente
    };

    // ===============================
    // 🔥 HANDLERS
    // ===============================
    const handleMinPrice = (e) => {
        setFilters(prev => ({
            ...prev,
            min_price: e.target.value ? Number(e.target.value) : null
        }));
    };

    const handleMaxPrice = (e) => {
        setFilters(prev => ({
            ...prev,
            max_price: e.target.value ? Number(e.target.value) : null
        }));
    };

    const handleDistrict = (e) => {
        setFilters(prev => ({
            ...prev,
            district: e.target.value
        }));
    };

    const selectDistrict = (district) => {
        setFilters(prev => ({
            ...prev,
            district
        }));
        setSelectedProperty(null);
    };

    const resetFilters = () => {
        setFilters({
            min_price: null,
            max_price: null,
            district: ""
        });
        setSelectedProperty(null);
    };

    // ===============================
    // 🔥 UI
    // ===============================
    return (
        <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>

            {/* SIDEBAR */}
            <div style={{
                width: "380px",
                background: "#fff",
                overflowY: "auto",
                zIndex: 2
            }}>

                {/* BOTÓN MAPA */}
                <div style={{ padding: "10px", borderBottom: "1px solid #ccc", textAlign: "center" }}>
                    <button onClick={() => setShowMap(prev => !prev)}>
                        {showMap ? "Ocultar Mapa >>>" : "<<< Mostrar Mapa"}
                    </button>
                </div>

                {/* FILTROS CENTRADOS */}
                <div style={{
                    padding: "15px",
                    borderBottom: "1px solid #ccc",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px"
                }}>
                    <h3>Filtros</h3>

                    <input
                        type="number"
                        placeholder="Precio mínimo"
                        onChange={handleMinPrice}
                        style={{ width: "80%" }}
                    />

                    <input
                        type="number"
                        placeholder="Precio máximo"
                        onChange={handleMaxPrice}
                        style={{ width: "80%" }}
                    />

                    <input
                        type="text"
                        placeholder="Distrito"
                        value={filters.district}
                        onChange={handleDistrict}
                        style={{ width: "80%" }}
                    />

                    <button style={{ width: "80%" }} onClick={resetFilters}>
                        Reset
                    </button>
                </div>

                {/* CLUSTERS */}
                <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                    <h3>Distritos (Cluster)</h3>

                    {filteredClusters.map((c, i) => (
                        <div
                            key={i}
                            onClick={() => selectDistrict(c.district)}
                            style={{
                                padding: "8px",
                                marginBottom: "5px",
                                cursor: "pointer",
                                borderRadius: "6px",
                                background:
                                    filters.district.toLowerCase() === c.district.toLowerCase()
                                        ? "#dbeafe"
                                        : "#f5f5f5"
                            }}
                        >
                            <b>{c.district}</b><br />
                            📦 {c.total_properties || 0}<br />
                            💰 ${Math.round(c.avg_price_m2 || 0)} / m²
                        </div>
                    ))}
                </div>

                {/* PROPIEDADES */}
                <div style={{ padding: "10px" }}>
                    <h3 onClick={() => setShowProperties(!showProperties)}>
                        Propiedades {showProperties ? "▲" : "▼"}
                    </h3>

                    {loadingProperties && <p>⏳ Cargando...</p>}

                    {showProperties && (
                        <Sidebar
                            properties={properties}
                            onSelectProperty={handleSelectProperty}
                            selectedProperty={selectedProperty}
                        />
                    )}
                </div>

            </div>

            {/* MAPA DESLIZABLE */}
            <div style={{
                position: "absolute",
                top: 0,
                right: 0,
                height: "100%",
                width: "100%",
                transform: showMap ? "translateX(0)" : "translateX(100%)",
                transition: "transform 0.4s ease-in-out",
                zIndex: 1
            }}>
                <MapView
                    filters={filters}
                    onPropertiesLoaded={handlePropertiesLoaded}
                    onLoading={handleLoading}
                    selectedProperty={selectedProperty}
                />
            </div>

        </div>
    );
};

export default App;