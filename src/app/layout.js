export const metadata = {
    title: 'Frontend',
    description: 'Sitio del Frontend',
}

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body style={{ margin: 0, padding: 0 }}>
                {children}
            </body>
        </html>
    );
}