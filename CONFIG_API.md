# 🔑 Configuration de l'API TMDB

## 🚀 Démarrage rapide

L'application fonctionne **déjà** avec une clé API de démonstration.
Vous pouvez l'utiliser pour tester sans configuration !

## 📝 Obtenir votre propre clé API (gratuite)

### 1️⃣ Créer un compte TMDB

👉 **https://www.themoviedb.org/signup**

Remplissez le formulaire d'inscription (gratuit).

### 2️⃣ Demander une clé API

1. Connectez-vous à votre compte
2. Allez sur : **https://www.themoviedb.org/settings/api**
3. Cliquez sur **"Create"** ou **"Request an API Key"**
4. Sélectionnez **"Developer"** (pour usage personnel/non commercial)

### 3️⃣ Remplir le formulaire

**Type of Use** : Website

**Application Name** : Films en Famille

**Application URL** : https://gl97410.github.io/cine-decouverte

**Application Summary** :
```
Application web de découverte de films adaptés aux familles.
Permet de filtrer par âge, genre, réalisateur, acteur, année et note.
Utilise l'API TMDB pour afficher les informations des films.
```

**Cochez** : J'accepte les conditions d'utilisation

Cliquez sur **"Submit"**

### 4️⃣ Copier votre clé API

Vous recevrez deux clés :
- **API Key (v3 auth)** ← Utilisez celle-ci ! (32 caractères)
- **API Read Access Token (v4 auth)** ← Ne pas utiliser

Exemple de clé API v3 :
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### 5️⃣ Configurer la clé dans l'application

#### Option A : Modification directe (recommandé)

Ouvrez le fichier `script.js` :

```bash
# Ouvrir avec votre éditeur
code script.js
# ou
nano script.js
```

Modifiez la ligne 2 :

**Avant :**
```javascript
const API_KEY = 'a8b9f3e8f7d4c3b2a1e9f8d7c6b5a4e3'; // Clé de démonstration
```

**Après :**
```javascript
const API_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'; // ← Votre clé ici
```

Sauvegardez le fichier.

#### Option B : Via terminal (avancé)

```bash
# Remplacer NOUVELLE_CLE par votre clé
sed -i '' "s/const API_KEY = '.*';/const API_KEY = 'NOUVELLE_CLE';/" script.js
```

### 6️⃣ Tester localement

```bash
# Lancer le serveur
python3 -m http.server 8000

# Ouvrir dans le navigateur
# http://localhost:8000
```

Testez que les films se chargent correctement.

### 7️⃣ Déployer sur GitHub Pages

```bash
# Commiter les changements
git add script.js
git commit -m "🔑 Configuration de ma clé API TMDB personnelle"
git push origin main
```

Attendez 1-2 minutes, puis visitez :
**https://gl97410.github.io/cine-decouverte**

## ✅ Vérification

### Comment savoir si ça fonctionne ?

1. **Ouvrez l'application** (local ou en ligne)
2. **Cliquez sur "Rechercher"** (sans filtres)
3. Vous devriez voir **des films populaires** s'afficher
4. **Ouvrez la console** (F12) → onglet Console
   - ✅ Si pas d'erreur : Clé API OK !
   - ❌ Si erreur 401/403 : Clé API invalide

### Console de debug

Si vous voyez dans la console :
```
🎬 Initialisation de Films en Famille...
✅ Application prête !
🔍 Recherche: https://api.themoviedb.org/3/discover/movie?...
```

C'est bon ! ✅

Si vous voyez :
```
❌ Erreur recherche: Error: Erreur API: 401
```

Votre clé API est invalide. ❌ Vérifiez-la.

## 🔒 Sécurité

### Est-ce sécurisé d'exposer ma clé API ?

**Pour TMDB, OUI** ✅

TMDB autorise l'exposition de clés API côté client pour les projets :
- Non commerciaux
- Personnels
- Éducatifs
- Open source

La clé est visible dans le code source, mais ce n'est **pas un problème** pour TMDB.

### Limites de l'API gratuite

- **Pas de limite de requêtes** pour usage normal
- **Rate limit** : 40 requêtes / 10 secondes
- **Usage** : Non commercial uniquement

Si vous dépassez le rate limit, attendez 10 secondes.

## 🆘 Dépannage

### "Invalid API key"

✅ **Solutions** :
1. Vérifiez que vous avez copié la clé complète (32 caractères)
2. Pas d'espaces avant/après
3. Utilisez la clé **API Key (v3)**, pas le token v4
4. Attendez 5 minutes après création de la clé

### "Your request count (40) is over the allowed limit"

✅ **Solution** : Attendez 10 secondes, puis réessayez.

### Films en langue étrangère

L'application est configurée en français (`language=fr-FR`).
Si vous voulez d'autres langues, modifiez dans `script.js` :

```javascript
// Ligne ~48, ~170, ~233, etc.
language: 'fr-FR'  // Français
language: 'en-US'  // Anglais
language: 'es-ES'  // Espagnol
```

### Pas de résultats

✅ **Vérifications** :
1. Vérifiez votre connexion Internet
2. Ouvrez la console (F12) pour voir les erreurs
3. Testez avec moins de filtres
4. Vérifiez que la clé API est valide

## 📚 Ressources

- **Documentation TMDB API** : https://developers.themoviedb.org/3
- **Forum TMDB** : https://www.themoviedb.org/talk
- **Obtenir une clé** : https://www.themoviedb.org/settings/api
- **Terms of Use** : https://www.themoviedb.org/terms-of-use

## 💡 Conseils

### Pour le développement

Gardez la clé de démonstration dans `script.js` et utilisez un fichier `.env.local` pour votre clé personnelle (nécessite un build).

Pour cette app statique, c'est OK de mettre la clé directement.

### Pour la production

Si vous voulez absolument cacher la clé :
1. Utilisez un backend (Node.js, PHP, etc.)
2. Faites les appels API depuis le serveur
3. Exposez seulement les résultats au frontend

Mais pour TMDB, ce n'est **pas nécessaire**.

---

**Vous êtes prêt ! 🎉**

Votre application utilise maintenant votre clé API TMDB personnelle.
