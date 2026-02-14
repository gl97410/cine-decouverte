// ===== Configuration API TMDB =====
const API_KEY = 'b1822a60470394719692a56113c4e7f2'; // Remplacez par votre clé API TMDB
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const POSTER_SIZE = 'w500';
const BACKDROP_SIZE = 'original';
const YOUTUBE_BASE_URL = 'https://www.youtube.com/embed/';

// ===== État de l'application =====
let currentPage = 1;
let totalPages = 1;
let allMovies = [];
let currentFilters = {
    age: '',
    genre: '',
    director: '',
    actor: '',
    yearMin: 2004,
    yearMax: 2026,
    rating: 6.0
};

// ===== Éléments DOM =====
const elements = {
    // Filters
    filterForm: document.getElementById('filterForm'),
    ageFilter: document.getElementById('ageFilter'),
    genreFilter: document.getElementById('genreFilter'),
    directorFilter: document.getElementById('directorFilter'),
    actorFilter: document.getElementById('actorFilter'),
    yearFilterMin: document.getElementById('yearFilterMin'),
    yearFilterMax: document.getElementById('yearFilterMax'),
    yearMin: document.getElementById('yearMin'),
    yearMax: document.getElementById('yearMax'),
    ratingFilter: document.getElementById('ratingFilter'),
    ratingValue: document.getElementById('ratingValue'),
    clearFilters: document.getElementById('clearFilters'),

    // Results
    resultsSection: document.getElementById('resultsSection'),
    resultsCount: document.getElementById('resultsCount'),
    moviesGrid: document.getElementById('moviesGrid'),
    loadMoreBtn: document.getElementById('loadMoreBtn'),
    loading: document.getElementById('loading'),
    noResults: document.getElementById('noResults'),

    // Modal
    movieModal: document.getElementById('movieModal'),
    closeModal: document.getElementById('closeModal'),
    modalBody: document.getElementById('modalBody')
};

// ===== Initialisation =====
async function init() {
    console.log('🎬 Initialisation de Films en Famille...');

    // Charger les filtres sauvegardés
    loadSavedFilters();

    // Charger les genres
    await loadGenres();

    // Attacher les événements
    attachEventListeners();

    // Charger les films avec les filtres sauvegardés
    if (hasActiveFilters()) {
        searchMovies();
    }

    console.log('✅ Application prête !');
}

// ===== Gestion des événements =====
function attachEventListeners() {
    // Formulaire de recherche
    elements.filterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        currentPage = 1;
        allMovies = [];
        searchMovies();
    });

    // Bouton vider filtres
    elements.clearFilters.addEventListener('click', clearAllFilters);

    // Sliders avec mise à jour en temps réel
    elements.yearFilterMin.addEventListener('input', updateYearDisplay);
    elements.yearFilterMax.addEventListener('input', updateYearDisplay);
    elements.ratingFilter.addEventListener('input', updateRatingDisplay);

    // Bouton charger plus
    elements.loadMoreBtn.addEventListener('click', loadMoreMovies);

    // Modal
    elements.closeModal.addEventListener('click', closeModal);
    elements.movieModal.addEventListener('click', (e) => {
        if (e.target === elements.movieModal || e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });

    // Fermer modal avec Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !elements.movieModal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

// ===== Charger les genres =====
async function loadGenres() {
    try {
        const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=fr-FR`);

        if (!response.ok) {
            throw new Error('Erreur lors du chargement des genres');
        }

        const data = await response.json();

        // Genres prioritaires pour les familles
        const familyGenres = [16, 10751, 35, 12, 14]; // Animation, Famille, Comédie, Aventure, Fantastique
        const sortedGenres = data.genres.sort((a, b) => {
            const aIsFamilyGenre = familyGenres.includes(a.id);
            const bIsFamilyGenre = familyGenres.includes(b.id);
            if (aIsFamilyGenre && !bIsFamilyGenre) return -1;
            if (!aIsFamilyGenre && bIsFamilyGenre) return 1;
            return a.name.localeCompare(b.name);
        });

        sortedGenres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre.id;
            option.textContent = genre.name;
            elements.genreFilter.appendChild(option);
        });
    } catch (error) {
        console.error('❌ Erreur chargement genres:', error);
        showError('Impossible de charger les genres. Vérifiez votre clé API.');
    }
}

// ===== Mise à jour des affichages =====
function updateYearDisplay() {
    const min = parseInt(elements.yearFilterMin.value);
    const max = parseInt(elements.yearFilterMax.value);

    // S'assurer que min <= max
    if (min > max) {
        elements.yearFilterMin.value = max;
        elements.yearFilterMax.value = min;
    }

    elements.yearMin.textContent = elements.yearFilterMin.value;
    elements.yearMax.textContent = elements.yearFilterMax.value;
}

function updateRatingDisplay() {
    elements.ratingValue.textContent = parseFloat(elements.ratingFilter.value).toFixed(1);
}

// ===== Recherche de films =====
async function searchMovies() {
    showLoading();
    saveFilters();

    try {
        // Récupérer les IDs des personnes si nécessaire
        const directorId = elements.directorFilter.value.trim()
            ? await searchPerson(elements.directorFilter.value.trim(), 'director')
            : null;

        const actorId = elements.actorFilter.value.trim()
            ? await searchPerson(elements.actorFilter.value.trim(), 'actor')
            : null;

        // Construire l'URL de recherche
        const url = buildDiscoverUrl(directorId, actorId);

        console.log('🔍 Recherche:', url);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erreur API: ${response.status}`);
        }

        const data = await response.json();

        totalPages = data.total_pages;
        allMovies = data.results || [];

        displayResults(allMovies);

    } catch (error) {
        console.error('❌ Erreur recherche:', error);
        showError('Une erreur est survenue lors de la recherche. Vérifiez votre connexion et votre clé API.');
    } finally {
        hideLoading();
    }
}

// ===== Charger plus de films =====
async function loadMoreMovies() {
    if (currentPage >= totalPages) {
        elements.loadMoreBtn.classList.add('hidden');
        return;
    }

    currentPage++;
    elements.loadMoreBtn.disabled = true;
    elements.loadMoreBtn.textContent = '⏳ Chargement...';

    try {
        const directorId = elements.directorFilter.value.trim()
            ? await searchPerson(elements.directorFilter.value.trim(), 'director')
            : null;

        const actorId = elements.actorFilter.value.trim()
            ? await searchPerson(elements.actorFilter.value.trim(), 'actor')
            : null;

        const url = buildDiscoverUrl(directorId, actorId);
        const response = await fetch(url);
        const data = await response.json();

        const newMovies = data.results || [];
        allMovies = [...allMovies, ...newMovies];

        // Ajouter seulement les nouveaux films
        newMovies.forEach(movie => {
            const card = createMovieCard(movie);
            elements.moviesGrid.insertAdjacentHTML('beforeend', card);
        });

        // Réattacher les événements
        attachMovieCardEvents();

        elements.loadMoreBtn.disabled = false;
        elements.loadMoreBtn.textContent = '📽️ Charger plus de films';

        if (currentPage >= totalPages) {
            elements.loadMoreBtn.classList.add('hidden');
        }

    } catch (error) {
        console.error('❌ Erreur chargement:', error);
        elements.loadMoreBtn.disabled = false;
        elements.loadMoreBtn.textContent = '❌ Erreur - Réessayer';
    }
}

// ===== Rechercher une personne (réalisateur/acteur) =====
async function searchPerson(name, role) {
    try {
        const response = await fetch(
            `${BASE_URL}/search/person?api_key=${API_KEY}&language=fr-FR&query=${encodeURIComponent(name)}`
        );

        if (!response.ok) return null;

        const data = await response.json();

        if (data.results && data.results.length > 0) {
            // Pour les réalisateurs, vérifier le département
            if (role === 'director') {
                const director = data.results.find(p => p.known_for_department === 'Directing');
                return director ? director.id : data.results[0].id;
            }

            return data.results[0].id;
        }

        return null;
    } catch (error) {
        console.error(`❌ Erreur recherche ${role}:`, error);
        return null;
    }
}

// ===== Construire l'URL de découverte =====
function buildDiscoverUrl(directorId, actorId) {
    const params = new URLSearchParams({
        api_key: API_KEY,
        language: 'fr-FR',
        region: 'FR',
        sort_by: 'popularity.desc',
        page: currentPage,
        'vote_count.gte': 50
    });

    // Filtre d'âge (certification)
    const age = elements.ageFilter.value;
    if (age) {
        params.append('certification_country', 'US');
        params.append('certification.lte', age.split(',')[age.split(',').length - 1]);
    }

    // Genre
    const genre = elements.genreFilter.value;
    if (genre) {
        params.append('with_genres', genre);
    }

    // Année
    const yearMin = parseInt(elements.yearFilterMin.value);
    const yearMax = parseInt(elements.yearFilterMax.value);
    params.append('primary_release_date.gte', `${yearMin}-01-01`);
    params.append('primary_release_date.lte', `${yearMax}-12-31`);

    // Note minimale
    const rating = parseFloat(elements.ratingFilter.value);
    params.append('vote_average.gte', rating);

    // Réalisateur
    if (directorId) {
        params.append('with_crew', directorId);
    }

    // Acteur
    if (actorId) {
        params.append('with_cast', actorId);
    }

    return `${BASE_URL}/discover/movie?${params}`;
}

// ===== Afficher les résultats =====
function displayResults(movies) {
    if (!movies || movies.length === 0) {
        showNoResults();
        return;
    }

    elements.noResults.classList.add('hidden');
    elements.resultsSection.classList.remove('hidden');
    elements.resultsCount.textContent = `(${movies.length} film${movies.length > 1 ? 's' : ''})`;

    elements.moviesGrid.innerHTML = movies.map(movie => createMovieCard(movie)).join('');

    // Afficher le bouton "Charger plus" si nécessaire
    if (currentPage < totalPages) {
        elements.loadMoreBtn.classList.remove('hidden');
    } else {
        elements.loadMoreBtn.classList.add('hidden');
    }

    attachMovieCardEvents();
}

// ===== Créer une carte de film =====
function createMovieCard(movie) {
    const posterPath = movie.poster_path
        ? `${IMAGE_BASE_URL}/${POSTER_SIZE}${movie.poster_path}`
        : 'https://via.placeholder.com/500x750/E8F4FD/4A90E2?text=Pas+d\'affiche';

    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    const overview = movie.overview || 'Pas de synopsis disponible.';

    // Genres (limité aux 2 premiers)
    const genreNames = getGenreNames(movie.genre_ids).slice(0, 2).join(', ') || 'Non classé';

    // Certification (simulée basée sur la note et les genres)
    const certification = getCertification(movie);

    return `
        <div class="movie-card" data-movie-id="${movie.id}" role="listitem">
            <img src="${posterPath}" alt="Affiche de ${movie.title}" class="movie-poster" loading="lazy">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span class="movie-rating" aria-label="Note: ${rating} sur 10">
                        ⭐ ${rating}
                    </span>
                    <span class="movie-year" aria-label="Année: ${year}">${year}</span>
                    ${certification ? `<span class="movie-certification" aria-label="Classification: ${certification}">${certification}</span>` : ''}
                </div>
                <div class="movie-genres" aria-label="Genres: ${genreNames}">
                    🎭 ${genreNames}
                </div>
                <p class="movie-overview">${overview}</p>
            </div>
        </div>
    `;
}

// ===== Obtenir les noms de genres =====
function getGenreNames(genreIds) {
    const genreMap = {
        28: 'Action', 12: 'Aventure', 16: 'Animation', 35: 'Comédie',
        80: 'Crime', 99: 'Documentaire', 18: 'Drame', 10751: 'Famille',
        14: 'Fantastique', 36: 'Histoire', 27: 'Horreur', 10402: 'Musique',
        9648: 'Mystère', 10749: 'Romance', 878: 'Science-Fiction',
        10770: 'Téléfilm', 53: 'Thriller', 10752: 'Guerre', 37: 'Western'
    };

    return genreIds ? genreIds.map(id => genreMap[id] || 'Autre').filter(Boolean) : [];
}

// ===== Obtenir la certification =====
function getCertification(movie) {
    // Simulation basée sur la note et les genres
    const familyGenres = [16, 10751, 35, 12, 14];
    const hasFamilyGenre = movie.genre_ids?.some(id => familyGenres.includes(id));

    if (hasFamilyGenre && movie.vote_average >= 6) {
        return 'G';
    } else if (movie.vote_average >= 7) {
        return 'PG';
    } else if (movie.vote_average >= 6) {
        return 'PG-13';
    }

    return null;
}

// ===== Attacher les événements aux cartes =====
function attachMovieCardEvents() {
    document.querySelectorAll('.movie-card').forEach(card => {
        card.addEventListener('click', () => {
            const movieId = card.dataset.movieId;
            openMovieModal(movieId);
        });

        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const movieId = card.dataset.movieId;
                openMovieModal(movieId);
            }
        });
    });
}

// ===== Ouvrir la modal du film =====
async function openMovieModal(movieId) {
    elements.movieModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    elements.modalBody.innerHTML = '<div class="loading"><div class="spinner"></div><p>Chargement des détails...</p></div>';

    try {
        const response = await fetch(
            `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr-FR&append_to_response=credits,videos`
        );

        if (!response.ok) {
            throw new Error('Erreur lors du chargement des détails');
        }

        const movie = await response.json();
        displayMovieDetails(movie);

    } catch (error) {
        console.error('❌ Erreur modal:', error);
        elements.modalBody.innerHTML = '<p style="padding: 40px; text-align: center;">Erreur lors du chargement des détails.</p>';
    }
}

// ===== Afficher les détails du film =====
function displayMovieDetails(movie) {
    const backdropPath = movie.backdrop_path
        ? `${IMAGE_BASE_URL}/${BACKDROP_SIZE}${movie.backdrop_path}`
        : movie.poster_path
        ? `${IMAGE_BASE_URL}/${BACKDROP_SIZE}${movie.poster_path}`
        : 'https://via.placeholder.com/1280x720/E8F4FD/4A90E2?text=Pas+d\'image';

    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
    const runtime = movie.runtime ? `${movie.runtime} min` : 'N/A';
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    const genres = movie.genres?.map(g => g.name).join(', ') || 'N/A';

    // Trailer YouTube
    const trailer = movie.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
    const trailerHtml = trailer
        ? `
        <div class="modal-section">
            <h3 class="modal-section-title">🎬 Bande-annonce</h3>
            <iframe
                class="modal-trailer"
                src="${YOUTUBE_BASE_URL}${trailer.key}"
                title="Bande-annonce de ${movie.title}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
        </div>
        `
        : '';

    // Casting principal
    const cast = movie.credits?.cast?.slice(0, 8).map(actor => actor.name) || [];
    const castHtml = cast.length > 0
        ? `
        <div class="modal-section">
            <h3 class="modal-section-title">🌟 Casting principal</h3>
            <div class="modal-cast">
                ${cast.map(name => `<span class="cast-member">${name}</span>`).join('')}
            </div>
        </div>
        `
        : '';

    // Réalisateur
    const director = movie.credits?.crew?.find(person => person.job === 'Director');
    const directorName = director ? director.name : 'N/A';

    elements.modalBody.innerHTML = `
        <img src="${backdropPath}" alt="Image de fond de ${movie.title}" class="modal-backdrop">

        <h2 id="modalTitle" class="modal-title">${movie.title}</h2>

        <div class="modal-meta">
            <span class="modal-meta-item">⭐ ${rating}/10</span>
            <span class="modal-meta-item">📅 ${year}</span>
            <span class="modal-meta-item">⏱️ ${runtime}</span>
            <span class="modal-meta-item">🎭 ${genres}</span>
        </div>

        <p class="modal-overview">${movie.overview || 'Pas de synopsis disponible.'}</p>

        <div class="modal-section">
            <h3 class="modal-section-title">📋 Informations</h3>
            <p><strong>Réalisateur:</strong> ${directorName}</p>
            <p><strong>Langue originale:</strong> ${movie.original_language?.toUpperCase() || 'N/A'}</p>
            ${movie.budget ? `<p><strong>Budget:</strong> ${(movie.budget / 1000000).toFixed(1)}M $</p>` : ''}
            ${movie.revenue ? `<p><strong>Revenus:</strong> ${(movie.revenue / 1000000).toFixed(1)}M $</p>` : ''}
        </div>

        ${trailerHtml}
        ${castHtml}
    `;
}

// ===== Fermer la modal =====
function closeModal() {
    elements.movieModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// ===== Vider les filtres =====
function clearAllFilters() {
    elements.ageFilter.value = '';
    elements.genreFilter.value = '';
    elements.directorFilter.value = '';
    elements.actorFilter.value = '';
    elements.yearFilterMin.value = 2004;
    elements.yearFilterMax.value = 2026;
    elements.ratingFilter.value = 6.0;

    updateYearDisplay();
    updateRatingDisplay();

    currentPage = 1;
    allMovies = [];
    elements.resultsSection.classList.add('hidden');
    elements.noResults.classList.add('hidden');

    localStorage.removeItem('movieFilters');
}

// ===== Sauvegarder les filtres =====
function saveFilters() {
    const filters = {
        age: elements.ageFilter.value,
        genre: elements.genreFilter.value,
        director: elements.directorFilter.value,
        actor: elements.actorFilter.value,
        yearMin: elements.yearFilterMin.value,
        yearMax: elements.yearFilterMax.value,
        rating: elements.ratingFilter.value
    };

    localStorage.setItem('movieFilters', JSON.stringify(filters));
}

// ===== Charger les filtres sauvegardés =====
function loadSavedFilters() {
    try {
        const saved = localStorage.getItem('movieFilters');
        if (!saved) return;

        const filters = JSON.parse(saved);

        elements.ageFilter.value = filters.age || '';
        elements.genreFilter.value = filters.genre || '';
        elements.directorFilter.value = filters.director || '';
        elements.actorFilter.value = filters.actor || '';
        elements.yearFilterMin.value = filters.yearMin || 2004;
        elements.yearFilterMax.value = filters.yearMax || 2026;
        elements.ratingFilter.value = filters.rating || 6.0;

        updateYearDisplay();
        updateRatingDisplay();

        console.log('✅ Filtres restaurés:', filters);
    } catch (error) {
        console.error('❌ Erreur chargement filtres:', error);
    }
}

// ===== Vérifier si des filtres sont actifs =====
function hasActiveFilters() {
    return elements.ageFilter.value ||
           elements.genreFilter.value ||
           elements.directorFilter.value.trim() ||
           elements.actorFilter.value.trim();
}

// ===== Afficher le chargement =====
function showLoading() {
    elements.loading.classList.remove('hidden');
    elements.resultsSection.classList.add('hidden');
    elements.noResults.classList.add('hidden');
}

// ===== Masquer le chargement =====
function hideLoading() {
    elements.loading.classList.add('hidden');
}

// ===== Afficher aucun résultat =====
function showNoResults() {
    elements.resultsSection.classList.add('hidden');
    elements.noResults.classList.remove('hidden');
}

// ===== Afficher une erreur =====
function showError(message) {
    elements.noResults.classList.remove('hidden');
    elements.noResults.querySelector('.no-results-content').innerHTML = `
        <span class="no-results-icon">❌</span>
        <h3>Erreur</h3>
        <p>${message}</p>
    `;
}

// ===== Démarrer l'application =====
document.addEventListener('DOMContentLoaded', init);
