# 📤 Guide pour Pousser CinéDécouverte sur GitHub

## Méthode 1 : Via l'interface GitHub (Recommandée pour débuter)

### Étape 1 : Créer le repository sur GitHub

1. Va sur https://github.com
2. Connecte-toi à ton compte
3. Clique sur le bouton **"New"** (ou **"+"** → **"New repository"**)
4. Remplis les informations :
   - **Repository name** : `cine-decouverte`
   - **Description** : `Application web de découverte de films et séries avec filtres avancés - Propulsée par l'API TMDB`
   - **Visibilité** : Public ou Private (selon ton choix)
   - ⚠️ **NE COCHE PAS** "Add a README file" (on a déjà le nôtre)
   - ⚠️ **NE COCHE PAS** "Add .gitignore" (on a déjà le nôtre)
5. Clique sur **"Create repository"**

### Étape 2 : Initialiser Git dans ton projet

Ouvre un terminal dans le dossier de ton projet et exécute :

```bash
# Initialiser le repository Git
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "🎬 Initial commit - CinéDécouverte app"

# Renommer la branche en main (si nécessaire)
git branch -M main
```

### Étape 3 : Connecter au repository GitHub

Remplace `TON_USERNAME` par ton nom d'utilisateur GitHub :

```bash
git remote add origin https://github.com/TON_USERNAME/cine-decouverte.git
```

### Étape 4 : Pousser le code

```bash
git push -u origin main
```

Si c'est la première fois, Git te demandera de t'authentifier :
- **Username** : Ton nom d'utilisateur GitHub
- **Password** : Utilise un **Personal Access Token** (pas ton mot de passe GitHub)

#### Comment créer un Personal Access Token :
1. Va sur GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Clique sur "Generate new token" → "Generate new token (classic)"
3. Donne-lui un nom : `CinéDécouverte`
4. Coche : `repo` (Full control of private repositories)
5. Clique sur "Generate token"
6. **COPIE LE TOKEN** (tu ne pourras plus le revoir)
7. Utilise ce token comme mot de passe quand Git te le demande

---

## Méthode 2 : Via SSH (Pour les utilisateurs avancés)

### Étape 1 : Configurer SSH

```bash
# Générer une clé SSH (si tu n'en as pas)
ssh-keygen -t ed25519 -C "ton.email@example.com"

# Copier la clé publique
cat ~/.ssh/id_ed25519.pub
```

### Étape 2 : Ajouter la clé sur GitHub

1. Va sur GitHub → Settings → SSH and GPG keys
2. Clique sur "New SSH key"
3. Colle ta clé publique
4. Sauvegarde

### Étape 3 : Pousser avec SSH

```bash
git init
git add .
git commit -m "🎬 Initial commit - CinéDécouverte app"
git branch -M main
git remote add origin git@github.com:TON_USERNAME/cine-decouverte.git
git push -u origin main
```

---

## 🎯 Commandes Git utiles pour la suite

### Ajouter des modifications
```bash
# Voir les fichiers modifiés
git status

# Ajouter tous les fichiers modifiés
git add .

# Ou ajouter un fichier spécifique
git add src/movie-finder.jsx

# Créer un commit avec message
git commit -m "✨ Add new filter feature"

# Pousser les modifications
git push
```

### Conventions de messages de commit (recommandées)
```bash
git commit -m "✨ Add: nouvelle fonctionnalité"
git commit -m "🐛 Fix: correction de bug"
git commit -m "📝 Docs: mise à jour documentation"
git commit -m "💄 Style: améliorations visuelles"
git commit -m "♻️ Refactor: refactoring du code"
git commit -m "⚡ Perf: amélioration performance"
git commit -m "🔒 Security: correction sécurité"
```

---

## 🚀 Déployer sur GitHub Pages (Bonus)

Pour que ton application soit accessible en ligne gratuitement :

### 1. Installer gh-pages
```bash
npm install --save-dev gh-pages
```

### 2. Modifier package.json

Ajoute ces lignes :
```json
{
  "homepage": "https://TON_USERNAME.github.io/cine-decouverte",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### 3. Modifier vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/cine-decouverte/'
})
```

### 4. Déployer
```bash
npm run deploy
```

### 5. Activer GitHub Pages
1. Va sur ton repo GitHub
2. Settings → Pages
3. Source : `gh-pages` branch
4. Save

Ton app sera disponible sur : `https://TON_USERNAME.github.io/cine-decouverte`

---

## ⚠️ IMPORTANT - Sécurité de la clé API

### Option 1 : Variables d'environnement (Recommandé)

**Créer un fichier `.env` :**
```
VITE_TMDB_API_KEY=ta_clé_api_ici
```

**Modifier movie-finder.jsx :**
```javascript
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
```

**Ajouter `.env` dans `.gitignore` :**
```
.env
.env.local
```

**Pour GitHub Pages, configurer les secrets :**
1. GitHub → Settings → Secrets and variables → Actions
2. New repository secret
3. Name: `VITE_TMDB_API_KEY`
4. Value: ta clé API

### Option 2 : Clé publique (Acceptable pour TMDB)

TMDB autorise l'exposition de clés API côté client pour les projets non commerciaux.
Tu peux laisser la clé dans le code pour ce projet.

---

## 📋 Checklist avant de pousser

- [ ] Fichier `.gitignore` présent
- [ ] `node_modules/` dans `.gitignore`
- [ ] README.md complet et à jour
- [ ] Clé API configurée (env ou hardcodée)
- [ ] Code testé localement (`npm run dev`)
- [ ] Build fonctionne (`npm run build`)
- [ ] Tous les fichiers nécessaires inclus

---

## 🎨 Suggestions pour ton README GitHub

Ajoute ces badges en haut de ton README :

```markdown
![React](https://img.shields.io/badge/React-18.2-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-06B6D4?logo=tailwindcss)
![TMDB](https://img.shields.io/badge/API-TMDB-01D277?logo=themoviedatabase)
![License](https://img.shields.io/badge/License-MIT-green)

[🚀 Demo Live](https://ton-username.github.io/cine-decouverte) | [📖 Documentation](./README.md)
```

---

## 🆘 Problèmes courants

### "Permission denied"
→ Vérifie ton token ou ta clé SSH

### "Repository not found"
→ Vérifie l'URL du remote : `git remote -v`

### "rejected (non-fast-forward)"
→ Pull d'abord : `git pull origin main --rebase`

### Fichiers sensibles déjà poussés
→ Utilise BFG Repo-Cleaner ou filter-branch

---

**Besoin d'aide ?** N'hésite pas à demander ! 🚀
