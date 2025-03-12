"use client"
import { useForm } from "react-hook-form";
import { registro } from "@/conexionApi/peticiones";
import { useRouter } from "next/navigation"; 
import styles from './registro.module.css'; 

export default function Registro({ redirectTo = "/mostrar" }) { // Asegúrate de pasar la ruta correcta como prop
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const onSubmit = async (usuario) => {
        try {
            const respuesta = await registro(usuario);

            if (respuesta.error) {
                alert(`Error: ${respuesta.mensaje}`);
                return;
            }

            console.log("Redirigiendo a:", redirectTo); // Verifica el valor de redirectTo
            router.push(redirectTo); // Redirige a la página indicada en la prop `redirectTo`

        } catch (error) {
            console.error("Error en el registro:", error);
            alert("Error al registrar usuario. Inténtalo nuevamente.");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Registro</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                
                {/* Usuario */}
                <div className={styles.inputContainer}>
                    <input 
                        type="text" 
                        placeholder=" " 
                        {...register("username", { required: "El usuario es obligatorio" })} 
                        className={styles.input} 
                    />
                    <label>Usuario</label>
                    {errors.username && <p className={styles.error}>{errors.username.message}</p>}
                </div>

                {/* Correo */}
                <div className={styles.inputContainer}>
                    <input 
                        type="email" 
                        placeholder=" " 
                        {...register("email", { 
                            required: "El correo es obligatorio",
                            pattern: { 
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Correo inválido"
                            }
                        })} 
                        className={styles.input} 
                    />
                    <label>Correo</label>
                    {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                </div>

                {/* Contraseña */}
                <div className={styles.inputContainer}>
                    <input 
                        type="password" 
                        placeholder=" " 
                        {...register("password", { 
                            required: "La contraseña es obligatoria",
                            minLength: { 
                                value: 6, 
                                message: "Debe tener al menos 6 caracteres"
                            }
                        })} 
                        className={styles.input} 
                    />
                    <label>Contraseña</label>
                    {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                </div>

                <button type="submit" className={styles.button}>Registrar usuario</button>
            </form>
        </div>
    );
}
