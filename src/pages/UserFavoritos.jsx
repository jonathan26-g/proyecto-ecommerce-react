
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap"; 

const UserFavoritos = () => {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const usuario = localStorage.getItem("usuarioActual") || "invitado";
    const key = `wishlist_${usuario}`;
    const listaIds = JSON.parse(localStorage.getItem(key)) || [];

    const todosProductos = JSON.parse(localStorage.getItem("productos")) || [];
    const productosFavoritos = todosProductos.filter((p) =>
      listaIds.includes(p.id)
    );
    setFavoritos(productosFavoritos);
  }, []);

  const quitarDeFavoritos = (id) => {
    const usuario = localStorage.getItem("usuarioActual") || "invitado";
    const key = `wishlist_${usuario}`;
    const lista = JSON.parse(localStorage.getItem(key)) || [];
    const nuevaLista = lista.filter((pid) => pid !== id);
    localStorage.setItem(key, JSON.stringify(nuevaLista));

    setFavoritos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mis productos favoritos</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {favoritos.length > 0 ? (
          favoritos.map((producto) => (
            <div
              key={producto.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "10px",
                width: "200px",
              }}
            >
              <h4>{producto.title}</h4>
              <p>{producto.descripcion}</p>
              <Button className="mt-3 " variant="danger" 
               
                onClick={() => quitarDeFavoritos(producto.id)}
              >
                Quitar de favoritos
              </Button>
            </div>
          ))
        ) : (
          <p>No tenés productos en favoritos.</p>
        )}
      </div>
    </div>
  );
};

export default UserFavoritos;
