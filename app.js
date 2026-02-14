// Configuration API TMDB
const API_KEY = 'a8b9f3e8f7d4c3b2a1e9f8d7c6b5a4e3'; // Clé API par défaut - Remplacer par votre propre clé
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const POSTER_SIZE = 'w500';
const BACKDROP_SIZE = 'original';

// État de l'application
let currentPage = 1;
let totalPages = 1;
let currentFilters = {
    search: '',
    genre: '',
    year: '',
    sort: 'popularity.desc'
};

// Éléments DOM
const elements = {
    search: document.getElementById('search'),
    genre: document.getElementById('genre'),
    year: document.getElementById('year'),
    sort: document.getElementById('sort'),
    applyFilters: document.getElementById('applyFilters'),
    moviesGrid: document.getElementById('moviesGrid'),
    loading: document.getElementById('loading'),
    pagination: document.getElementById('pagination'),
    prevPage: document.getElementById('prevPage'),
    nextPage: document.getElementById('nextPage'),
    pageInfo: document.getElementById('pageInfo'),
    noResults: document.getElementById('noResults'),
    movieModal: document.getElementById('movieModal'),
    closeModal: document.getElementById('closeModal'),
    modalBody: document.getElementById('modalBody')
};

// Initialisation de l'application
async function init() {
    await loadGenres();
    populateYears();
    attachEventListeners();
    loadMovies();
}

// Charger les genres depuis l'API
async function loadGenres() {
    try {
        const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=fr-FR`);
        const data = await response.json();

        data.genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre.id;
            option.textContent = genre.name;
            elements.genre.appendChild(option);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des genres:', error);
    }
}

// Remplir le sélecteur d'années
function populateYears() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        elements.year.appendChild(option);
    }
}

// Attacher les écouteurs d'événements
function attachEventListeners() {
    elements.applyFilters.addEventListener('click', () => {
        currentPage = 1;
        updateFilters();
        loadMovies();
    });

    elements.search.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            currentPage = 1;
            updateFilters();
            loadMovies();
        }
    });

    elements.prevPage.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            loadMovies();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    elements.nextPage.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            loadMovies();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    elements.closeModal.addEventListener('click', closeMovieModal);
    elements.movieModal.addEventListener('click', (e) => {
        if (e.target === elements.movieModal) {
            closeMovieModal();
        }
    });

    // Fermer la modal avec Echap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !elements.movieModal.classList.contains('hidden')) {
            closeMovieModal();
        }
    });
}

// Mettre à jour les filtres
function updateFilters() {
    currentFilters.search = elements.search.value.trim();
    currentFilters.genre = elements.genre.value;
    currentFilters.year = elements.year.value;
    currentFilters.sort = elements.sort.value;
}

// Charger les films
async function loadMovies() {
    showLoading();

    try {
        const url = currentFilters.search
            ? buildSearchUrl()
            : buildDiscoverUrl();

        const response = await fetch(url);
        const data = await response.json();

        totalPages = data.total_pages;

        if (data.results && data.results.length > 0) {
            displayMovies(data.results);
            updatePagination();
            elements.noResults.classList.add('hidden');
        } else {
            elements.moviesGrid.innerHTML = '';
            elements.pagination.classList.add('hidden');
            elements.noResults.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Erreur lors du chargement des films:', error);
        elements.moviesGrid.innerHTML = '<p style="text-align: center; color: #e50914;">Erreur lors du chargement. Vérifiez votre clé API.</p>';
    } finally {
        hideLoading();
    }
}

// Construire l'URL de recherche
function buildSearchUrl() {
    const params = new URLSearchParams({
        api_key: API_KEY,
        language: 'fr-FR',
        query: currentFilters.search,
        page: currentPage
    });

    if (currentFilters.year) {
        params.append('year', currentFilters.year);
    }

    return `${BASE_URL}/search/movie?${params}`;
}

// Construire l'URL de découverte
function buildDiscoverUrl() {
    const params = new URLSearchParams({
        api_key: API_KEY,
        language: 'fr-FR',
        sort_by: currentFilters.sort,
        page: currentPage,
        'vote_count.gte': 100 // Au moins 100 votes pour avoir des films pertinents
    });

    if (currentFilters.genre) {
        params.append('with_genres', currentFilters.genre);
    }

    if (currentFilters.year) {
        params.append('year', currentFilters.year);
    }

    return `${BASE_URL}/discover/movie?${params}`;
}

// Afficher les films
function displayMovies(movies) {
    elements.moviesGrid.innerHTML = movies.map(movie => createMovieCard(movie)).join('');

    // Ajouter les écouteurs de clic sur les cartes
    document.querySelectorAll('.movie-card').forEach(card => {
        card.addEventListener('click', () => {
            const movieId = card.dataset.movieId;
            openMovieModal(movieId);
        });
    });
}

// Créer une carte de film
function createMovieCard(movie) {
    const posterPath = movie.poster_path
        ? `${IMAGE_BASE_URL}/${POSTER_SIZE}${movie.poster_path}`
        : 'https://via.placeholder.com/500x750/1f1f1f/ffffff?text=Pas+d\'affiche';

    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

    return `
        <div class="movie-card" data-movie-id="${movie.id}">
            <img src="${posterPath}" alt="${movie.title}" class="movie-poster" loading="lazy">
            <div class="movie-info">
                <h3 class="movie-title" title="${movie.title}">${movie.title}</h3>
                <div class="movie-meta">
                    <span class="movie-rating">
                        <span class="star">⭐</span> ${rating}
                    </span>
                    <span class="movie-year">${year}</span>
                </div>
            </div>
        </div>
    `;
}

// Ouvrir la modal de film
async function openMovieModal(movieId) {
    showLoading();
    elements.movieModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr-FR&append_to_response=credits`);
        const movie = await response.json();

        displayMovieDetails(movie);
    } catch (error) {
        console.error('Erreur lors du chargement des détails:', error);
        elements.modalBody.innerHTML = '<p style="padding: 40px; text-align: center;">Erreur lors du chargement des détails.</p>';
    } finally {
        hideLoading();
    }
}

// Afficher les détails du film
function displayMovieDetails(movie) {
    const backdropPath = movie.backdrop_path
        ? `${IMAGE_BASE_URL}/${BACKDROP_SIZE}${movie.backdrop_path}`
        : `${IMAGE_BASE_URL}/${POSTER_SIZE}${movie.poster_path}`;

    const releaseDate = movie.release_date
        ? new Date(movie.release_date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'Date inconnue';

    const runtime = movie.runtime ? `${movie.runtime} min` : 'N/A';
    const budget = movie.budget ? `${(movie.budget / 1000000).toFixed(1)}M $` : 'N/A';
    const revenue = movie.revenue ? `${(movie.revenue / 1000000).toFixed(1)}M $` : 'N/A';
    const genres = movie.genres.map(g => g.name).join(', ') || 'N/A';

    const director = movie.credits?.crew?.find(person => person.job === 'Director')?.name || 'N/A';
    const cast = movie.credits?.cast?.slice(0, 5).map(actor => actor.name).join(', ') || 'N/A';

    elements.modalBody.innerHTML = `
        <div class="modal-header">
            <img src="${backdropPath}" alt="${movie.title}" class="modal-backdrop">
            <div class="modal-overlay">
                <h2 class="modal-title">${movie.title}</h2>
                <div class="modal-meta">
                    <span>⭐ ${movie.vote_average.toFixed(1)}/10</span>
                    <span>📅 ${releaseDate}</span>
                    <span>⏱️ ${runtime}</span>
                </div>
            </div>
        </div>
        <div class="modal-body-content">
            <p class="modal-overview">${movie.overview || 'Aucune description disponible.'}</p>
            <div class="modal-details">
                <div class="detail-item">
                    <div class="detail-label">🎭 Genres</div>
                    <div class="detail-value">${genres}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">🎬 Réalisateur</div>
                    <div class="detail-value">${director}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">🎭 Casting</div>
                    <div class="detail-value">${cast}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">💰 Budget</div>
                    <div class="detail-value">${budget}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">💵 Revenus</div>
                    <div class="detail-value">${revenue}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">🌍 Langue</div>
                    <div class="detail-value">${movie.original_language.toUpperCase()}</div>
                </div>
            </div>
        </div>
    `;
}

// Fermer la modal
function closeMovieModal() {
    elements.movieModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Mettre à jour la pagination
function updatePagination() {
    elements.pageInfo.textContent = `Page ${currentPage} sur ${totalPages}`;
    elements.prevPage.disabled = currentPage === 1;
    elements.nextPage.disabled = currentPage === totalPages;
    elements.pagination.classList.remove('hidden');
}

// Afficher le chargement
function showLoading() {
    elements.loading.classList.remove('hidden');
}

// Masquer le chargement
function hideLoading() {
    elements.loading.classList.add('hidden');
}

// Démarrer l'application
init();
