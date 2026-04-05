import React, { useState } from "react";

const Filters = ({ setFilters }) => {
    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");
    const [district, setDistrict] = useState("");

    const applyFilters = () => {
        setFilters({
            price_min: priceMin,
            price_max: priceMax,
            district
        });
    };

    return (
        <div>
            <h3>Filtros</h3>

            <input
                placeholder="Precio mínimo"
                onChange={e => setPriceMin(e.target.value)}
            />

            <input
                placeholder="Precio máximo"
                onChange={e => setPriceMax(e.target.value)}
            />

            <input
                placeholder="Distrito"
                onChange={e => setDistrict(e.target.value)}
            />

            <button onClick={applyFilters}>Buscar</button>
        </div>
    );
};

export default Filters;