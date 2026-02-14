# 🚀 Guide de Déploiement Rapide - CinéDécouverte

## ✅ Votre application est prête !

L'application web de découverte de films est maintenant complète avec toutes les fonctionnalités :
- 🔍 Recherche de films
- 🎭 Filtrage par genre
- 📅 Filtrage par année
- 📊 Tri personnalisé
- 🎬 Détails complets des films
- 📱 Design responsive

## 🧪 Tester localement

Un serveur local a été lancé. Ouvrez votre navigateur sur :

**http://localhost:8000**

Pour arrêter le serveur : appuyez sur `Ctrl+C` dans le terminal.

## 🔑 Configuration de la clé API TMDB

### Obtenir votre clé API gratuite

1. Créez un compte sur https://www.themoviedb.org
2. Allez sur https://www.themoviedb.org/settings/api
3. Demandez une clé API (gratuit)
4. Copiez votre clé API

### Configurer la clé dans l'application

Ouvrez le fichier `app.js` et remplacez la ligne 2 :

```javascript
const API_KEY = 'VOTRE_CLE_API_ICI';
```

**Note** : Une clé API de démonstration est déjà fournie pour tester l'application.

## 📤 Déployer sur GitHub Pages

### Étape 1 : Créer un repository GitHub

1. Allez sur https://github.com
2. Cliquez sur **New repository**
3. Nom : `cine-decouverte`
4. Description : `Application web de découverte de films`
5. Visibilité : Public
6. **NE COCHEZ PAS** "Initialize this repository with a README"
7. Cliquez sur **Create repository**

### Étape 2 : Connecter le repo local

Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub :

```bash
git remote add origin https://github.com/VOTRE_USERNAME/cine-decouverte.git
```

### Étape 3 : Pousser le code

```bash
git add .
git commit -m "🎬 Application CinéDécouverte complète"
git push -u origin main
```

### Étape 4 : Activer GitHub Pages

1. Allez sur votre repository GitHub
2. Cliquez sur **Settings** (Paramètres)
3. Dans le menu de gauche, cliquez sur **Pages**
4. Dans **Source**, sélectionnez **GitHub Actions**
5. Le déploiement se fera automatiquement

### Étape 5 : Accéder à votre app

Après quelques minutes, votre application sera disponible sur :

**https://VOTRE_USERNAME.github.io/cine-decouverte**

## 🔄 Mettre à jour l'application

Pour modifier et redéployer :

```bash
# Faire vos modifications dans les fichiers...

# Utiliser le script de déploiement automatique
./deploy.sh "Description de vos changements"

# Ou manuellement :
git add .
git commit -m "Description de vos changements"
git push origin main
```

GitHub Pages se mettra à jour automatiquement !

## 📁 Structure des fichiers

```
cine-decouverte/
│
├── index.html              # Page principale
├── style.css               # Styles
├── app.js                  # Logique JavaScript
│
├── .github/workflows/
│   └── deploy.yml          # Déploiement automatique
│
├── README.md               # Documentation complète
├── .gitignore              # Fichiers à ignorer
├── .env                    # Configuration locale
└── deploy.sh               # Script de déploiement
```

## 🎯 Fonctionnalités de l'application

### Recherche
- Tapez un titre de film dans la barre de recherche
- Appuyez sur Entrée ou cliquez sur "Appliquer les filtres"

### Filtres
- **Genre** : Choisissez parmi 19 genres (Action, Comédie, etc.)
- **Année** : Filtrez par année de sortie (1900 à aujourd'hui)
- **Tri** : Par popularité, note, date de sortie ou ordre alphabétique

### Détails des films
- Cliquez sur n'importe quelle carte de film
- Voir : Synopsis, casting, réalisateur, budget, revenus, etc.
- Appuyez sur Échap ou cliquez sur × pour fermer

### Navigation
- Pagination automatique
- Boutons Précédent/Suivant
- Indicateur de page actuelle

## 🆘 Résolution de problèmes

### L'application ne charge pas les films
- Vérifiez votre clé API TMDB dans `app.js`
- Ouvrez la console du navigateur (F12) pour voir les erreurs

### Les images ne s'affichent pas
- C'est normal si l'API TMDB a des limites de taux
- Attendez quelques secondes et rechargez

### GitHub Pages montre une erreur 404
- Vérifiez que vous avez activé GitHub Pages dans Settings → Pages
- Assurez-vous que la source est bien "GitHub Actions"
- Attendez 2-3 minutes pour le premier déploiement

### Permission refusée lors du push
- Générez un Personal Access Token sur GitHub
- Utilisez-le comme mot de passe au lieu de votre mot de passe GitHub
- Voir : Settings → Developer settings → Personal access tokens

## 🎨 Personnalisation

### Changer les couleurs

Éditez les variables CSS dans `style.css` (lignes 10-17) :

```css
:root {
    --primary-color: #e50914;     /* Couleur principale (rouge Netflix) */
    --background-dark: #141414;    /* Fond sombre */
    /* ... */
}
```

### Modifier le nombre de résultats par page

Dans `app.js`, l'API TMDB retourne 20 films par page par défaut.

### Ajouter d'autres filtres

Vous pouvez ajouter des filtres pour :
- Langue originale
- Certification (PG, R, etc.)
- Mots-clés
- Et plus encore !

Consultez la documentation TMDB : https://developers.themoviedb.org/3

## 📚 Ressources utiles

- [Documentation TMDB API](https://developers.themoviedb.org/3)
- [Guide GitHub Pages](https://pages.github.com/)
- [GitHub Actions](https://github.com/features/actions)

## 🎉 Prochaines étapes

- [ ] Ajouter des favoris (localStorage)
- [ ] Intégrer la recherche de séries TV
- [ ] Ajouter un mode sombre/clair
- [ ] Créer une liste "À regarder"
- [ ] Partager des films sur les réseaux sociaux

---

**Bon déploiement ! 🚀**
