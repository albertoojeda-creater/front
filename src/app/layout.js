export const metadata = {
    title: 'Frontend',
    description: 'Sitio del Frontend',
}

export default function RootLayout({children}) {
    return (
        <html lang="es">
            <body>
                {children}
            </body>
        </html>
    )
}