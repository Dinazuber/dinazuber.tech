# Dina Zuber – Site CV

Site portfolio / CV personnel de **Dina Zuber**, informaticienne CFC (développement web) basée en Valais, Suisse.

🌐 **En ligne :** [https://dinazuber.github.io/dinazuber.tech/](https://dinazuber.github.io/dinazuber.tech/)

Site statique en HTML, CSS et JavaScript pur, sans framework ni étape de build.

## Fonctionnalités

- Page d'accueil avec dégradé animé et texte qui s'écrit tout seul
- Navigation en pilule flottante avec lien actif selon la section, et raccourci clavier `/` pour aller aux projets
- Thème clair / sombre (choix mémorisé dans le navigateur)
- Chiffres clés avec compteurs animés
- Projets présentés en cartes avec maquette de navigateur
- Parcours sous forme de fil du temps qui se dessine au défilement
- Animations au scroll : apparitions, parallaxe, bandeau de compétences, inclinaison des cartes
- Téléchargement du CV en PDF
- Responsive (mobile, tablette, ordinateur)
- Animations désactivées automatiquement si le visiteur a demandé moins de mouvement dans son système

## Structure du projet

```
.
├── index.html          # Contenu de la page
├── style.css           # Styles (couleurs, mise en page, animations)
├── script.js           # Interactions (thème, animations, navigation)
├── README.md
└── assets/
    ├── profile.png         # Photo de profil
    ├── liddes.png          # Capture du site de la commune de Liddes
    ├── capoeira.png        # Capture du site Capoeira Dos Alpes
    ├── melodymystery.png   # Capture du Blindtest Melody Mystery
    └── Dina_Zuber_CV.pdf   # CV téléchargeable
```

## Lancer le site en local

Aucune installation n'est nécessaire : ouvre simplement `index.html` dans ton navigateur.

Pour un rendu identique à la version en ligne (par exemple pour tester les chemins), tu peux aussi lancer un petit serveur local :

```bash
# avec Python
python -m http.server 8000
# puis ouvre http://localhost:8000
```

## Personnaliser

| Ce que je veux changer | Où |
| --- | --- |
| Textes, projets, parcours, contacts | `index.html` |
| Couleurs (clair et sombre) | Variables CSS au début de `style.css` (`:root` et `:root[data-theme="light"]`) |
| Mots qui s'écrivent dans le titre | Tableau `words` dans `script.js` |
| Photo et captures des projets | Remplacer les fichiers dans `assets/` en gardant les mêmes noms |
| CV en PDF | Remplacer `assets/Dina_Zuber_CV.pdf` en gardant le même nom |

Si une image est absente, le site affiche automatiquement un remplacement (initiales « DZ » ou maquette colorée).

## Déploiement avec GitHub Pages

1. Pousse les fichiers sur la branche `main` du dépôt (`index.html` à la racine).
2. Dans le dépôt, va dans **Settings → Pages**.
3. Sous *Build and deployment*, choisis **Deploy from a branch**, branche `main`, dossier `/ (root)`, puis **Save**.
4. Le site est publié en une à deux minutes. Chaque `git push` met le site à jour.

### Domaine personnalisé

- Renseigne `dinazuber.tech` dans **Settings → Pages → Custom domain**.
- Ajoute chez le registrar les enregistrements DNS indiqués dans la [documentation GitHub Pages](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).
- Active **Enforce HTTPS** une fois le domaine validé.

## Technologies

- HTML5, CSS3 (variables CSS, grid, flexbox), JavaScript (ES6+)
- Polices : [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) et [DM Sans](https://fonts.google.com/specimen/DM+Sans) via Google Fonts

## Contact

- ✉️ dinazuber05@gmail.com
- 📍 Veyras, Valais (Suisse)

© Dina Zuber. Tous droits réservés.
