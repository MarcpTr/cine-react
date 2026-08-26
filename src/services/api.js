const API_BASE_URL = "http://localhost:8083/api/data";

async function request(
    endpoint,
    options = {}
) {
    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        }
    );

    let result;

    try {
        result = await response.json();
    } catch {
        throw new Error(
            "El servidor devolvió una respuesta no válida."
        );
    }

    if (!response.ok) {
        throw new Error(
            result?.error?.message ||
            `Error HTTP ${response.status}`
        );
    }

    if (!result.success) {
        const error = new Error(
            result?.error?.message ||
            "La petición no se pudo completar."
        );

        error.code =
            result?.error?.code ||
            "API_ERROR";

        error.details =
            result?.error?.details ||
            null;

        throw error;
    }

    return result.data;
}

export async function getMovie(movieId) {
    if (!movieId) {
        throw new Error(
            "El ID de la película es obligatorio."
        );
    }

    return request(
        `/movie/${encodeURIComponent(movieId)}`
    );
}

export async function searchMovies(
    searchQuery,
    page = 1
) {
    const query = searchQuery.trim();

    if (!query) {
        return null;
    }

    const params = new URLSearchParams({
        query,
        page: String(page),
    });

    return request(
        `/search?${params.toString()}`
    );
}

export async function getTrendingMovies(
    timeWindow,
    page = 1
) {
    const period =
        timeWindow.toUpperCase();

    const params = new URLSearchParams({
        period,
        page: String(page),
    });

    return request(
        `/trending?${params.toString()}`
    );
}