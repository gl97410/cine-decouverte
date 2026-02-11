#!/bin/bash

# Script de déploiement automatisé pour CinéDécouverte
# Usage: ./deploy.sh "message de commit"

echo "🎬 Déploiement de CinéDécouverte..."

# Vérifier si un message de commit est fourni
if [ -z "$1" ]; then
    echo "❌ Erreur: Veuillez fournir un message de commit"
    echo "Usage: ./deploy.sh \"votre message de commit\""
    exit 1
fi

COMMIT_MESSAGE=$1

# Vérifier si on est dans un repo git
if [ ! -d .git ]; then
    echo "❌ Erreur: Pas de repository Git trouvé"
    echo "Initialise d'abord avec: git init"
    exit 1
fi

# Vérifier s'il y a des changements
if git diff-index --quiet HEAD --; then
    echo "ℹ️  Aucun changement à commiter"
else
    echo "📝 Ajout des fichiers modifiés..."
    git add .
    
    echo "💾 Création du commit..."
    git commit -m "$COMMIT_MESSAGE"
fi

# Pousser vers GitHub
echo "📤 Push vers GitHub..."
git push origin main

# Demander si on veut déployer sur GitHub Pages
read -p "🚀 Déployer sur GitHub Pages? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🏗️  Build de l'application..."
    npm run build
    
    echo "🌐 Déploiement sur GitHub Pages..."
    npm run deploy
    
    echo "✅ Déploiement terminé!"
    echo "🌍 Ton app sera disponible dans quelques minutes sur:"
    echo "   https://TON_USERNAME.github.io/cine-decouverte"
else
    echo "✅ Code poussé sur GitHub!"
fi

echo ""
echo "🎉 Terminé!"
