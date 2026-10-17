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

## Technologies

- HTML5, CSS3 (variables CSS, grid, flexbox), JavaScript (ES6+)
- Polices : [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) et [DM Sans](https://fonts.google.com/specimen/DM+Sans) via Google Fonts

## Contact

- ✉️ dinazuber05@gmail.com
- 📍 Veyras, Valais (Suisse)

© Dina Zuber. Tous droits réservés.
