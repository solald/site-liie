# Site LIIE — v2 « Revue »

Alternative complète au site du LIIE (UR 4264, Aix-Marseille Université — plateforme CERIMED, Timone, Marseille).
Direction éditoriale « revue scientifique » : claire, sobre, content-first.

- **Couleur** : un seul accent, rouge artériel `#9E3328` (décliné par projet en bleu/vert/bronze via les classes `.theme-*`).
- **Typographie** : titres **Fraunces**, corps **Inter**.
- **Motion** : fondus discrets au scroll uniquement (pas de preloader, marquee ni parallax).
- **Stack** : HTML / CSS / JS vanille, aucun build, compatible GitHub Pages / hébergeur statique.

## Aperçu local

```bash
python3 tools/serve.py     # http://127.0.0.1:8766
```

## Structure

```
index.html              Accueil
laboratoire.html        Le laboratoire
projets.html            Index des projets
projets/                Fiches : fairembo · embobio · emborrhoid · iris
equipe.html             Équipe (grille de fiches)
actualites.html         Presse · podcasts · communiqués
contact.html            Coordonnées + formulaire
mentions-legales.html
css/style.css           Feuille de style unique (variables + composants)
js/main.js              Menu mobile + reveals + formulaire
assets/                 Médias (repris de la v1)
```

> Le header et le footer sont dupliqués dans chaque page (site statique sans build).
> Pour les modifier partout, répercuter la modification dans chaque page.

## Formulaire de contact

Par défaut le formulaire fonctionne en **mailto** (ouvre le client mail pré-rempli, aucune config).
Pour un vrai envoi serveur via **Formspree** (gratuit) :

1. Créer un formulaire sur https://formspree.io
2. Dans `contact.html`, renseigner `data-formspree="https://formspree.io/f/VOTRE_ID"` sur `<form id="contactForm">`.

Le script (`js/main.js`) bascule automatiquement du mailto vers Formspree.

## À faire avant mise en ligne

- [ ] Choisir l'hébergement (DOSI AMU recommandé, ou GitHub Pages) et **mettre à jour `sitemap.xml` + les balises `og:url`/`canonical`** avec l'URL finale.
- [ ] Activer Formspree si un envoi serveur est souhaité (sinon le mailto suffit).
- [ ] Faire valider les contenus resserrés par l'équipe.
