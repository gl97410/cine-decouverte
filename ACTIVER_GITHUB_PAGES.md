# 🚀 Activer GitHub Pages - Dernière étape !

## ✅ Votre code est sur GitHub !

Le code a été poussé avec succès sur : https://github.com/gl97410/cine-decouverte

## 📝 Activez GitHub Pages (2 minutes)

### Étape 1 : Aller dans les paramètres

1. Ouvrez votre repository : https://github.com/gl97410/cine-decouverte
2. Cliquez sur **⚙️ Settings** (en haut à droite)

### Étape 2 : Configurer Pages

1. Dans le menu de gauche, cliquez sur **Pages**
2. Dans la section **"Build and deployment"** :
   - **Source** : Sélectionnez **"GitHub Actions"**
3. Cliquez sur **Save** (si demandé)

C'est tout ! 🎉

### Étape 3 : Attendre le déploiement

1. Allez dans l'onglet **Actions** de votre repository
2. Vous verrez le workflow "Deploy to GitHub Pages" en cours
3. Attendez que le cercle vert apparaisse (1-2 minutes)

### 🌍 Accéder à votre application

Votre application sera disponible sur :

**https://gl97410.github.io/cine-decouverte**

## 🔧 Configuration de la clé API TMDB

### Option 1 : Utiliser la clé de démonstration (rapide)

L'application fonctionne déjà avec une clé de démonstration. Vous pouvez l'utiliser pour tester !

### Option 2 : Utiliser votre propre clé (recommandé)

1. Créez un compte gratuit sur : https://www.themoviedb.org
2. Obtenez votre clé API : https://www.themoviedb.org/settings/api
3. Éditez le fichier `app.js` ligne 2 :
   ```javascript
   const API_KEY = 'VOTRE_CLE_API';
   ```
4. Committez et poussez :
   ```bash
   git add app.js
   git commit -m "🔑 Update API key"
   git push
   ```

Le site se mettra automatiquement à jour !

## 🔄 Mises à jour futures

Pour modifier l'application et redéployer :

```bash
# Méthode 1 : Script automatique
./deploy.sh "Description de vos modifications"

# Méthode 2 : Manuelle
git add .
git commit -m "Description"
git push
```

GitHub Pages se met à jour automatiquement à chaque push !

## 🎯 Fonctionnalités disponibles

✅ Recherche de films par titre
✅ Filtrage par 19 genres différents
✅ Filtrage par année (1900 à aujourd'hui)
✅ Tri par popularité, note, date ou titre
✅ Modal détaillée avec synopsis, casting, budget
✅ Design responsive (mobile, tablette, desktop)
✅ Pagination automatique
✅ Chargement optimisé des images

## 🆘 Dépannage

### Le site affiche une erreur 404
- Vérifiez que GitHub Pages est activé (Settings → Pages)
- Assurez-vous que la source est bien "GitHub Actions"
- Attendez 2-3 minutes après le premier push

### Les films ne se chargent pas
- Ouvrez la console du navigateur (F12)
- Vérifiez votre clé API TMDB
- La clé de démonstration peut avoir des limites de taux

### Le workflow échoue
- Allez dans Actions → Cliquez sur le workflow qui a échoué
- Lisez les logs pour identifier l'erreur
- Le problème le plus courant : permissions manquantes

### Activer les permissions du workflow
Si le déploiement échoue :
1. Settings → Actions → General
2. Descendez à "Workflow permissions"
3. Cochez "Read and write permissions"
4. Sauvegardez

## 📊 Statistiques du projet

- **Lignes de code** : ~500 lignes
- **Technologies** : HTML5, CSS3, JavaScript Vanilla
- **API** : TMDB (The Movie Database)
- **Hébergement** : GitHub Pages (gratuit)
- **Déploiement** : Automatique via GitHub Actions

## 🎨 Personnalisation

### Changer le titre
Éditez `index.html` ligne 6

### Changer les couleurs
Éditez `style.css` lignes 10-17 (variables CSS)

### Ajouter des fonctionnalités
- Favoris (localStorage)
- Recherche de séries TV
- Mode sombre/clair
- Liste "À regarder"

## 🔗 Liens utiles

- **Votre repository** : https://github.com/gl97410/cine-decouverte
- **Votre site** : https://gl97410.github.io/cine-decouverte
- **Documentation TMDB** : https://developers.themoviedb.org/3
- **Guide GitHub Pages** : https://pages.github.com/

---

**Bravo ! Votre application est en ligne ! 🎉**

Partagez-la avec vos amis : `https://gl97410.github.io/cine-decouverte`
