# 🚀 Commandes Rapides GitHub

## Premier Push (Setup initial)

```bash
# 1. Initialiser Git
git init

# 2. Ajouter tous les fichiers
git add .

# 3. Premier commit
git commit -m "🎬 Initial commit - CinéDécouverte"

# 4. Renommer la branche en main
git branch -M main

# 5. Ajouter le remote GitHub (remplace TON_USERNAME)
git remote add origin https://github.com/TON_USERNAME/cine-decouverte.git

# 6. Pousser le code
git push -u origin main
```

## Mises à jour quotidiennes

```bash
# Voir les modifications
git status

# Ajouter et commiter
git add .
git commit -m "✨ Description des changements"

# Pousser
git push
```

## Déploiement GitHub Pages

```bash
# Installer gh-pages
npm install --save-dev gh-pages

# Ajouter dans package.json (manuellement):
# "homepage": "https://TON_USERNAME.github.io/cine-decouverte",
# "scripts": {
#   "predeploy": "npm run build",
#   "deploy": "gh-pages -d dist"
# }

# Déployer
npm run deploy
```

## Commandes Git utiles

```bash
# Voir l'historique
git log --oneline

# Annuler le dernier commit (garde les fichiers)
git reset --soft HEAD~1

# Voir les différences
git diff

# Créer une nouvelle branche
git checkout -b feature/nouvelle-fonctionnalite

# Revenir sur main
git checkout main

# Mettre à jour depuis GitHub
git pull origin main
```

## Emoji pour commits (optionnel)

- ✨ `:sparkles:` - Nouvelle fonctionnalité
- 🐛 `:bug:` - Correction de bug
- 📝 `:memo:` - Documentation
- 💄 `:lipstick:` - UI/Style
- ♻️ `:recycle:` - Refactoring
- ⚡ `:zap:` - Performance
- 🔒 `:lock:` - Sécurité
- 🚀 `:rocket:` - Déploiement
- 🎨 `:art:` - Amélioration du code
- 🔥 `:fire:` - Suppression de code
