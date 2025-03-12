"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { buscarUsuario, editarUsuario, verificarAdmin } from "@/conexionApi/peticiones"; // Asegúrate de importar verificarAdmin
import styles from './editar.module.css';

export default function EditarUsuario() {
    const { register, handleSubmit, setValue } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false); // Para verificar si es admin
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Verificar si el usuario es admin
                const adminResponse = await verificarAdmin(); 
                if (adminResponse.error) {
                    setIsAdmin(false);
                } else {
                    setIsAdmin(true); // Si es admin
                }

                const response = await buscarUsuario(id);
                if (response.status === 200) {
                    const usuario = response.data;
                    setValue("username", usuario.username);
                    setValue("email", usuario.email);
                    setValue("password", ""); // No mostrar la contraseña
                    if (isAdmin) {
                        setValue("tipoUsuario", usuario.tipoUsuario); // Agregar tipoUsuario para admins
                    }
                } else {
                    alert("Error al cargar los datos del usuario");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [id, isAdmin, setValue]);

    const onSubmit = async (data) => {
        try {
            const response = await editarUsuario(id, data);
            if (response) {
                router.push("/mostrar");
            } else {
                alert("Error al editar el usuario");
            }
        } catch (error) {
            console.error("Error editing user:", error);
        }
    };

    if (isLoading) {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Cargando datos del usuario...</h1>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Editando usuario</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.inputContainer}>
                    <input type="text" placeholder=" " {...register("username")} className={styles.input} />
                    <label>Usuario</label>
                </div>
                <div className={styles.inputContainer}>
                    <input type="text" placeholder=" " {...register("email")} className={styles.input} />
                    <label>Correo</label>
                </div>
                <div className={styles.inputContainer}>
                    <input type="text" placeholder=" " {...register("password")} className={styles.input} />
                    <label>Contraseña</label>
                </div>

                {/* Solo mostrar para admins */}
                {isAdmin && (
                    <div className={styles.inputContainer}>
                        <select {...register("tipoUsuario")} className={styles.select}>
                            <option value="admin">Admin</option>
                            <option value="usuario">Usuario</option>
                        </select>
                        <label>Tipo de Usuario</label>
                    </div>
                )}

                <button type="submit" className={styles.button}>Guardar cambios</button>
            </form>
        </div>
    );
}

