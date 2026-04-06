const Sidebar = ({ properties, onSelectProperty, selectedProperty }) => {

    return (
        <div style={{
            width: "100%",
            height: "100%",
            overflowY: "auto",
            background: "#fff",
            padding: "8px"
        }}>
            <h3 style={{ marginBottom: "8px" }}>Propiedades</h3>

            {properties.length === 0 && (
                <p style={{ fontSize: "12px" }}>No hay propiedades</p>
            )}

            {properties.map(p => {

                // 🔥 soporta id o PropertyId
                const propId = p.id || p.PropertyId;
                const selectedId = selectedProperty?.id || selectedProperty?.PropertyId;

                const isSelected = selectedId === propId;

                return (
                    <div
                        key={propId}
                        onClick={() => {
                            console.log("🖱️ Click en propiedad:", p);
                            onSelectProperty?.(p);
                        }}
                        style={{
                            padding: "8px",
                            cursor: "pointer",
                            borderRadius: "6px",
                            marginBottom: "6px",

                            fontSize: "11px",
                            lineHeight: "14px",

                            background: isSelected ? "#dbeafe" : "#fff",
                            border: isSelected
                                ? "2px solid #3b82f6"
                                : "1px solid #eee",

                            transition: "all 0.2s ease"
                        }}
                    >
                        <div style={{ fontWeight: "600" }}>
                            {p.title || "Sin título"}
                        </div>

                        <div>
                            💰 ${p.price || "-"}
                        </div>

                        <div style={{ color: "#555" }}>
                            📍 {p.district || p.district_name || "Sin distrito"}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Sidebar;