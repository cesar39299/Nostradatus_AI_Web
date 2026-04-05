const Sidebar = ({ properties, onSelectProperty, selectedProperty }) => {

    return (
        <div style={{
            width: "400px",
            height: "100vh",
            overflowY: "scroll",
            background: "#fff",
            padding: "8px"
        }}>
            <h3 style={{ marginBottom: "8px" }}>Propiedades</h3>

            {properties.length === 0 && (
                <p style={{ fontSize: "12px" }}>No hay propiedades</p>
            )}

            {properties.map(p => {

                const isSelected = selectedProperty?.id === p.id;

                return (
                    <div
                        key={p.id}
                        onClick={() => onSelectProperty?.(p)}
                        style={{
                            padding: "6px",
                            cursor: "pointer",
                            borderRadius: "4px",
                            marginBottom: "4px",

                            // 🔥 compacto extremo
                            fontSize: "10px",
                            lineHeight: "12px",

                            // 🔥 highlight selección
                            background: isSelected ? "#dbeafe" : "#fff",
                            border: isSelected
                                ? "1.5px solid #3b82f6"
                                : "1px solid #eee"
                        }}
                    >
                        <div style={{ fontWeight: "600" }}>
                            {p.title || "Sin título"}
                        </div>

                        <div>
                            💰 ${p.price || "-"}
                        </div>

                        <div style={{ color: "#555" }}>
                            📍 {p.district || "-"}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Sidebar;