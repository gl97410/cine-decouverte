# 🎬 CinéDécouverte

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![TMDB](https://img.shields.io/badge/API-TMDB-01D277?logo=themoviedatabase)

Application web moderne de découverte de films et séries avec filtres avancés, propulsée par l'API TMDB.

## ✨ Fonctionnalités

- 🔍 **Recherche intelligente** par titre
- 🎭 **Filtrage par genre** (Action, Comédie, Drame, etc.)
- 📅 **Filtrage par année** de sortie
- 📊 **Tri personnalisé** (Popularité, Note, Date de sortie, Titre)
- 🎬 **Détails complets** des films (synopsis, casting, budget, etc.)
- 📱 **Design responsive** adapté à tous les écrans
- ⚡ **Interface rapide** et intuitive
- 🌐 **Pagination** pour naviguer entre les résultats

## 🚀 Démo en ligne

[Voir la démo](https://VOTRE_USERNAME.github.io/cine-decouverte)

## 📸 Aperçu

L'application affiche une grille de films avec :
- Affiches haute qualité
- Notes et années de sortie
- Modal détaillée au clic
- Filtres en temps réel

## 🛠️ Installation

### Prérequis

1. Obtenir une clé API TMDB gratuite sur [themoviedb.org](https://www.themoviedb.org/settings/api)

### Configuration locale

1. Cloner le repository
```bash
git clone https://github.com/VOTRE_USERNAME/cine-decouverte.git
cd cine-decouverte
```

2. Configurer la clé API

Ouvrez [app.js](app.js) et remplacez la clé API par la vôtre :
```javascript
const API_KEY = 'VOTRE_CLE_API_ICI';
```

3. Lancer l'application

Ouvrez simplement [index.html](index.html) dans votre navigateur ou utilisez un serveur local :
```bash
# Option 1 : Python
python -m http.server 8000

# Option 2 : Node.js (http-server)
npx http-server

# Option 3 : PHP
php -S localhost:8000
```

Puis ouvrez http://localhost:8000 dans votre navigateur.

## 📤 Déploiement sur GitHub Pages

### Méthode simple (sans GitHub Actions)

1. Créer un repository sur GitHub
2. Pousser le code
```bash
git add .
git commit -m "🎬 Initial commit"
git push origin main
```

3. Activer GitHub Pages
   - Aller dans Settings → Pages
   - Source : `main` branch, dossier `/root`
   - Enregistrer

Votre app sera disponible sur : `https://VOTRE_USERNAME.github.io/cine-decouverte`

### Méthode avancée (avec GitHub Actions)

Le fichier workflow est déjà configuré. Il suffit de :
1. Créer un dossier `.github/workflows/`
2. Déplacer `.github-workflows-deploy.yml` vers `.github/workflows/deploy.yml`
3. Ajouter votre clé API dans les secrets GitHub :
   - Settings → Secrets and variables → Actions
   - New repository secret : `VITE_TMDB_API_KEY`

## 🎯 Utilisation

1. **Rechercher un film** : Tapez le titre dans la barre de recherche
2. **Filtrer par genre** : Sélectionnez un genre dans le menu déroulant
3. **Filtrer par année** : Choisissez une année spécifique
4. **Trier** : Organisez par popularité, note, ou date
5. **Cliquer sur un film** : Voir tous les détails (synopsis, casting, budget)
6. **Naviguer** : Utilisez les boutons de pagination

## 🔧 Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Design moderne avec animations
- **JavaScript (Vanilla)** : Logique et API
- **TMDB API** : Base de données de films
- **GitHub Pages** : Hébergement gratuit

## 📂 Structure du projet

```
cine-decouverte/
│
├── index.html          # Page principale
├── style.css           # Styles CSS
├── app.js              # Logique JavaScript
├── .gitignore          # Fichiers à ignorer
├── README.md           # Documentation
├── .env.example        # Exemple de configuration
└── deploy.sh           # Script de déploiement automatique
```

## 🔒 Sécurité

⚠️ **Note importante** : La clé API est exposée côté client. C'est acceptable pour TMDB qui autorise les clés publiques pour les projets non commerciaux. Pour une application en production, utilisez un backend pour sécuriser vos clés.

## 📝 License

MIT License - Libre d'utilisation pour vos projets personnels et commerciaux.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer de nouvelles fonctionnalités
- Améliorer la documentation

## 📧 Contact

Pour toute question, ouvrez une issue sur GitHub.

---

**Fait avec ❤️ et l'API TMDB**
