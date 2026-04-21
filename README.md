# Site web du LIIE — Laboratoire d'Imagerie Interventionnelle Expérimentale

Site statique du LIIE (UR 4264, Aix-Marseille Université) — plateforme CERIMED, CHU de la Timone, Marseille.

**État** : version 1, avril 2026. Tous les contenus rédactionnels sont en place, sourcés et prêts à être relus / enrichis par l'équipe. Les visuels sont à compléter (voir `docs/MEDIAS.md`).

---

## 1. Stack technique

- **HTML / CSS / JS vanille** — pas de build, pas de dépendances npm.
- 1 feuille CSS (`css/style.css`), 1 fichier JS (`js/main.js` — menu mobile + état actif nav).
- Typographies : Inter + Source Serif Pro via Google Fonts.
- Responsive mobile-first (breakpoints à 520 px, 700 px, 900 px).
- Accessibilité de base : rôles ARIA sur la nav, contrastes conformes WCAG AA, navigation clavier opérationnelle.

Aucune étape de compilation n'est nécessaire. Le site peut être déployé tel quel sur n'importe quel hébergeur statique : serveur AMU (DOSI), OVH, Netlify, GitHub Pages, etc.

---

## 2. Structure des fichiers

```
site-liie/
├── index.html                  # Accueil
├── laboratoire.html            # Le laboratoire
├── recherche.html              # Axes de recherche
├── projets.html                # Liste des projets
├── projets/
│   ├── fairembo.html
│   ├── embobio.html
│   ├── emborrhoid.html
│   └── iris.html
├── equipe.html                 # 13 fiches membres
├── actualites.html             # Podcasts + presse
├── contact.html                # Collaborer
├── mentions-legales.html
├── css/style.css               # Feuille de style unique
├── js/main.js                  # Menu mobile + nav active
├── _header.html                # Partiel header (référence — non servi)
├── assets/images/              # À alimenter
└── docs/
    ├── MEDIAS.md               # Banque de médias (URL + droits)
    └── README.md               # Ce fichier
```

---

## 3. Déploiement rapide

### Option A — Serveur web quelconque

Copier le contenu du dossier `site-liie/` à la racine du serveur web. C'est tout.

### Option B — Test local

```bash
cd site-liie
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

### Option C — GitHub Pages

1. Pousser le contenu de `site-liie/` dans un dépôt GitHub.
2. Settings → Pages → Branch `main`, dossier `/ (root)`.
3. L'URL sera du type `https://<user>.github.io/<repo>/`.

### Option D — Hébergement AMU (recommandé)

Solliciter la **Direction Opérationnelle du Système d'Information (DOSI)** d'Aix-Marseille Université. Un sous-domaine `liie.univ-amu.fr` est la solution la plus institutionnelle.

---

## 4. Ce qui reste à compléter par l'équipe

### 4.1 Données institutionnelles (priorité haute)

- [ ] **Email de contact direct LIIE** (actuellement : contact CERIMED générique)
- [ ] **Numéro de téléphone direct LIIE** si différent du standard CERIMED
- [ ] **Référent éditorial** du site (à nommer dans `mentions-legales.html`)
- [ ] **Choix d'hébergement** final (DOSI AMU ou prestataire) — à renseigner dans les mentions légales
- [ ] **Délégué communication** à identifier

### 4.2 Équipe (priorité haute)

- [ ] **Portraits individuels** pour les 13 membres — voir `docs/MEDIAS.md`
- [ ] **Validation des mini-bios** par chaque membre
- [ ] **Grades exacts à confirmer** :
  - Sophie Chopinet (PH vs MCU-PH)
  - Farouk Tradi (PH, MCU-PH ?)
  - Anthony Coppola (technicien / ingénieur d'étude)
  - Aurélie Haffner (PH, MCU-PH ?)
- [ ] **ORCID personnels** à collecter auprès de chaque membre
- [ ] **Liens Google Scholar** individuels si souhaités

### 4.3 Projets (priorité moyenne)

- [ ] **Validation interne** des textes projets par les porteurs de chaque projet
- [ ] **Clarifier ce qui peut être publié publiquement** pour EmboBio (négociation avec la startup)
- [ ] **Chiffres-clés actualisés** (nb études, patients, partenaires) à compléter
- [ ] **Logos HD** des 4 projets (FairEmbo, EmboBio, Emborrhoïd®, IRIS)

### 4.4 Médias (priorité haute)

Voir le document dédié : [`docs/MEDIAS.md`](MEDIAS.md)

- [ ] Photo d'équipe officielle récente
- [ ] Photos du plateau technique LIIE/CERIMED
- [ ] Logos HD des partenaires institutionnels (AMU, AP-HM, CERIMED, CNRS, Centrale Med, IPC)
- [ ] Favicon + image OpenGraph
- [ ] Autorisations écrites pour chaque visuel tiers

### 4.5 Fonctionnalités optionnelles à ajouter

- [ ] **Formulaire de contact** (nécessite un endpoint serveur, Formspree ou similaire)
- [ ] **Section publications filtrables** (par année, par auteur, par projet)
- [ ] **Mesure d'audience** (Matomo recommandé côté AMU, pas Google Analytics)
- [ ] **Sitemap XML** et `robots.txt` pour SEO
- [ ] **Flux RSS** pour les actualités
- [ ] **Version anglaise** si souhaitée ultérieurement

---

## 5. Points d'attention juridiques

1. **Ne pas publier** sans accord écrit :
   - les portraits des membres (droit à l'image)
   - les photos AP-HM / CERIMED / AMU (demande à la DIRCOM respective)
   - les images issues de publications scientifiques (Springer, RSNA, etc. — droits stricts)

2. **Toujours citer la source** pour chaque visuel (`<figcaption>` ou crédit en italique en dessous).

3. **RGPD** : si un formulaire de contact est ajouté, prévoir une mention de traitement des données et un lien vers la politique de confidentialité AMU.

4. **Marque déposée** : Emborrhoïd® est une marque déposée de l'AP-HM → toujours utiliser le ® lors de la première mention sur une page.

---

## 6. Sources utilisées pour la rédaction

- **CERIMED** — http://www.cerimed-web.eu
- **AP-HM** — https://fr.ap-hm.fr
- **Aix-Marseille Université** — https://www.univ-amu.fr
- **CESAM-Carto AMU — Fiche LIIE** — https://cesam-carto.univ-amu.fr/laboratoire/laboratoire-dimagerie-interventionnelle-experimentale-liie/
- **Rapport HCERES 2023** (vague C, contrat 2024-2028) — https://www.hceres.fr/sites/default/files/media/downloads/c2023-ev-0134009m-der-er-der-pur230023255-sve7-liie-rf.pdf
- **Rapport HCERES 2018** — https://www.hceres.fr/sites/default/files/media/publications/depot-evaluations/C2018-EV-0134009M-DER-PUR180015057-018017-RF.pdf
- **FairEmbo** — https://fairembo.fr
- **Dossier presse inauguration CERIMED 2018** — https://www.univ-amu.fr/system/files/2018-12/DIRCOM-dp_inauguration_cerimed.pdf
- Publications scientifiques PubMed, Springer (CVIR), MDPI (J Pers Med), Frontiers, RSNA (RadioGraphics)

Chaque page HTML contient les liens sources en fin de contenu ; `docs/MEDIAS.md` liste les URLs pour tous les médias avec leur statut de droits.

---

## 7. Pistes d'évolution

À moyen terme, le site pourrait bénéficier de :

- **Migration vers Astro ou 11ty** si la maintenance multipage devient fastidieuse (actuellement, le header/footer sont dupliqués dans chaque page — un template engine simplifierait les modifications).
- **CMS headless** (Decap CMS, Strapi) si l'équipe souhaite publier des actualités sans toucher au code.
- **Intégration HAL automatique** pour afficher les publications en temps réel via l'API HAL.
- **Versionnage Git** et déploiement continu (GitHub Actions → serveur AMU).

---

**Questions ou ajustements** : à discuter avec l'équipe communication du LIIE. Le site est volontairement <em>institutionnel et sobre</em> — chaque modification d'identité graphique se fait depuis le fichier `css/style.css` (variables CSS en tête de fichier pour les couleurs et typographies).
