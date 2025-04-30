import TableC from '../components/table/TableC'
import { Container } from 'react-bootstrap'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminUsersPage = () => {

    const [usuarios, setUsuarios] = useState([])
    const usuarioLog = JSON.parse(sessionStorage.getItem('usuarioLogeado')) || null;  

    const obtenerUsuarios = () => {
        const usuariosLs = JSON.parse(localStorage.getItem('usuarios')) || []; 
        setUsuarios(usuariosLs);
    }

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    
    if (!usuarioLog || usuarioLog.rol !== 'admin') {
        return (
            <Container className="my-5">
                <h2>Acceso restringido</h2>
                <p>Debes iniciar sesión como administrador para acceder a esta página.</p>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <div className="d-flex justify-content-end mb-3">
                <Link className="btn btn-primary" to="/admin/users/create">Agregar Usuario</Link>
            </div>

            <TableC array={usuarios} idPage="users" />
        </Container>
    );
};

export default AdminUsersPage;
