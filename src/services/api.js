const API_BASE_URL =
    "https://api-cine.marcpericot.es/api/data";

async function request(endpoint) {
    const response =
        await fetch(
            `${API_BASE_URL}${endpoint}`
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
        const error = new Error(
            result?.error?.message ||
            `Error HTTP ${response.status}`
        );

        error.code =
            result?.error?.code ||
            "HTTP_ERROR";

        error.details =
            result?.error?.details ||
            null;

        throw error;
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

export async function getTrendingMovies(
    timeWindow,
    page = 1
) {
    const period =
        timeWindow.toUpperCase();

    const params =
        new URLSearchParams({
            period,
            page: String(page),
        });

    return request(
        `/trending?${params.toString()}`
    );
}

export async function searchMovies(
    searchQuery,
    page = 1
) {
    const params =
        new URLSearchParams({
            query: searchQuery.trim(),
            page: String(page),
        });

    return request(
        `/search?${params.toString()}`
    );
}

export async function getMovie(movieId) {
    return request(
        `/movie/${encodeURIComponent(movieId)}`
    );
}