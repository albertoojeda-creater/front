"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { login, verificarUsuarioLogueado, verificarAdmin } from "@/conexionApi/peticiones";
import { useRouter } from "next/navigation";
import styles from './login.module.css'; 

export default function Login() {
    const { register, handleSubmit } = useForm();
    const [isVerifying, setIsVerifying] = useState(false);
    const router = useRouter();

    const onSubmit = async (usuario) => {
        setIsVerifying(true);
        try {
            const respuesta = await login(usuario);

            if (respuesta.error) {
                alert(`Error: ${respuesta.mensaje}`);
                setIsVerifying(false);
                return;
            }

            const usuarioLogueado = await verificarUsuarioLogueado();
            if (usuarioLogueado.status !== 200) {
                alert("Usuario no logueado");
                setIsVerifying(false);
                return;
            }

            const esAdmin = await verificarAdmin();
            
            // Redirigir según el rol del usuario
            setTimeout(() => {
                setIsVerifying(false);
                router.push("/mostrar"); 
            }, 1000);
            
        } catch (error) {
            console.error("Error en login:", error);
            alert("Error al iniciar sesión. Verifica tus credenciales.");
            setIsVerifying(false);
        }
    };

    if (isVerifying) {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Verificando usuario...</h1>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.inputContainer}>
                    <input 
                        type="text" 
                        placeholder=" " 
                        {...register("username")} 
                        className={styles.input} 
                        required 
                    /> 
                    <label>Usuario</label>
                </div>
                <div className={styles.inputContainer}>
                    <input 
                        type="password"
                        placeholder=" " 
                        {...register("password")} 
                        className={styles.input} 
                        required 
                    />
                    <label>Contraseña</label>
                </div>
                <button type="submit" className={styles.button}>
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
}
