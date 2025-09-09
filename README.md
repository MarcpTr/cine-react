# cine-react
This is a web application developed using React, ReactDOM, React Router, Firebase, Tailwind CSS, and Vite as the development tool. The app connects to the TheMovieDB REST API, allowing users to explore a wide variety of movies, view details, and manage their lists of favorite, watched, and to-watch movies.
(https://cine-react.marcpericot.es/)
![](https://raw.githubusercontent.com/MarcpTr/cine-react/main/index.PNG)
![](https://raw.githubusercontent.com/MarcpTr/cine-react/main/info.PNG)


## Features

-   **Explore Movies**: Browse popular, recent, and genre-specific movies via a REST API.
-   **Movie Details**: View detailed information about each movie, including description, cast, trailer, and more.
-   **Custom Lists**:
    -   **Favorites**: Save your favorite movies.
    -   **Watched**: Mark movies you've already watched.
    -   **Watchlist**: Add movies you plan to watch later.
-   **Firebase Authentication**: Users can create accounts and log in using Firebase Authentication.
-   **Cloud Sync**: Movie lists and user preferences are stored in Firebase's cloud database.
## Technologies

-   **React**: Main library for building the user interface.
-   **ReactDOM**: DOM rendering for React applications.
-   **React Router**: Handles routing and navigation between pages.
-   **Firebase**: For user authentication and storing movie lists.
    -   **Firebase Authentication**: For user sign-up and login.
    -   **Firebase Firestore**: Stores each user’s movie lists in the cloud.
-   **Tailwind CSS**: Utility-first CSS framework for fast UI styling.
-   **Vite**: Fast development and build tool.
-   **API REST**: Connects to the public TMDB movie API to fetch updated movie data.

## Installation

1.  **Clone the repository**
    

    
    `git clone https://github.com/MarcpTr/cine-react/`
   ` cd cine-react` 
    
2.  **Install dependencies**
    
    `npm install` 
    
3.  **Configure Firebase**

-   Create a project in [Firebase](https://firebase.google.com/).
-   Set up Firebase Authentication.
-   Set up Firestore to store the movie lists.
-   Copy your project credentials and paste them into the `src/firebase.js` file.
4. **Configure the Movie API**

-   Sign up for the [TMDB](https://www.themoviedb.org/) movie API.
-   Create an API key and set it in the `api_key constant`:
`api_key=your_api_key_here`
5. **Build the project**
`
npm run build
`
