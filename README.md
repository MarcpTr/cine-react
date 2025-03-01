# cine-react
Esta es una aplicación web desarrollada con React, ReactDOM, React Router, Firebase, Tailwind CSS y utilizando Vite como herramienta de desarrollo. La aplicación se conecta a la API REST de themoviedb para permitir a los usuarios explorar una amplia variedad de películas, ver detalles, y gestionar sus listas de películas favoritas, vistas y pendientes.
(https://cine-react.marcpericot.es/)
![](https://raw.githubusercontent.com/MarcpTr/cine-react/main/index.JPG)
![](https://raw.githubusercontent.com/MarcpTr/cine-react/main/info.JPG)


## Funcionalidades

-   **Explorar películas**: Consulta películas populares, recientes y de géneros específicos mediante una API REST.
-   **Detalle de películas**: Visualiza la información detallada de cada película, incluyendo descripción, elenco, tráiler y más.
-   **Listas personalizadas**:
    -   **Favoritas**: Guarda tus películas favoritas.
    -   **Vistas**: Marca las películas que ya has visto.
    -   **Pendientes**: Añade películas que planeas ver más adelante.
-   **Autenticación con Firebase**: Los usuarios pueden crear una cuenta y acceder mediante Firebase Authentication.
-   **Sincronización en la nube**: Guarda las listas de películas y preferencias del usuario en la base de datos de Firebase.
## Tecnologías Utilizadas

-   **React**: Biblioteca principal para construir la interfaz de usuario.
-   **ReactDOM**: Manejador del DOM para aplicaciones de React.
-   **React Router**: Navegación y manejo de rutas entre las distintas páginas de la aplicación.
-   **Firebase**: Autenticación de usuarios y almacenamiento de listas personalizadas.
    -   **Firebase Authentication**: Registro y login de usuarios.
    -   **Firebase Firestore**: Almacenamiento de las listas de películas de cada usuario.
-   **Tailwind CSS**: Estilizado de componentes de manera eficiente con clases utilitarias.
-   **Vite**: Herramienta de desarrollo rápida para construir y servir el proyecto.
-   **API REST**: Se conecta a una API pública de películas (TMDB) para obtener datos actualizados.

## Instalación

1.  **Clonar el repositorio**
    

    
    `git clone https://github.com/MarcpTr/cine-react/`
   ` cd cine-react` 
    
2.  **Instalar dependencias**
    
    `npm install` 
    
3.  **Configurar Firebase**

-   Crea un proyecto en [Firebase](https://firebase.google.com/).
-   Configura la autenticación de Firebase (por ejemplo, con Google o Email/Contraseña).
-   Configura Firestore para almacenar las listas de películas.
-   Copia las credenciales de tu proyecto y pégalas en el archivo `src/firebase.js`.
4. **Configurar la API de Películas**

-   Regístrate en la API de películas  [TMDB](https://www.themoviedb.org/).
-   Crea una clave API y configúrala en las const api_key:
`api_key=your_api_key_here`
5. **Compilar proyecto**
`
npm run build
`
