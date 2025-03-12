"use client";

import React, { useEffect, useState } from 'react';
import { mostrar, logout, verificarAdmin, eliminarUsuario } from '../../conexionApi/peticiones';
import { useRouter } from 'next/navigation';
import styles from './mostrar.module.css'; // Importar los estilos del módulo CSS
import { FaSignOutAlt, FaEdit, FaTrash } from 'react-icons/fa'; // Importar iconos

const MostrarPage = () => {
    const [data, setData] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // Para mostrar errores
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Verificar si el usuario es admin
                const adminResponse = await verificarAdmin();
                if (!adminResponse.error) {
                    setIsAdmin(true);
                }

                // Obtener lista de usuarios
                const response = await mostrar();
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            router.push("/");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const handleEdit = (id) => {
        // Redirige a la página de edición con el ID del usuario
        router.push(`/editar/${id}`);
    };

    const handleDelete = async (id, tipoUsuario) => {
        if (tipoUsuario === 'admin') {
            alert("No puedes eliminar a un administrador");
            return;
        }

        setIsDeleting(true);
        setErrorMessage(""); // Limpiar mensaje de error antes de la eliminación
        try {
            await eliminarUsuario(id);
            // Actualizar la lista de usuarios después de la eliminación
            setData(data.filter(item => item._id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
            setErrorMessage("Hubo un error al intentar eliminar el usuario.");
        } finally {
            setIsDeleting(false);
        }
    };

    if (isDeleting) {
        return <div className={styles.deleting}>Eliminando usuario...</div>;
    }

    return (
        <div className={styles.fullscreen}> 
            <div className={styles.bottom}>
                <div className={styles.links}>
                    <a onClick={handleLogout} className={styles.link}>
                        <FaSignOutAlt className={styles.icon_exit} /> Cerrar Sesión
                    </a>
                </div>
            </div>

            {isAdmin && <h1 className={styles.title}>Bienvenido ADMIN</h1>}
            {!isAdmin && <h1 className={styles.title}>Bienvenido USUARIO</h1>}

            {errorMessage && <div className={styles.error}>{errorMessage}</div>}

            <table className={styles['data-table']}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        {isAdmin && <th>Tipo</th>}
                        {isAdmin && <th>Editar</th>}
                        {isAdmin && <th>Eliminar</th>}
                        {!isAdmin && <th>Editar</th>}
                        {!isAdmin && <th>Eliminar</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className={styles['data-row']}>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            {isAdmin && <td>{item.tipoUsuario}</td>}
                            {isAdmin && (
                                <td>
                                    <a onClick={() => handleEdit(item._id)}>
                                        <FaEdit className={styles.icon} />
                                    </a>
                                </td>
                            )}
                            {isAdmin && (
                                <td>
                                    <a onClick={() => handleDelete(item._id, item.tipoUsuario)}>
                                        <FaTrash className={styles.icon} />
                                    </a>
                                </td>
                            )}
                            {!isAdmin && (
                                <td>
                                    <a onClick={() => handleEdit(item._id)}>
                                        <FaEdit className={styles.icon} />
                                    </a>
                                </td>
                            )}
                            {!isAdmin && (
                                <td>
                                    <a onClick={() => handleDelete(item._id, item.tipoUsuario)}>
                                        <FaTrash className={styles.icon} />
                                    </a>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MostrarPage;

