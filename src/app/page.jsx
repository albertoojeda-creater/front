import Link from 'next/link';
import styles from './inicio.module.css'; 
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'; 

export default function Inicio() {
    return (
        <div className={`${styles.container} ${styles.fontPoppins}`}>
            <div className={styles.card}>
                <h1 className={styles.title}>¡Bienvenidos!</h1>
                <p>Elige una opción para continuar</p>
                <div className={styles.links}>
                    <Link href="/login" className={styles.link}>
                        <FaSignInAlt className={styles.icon} /> Iniciar Sesión
                    </Link>
                    <Link href="/registro" className={styles.link}>
                        <FaUserPlus className={styles.icon} /> Registrarme
                    </Link>
                </div>
            </div>
        </div>
    );
}
