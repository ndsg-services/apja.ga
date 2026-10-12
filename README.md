# www.apja.ga — Site de l'APJA (Agir Pour une Jeunesse Autonome)

Site statique HTML/CSS + formulaire PHP, réalisé par NDSG Services.

## Pages
index · historique · sem-gew · a-propos · partenaires · adhesion · galerie · 404

## À compléter avant mise en ligne
- `adhesion.html` : remplacer les deux boutons « Paiement en ligne bientôt disponible » par les liens NDSGPay (cotisation et don).
- `send-message.php` : créer la boîte `contact@apja.ga` (et `no-reply@apja.ga`) sur l'hébergement, ou changer `$DESTINATAIRE`.
- Galerie : photos du Forum 10 ans à déposer dans `assets/img/galerie/10-ans/` puis à ajouter dans `galerie.html` (section masquée tant qu'elle est vide).

## Mise en ligne (O2switch)
Envoyer tout le contenu du dépôt à la racine du domaine, y compris le fichier `.htaccess` (avec le point).
Le `.htaccess` force https + www et redirige les anciennes adresses Wix vers les nouvelles pages.
