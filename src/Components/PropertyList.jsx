const PropertyList = ({ properties }) => {
    return (
        <div>
            <h3>Propiedades</h3>

            {properties.map((p, i) => (
                <div key={i} className="card">
                    <h4>{p.title}</h4>
                    <p>{p.district}</p>
                    <p>${p.price}</p>
                </div>
            ))}
        </div>
    );
};

export default PropertyList;