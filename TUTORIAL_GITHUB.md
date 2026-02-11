# 📸 Tutoriel Pas à Pas - Pousser sur GitHub

## 🎯 Objectif
Mettre ton code CinéDécouverte sur GitHub en 10 minutes chrono !

---

## Étape 1️⃣ : Créer le Repository sur GitHub

### Actions à faire sur github.com :

1. **Connecte-toi sur GitHub**
   - Va sur https://github.com
   - Connecte-toi à ton compte

2. **Crée un nouveau repo**
   - Clique sur le **bouton "+"** en haut à droite
   - Sélectionne **"New repository"**

3. **Configure le repo**
   ```
   Repository name:        cine-decouverte
   Description:            🎬 Application de découverte de films et séries
   Visibility:             ✅ Public (ou Private si tu préfères)
   
   ❌ NE COCHE PAS "Add a README file"
   ❌ NE COCHE PAS "Add .gitignore"
   ❌ NE COCHE PAS "Choose a license"
   ```

4. **Clique sur "Create repository"**

5. **📋 COPIE l'URL affichée**
   - Tu verras quelque chose comme :
   ```
   https://github.com/TON_USERNAME/cine-decouverte.git
   ```
   - **GARDE cette URL pour l'étape 3**

---

## Étape 2️⃣ : Ouvrir le Terminal dans ton Projet

### Sur Windows :
1. Ouvre l'Explorateur de fichiers
2. Va dans le dossier `cine-decouverte`
3. Clique dans la barre d'adresse
4. Tape `cmd` et appuie sur Entrée

### Sur Mac/Linux :
1. Ouvre le Terminal
2. Navigue vers ton projet :
   ```bash
   cd chemin/vers/cine-decouverte
   ```

---

## Étape 3️⃣ : Initialiser Git

**Copie-colle ces commandes une par une dans le terminal :**

```bash
git init
```
💡 **Ce que ça fait :** Crée un nouveau repository Git local

```bash
git add .
```
💡 **Ce que ça fait :** Ajoute tous les fichiers au tracking Git

```bash
git commit -m "🎬 Initial commit - CinéDécouverte"
```
💡 **Ce que ça fait :** Crée le premier snapshot de ton code

```bash
git branch -M main
```
💡 **Ce que ça fait :** Renomme la branche en "main"

---

## Étape 4️⃣ : Connecter à GitHub

**⚠️ ATTENTION : Remplace `TON_USERNAME` par ton vrai nom d'utilisateur GitHub !**

```bash
git remote add origin https://github.com/TON_USERNAME/cine-decouverte.git
```

💡 **Ce que ça fait :** Connecte ton repo local à GitHub

**Vérification :**
```bash
git remote -v
```
Tu devrais voir ton URL GitHub s'afficher

---

## Étape 5️⃣ : Pousser le Code

```bash
git push -u origin main
```

**🔐 Authentification requise :**

Git va te demander :
- **Username** : Ton nom d'utilisateur GitHub
- **Password** : ⚠️ **PAS ton mot de passe !** Utilise un **Personal Access Token**

### Comment créer un Personal Access Token :

1. **Sur GitHub, va dans :**
   - Clique sur ta photo de profil (en haut à droite)
   - Settings → Developer settings (tout en bas)
   - Personal access tokens → Tokens (classic)

2. **Clique sur "Generate new token (classic)"**

3. **Configure le token :**
   ```
   Note:               CinéDécouverte Deploy
   Expiration:         90 days (ou plus)
   Scopes:             ✅ repo (coche toute la section)
   ```

4. **Clique sur "Generate token"**

5. **📋 COPIE IMMÉDIATEMENT LE TOKEN**
   - Il commence par `ghp_...`
   - ⚠️ Tu ne pourras plus le revoir après !
   - Sauvegarde-le dans un endroit sûr

6. **Colle ce token comme "Password"** dans le terminal

---

## Étape 6️⃣ : Vérification

### Sur GitHub :
1. Rafraîchis ta page GitHub
2. Tu devrais voir tous tes fichiers !
3. Le README.md s'affiche automatiquement

### Tu devrais voir :
```
✅ movie-finder.jsx
✅ package.json
✅ README.md
✅ INSTALLATION.md
✅ .gitignore
✅ et tous les autres fichiers
```

---

## 🎉 C'EST FAIT !

Ton code est maintenant sur GitHub à l'adresse :
```
https://github.com/TON_USERNAME/cine-decouverte
```

---

## 🚀 BONUS : Déployer sur GitHub Pages (optionnel)

Pour que ton app soit accessible en ligne gratuitement :

### 1. Installer gh-pages
```bash
npm install --save-dev gh-pages
```

### 2. Modifier package.json

Ouvre `package.json` et ajoute (remplace TON_USERNAME) :

```json
{
  "homepage": "https://TON_USERNAME.github.io/cine-decouverte",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### 3. Modifier vite.config.js

Ouvre `vite.config.js` et ajoute la ligne `base` :

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/cine-decouverte/',  // ← Ajoute cette ligne
})
```

### 4. Déployer
```bash
npm run deploy
```

### 5. Activer GitHub Pages

1. Va sur ton repo GitHub
2. **Settings** (onglet en haut)
3. **Pages** (menu de gauche)
4. Source : Sélectionne **"gh-pages"** branch
5. **Save**

**⏱️ Attends 2-3 minutes**

Ton app sera disponible sur :
```
https://TON_USERNAME.github.io/cine-decouverte
```

---

## 📝 Commandes pour les futures modifications

Quand tu modifies ton code :

```bash
# 1. Voir ce qui a changé
git status

# 2. Ajouter les modifications
git add .

# 3. Créer un commit
git commit -m "✨ Description de tes changements"

# 4. Pousser sur GitHub
git push

# 5. (Optionnel) Redéployer sur GitHub Pages
npm run deploy
```

---

## ❓ Problèmes fréquents

### "fatal: not a git repository"
→ Tu n'es pas dans le bon dossier. Fais `cd` vers ton projet.

### "error: remote origin already exists"
→ Normal si tu refais la commande. Ignore ou fais : `git remote remove origin` puis réessaye.

### "Permission denied"
→ Problème d'authentification. Vérifie ton username et ton token.

### "Updates were rejected"
→ Fais d'abord : `git pull origin main --rebase` puis `git push`

---

## 🆘 Besoin d'aide ?

Si tu bloques à une étape :
1. Vérifie que tu as bien copié-collé les commandes
2. Vérifie que tu es dans le bon dossier
3. Vérifie ton username GitHub dans les URL
4. Relis attentivement les messages d'erreur

---

**🎊 Bravo ! Tu as poussé ton premier projet sur GitHub !**
