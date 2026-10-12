<?php
// Formulaire de contact APJA — envoi par mail()
// À CONFIGURER : adresse de réception (la boîte doit exister sur l'hébergement)
$DESTINATAIRE = 'contact@apja.ga';
$EXPEDITEUR   = 'no-reply@apja.ga';   // adresse du domaine, pour éviter le classement en spam

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header('Location: /#contact'); exit; }

// Pot de miel anti-robots
if (!empty($_POST['site'])) { header('Location: /?envoi=ok#contact'); exit; }

function champ($k, $max = 200) {
  $v = isset($_POST[$k]) ? trim((string)$_POST[$k]) : '';
  $v = str_replace(["\r", "\n", "%0a", "%0d"], ' ', $v);
  return mb_substr(strip_tags($v), 0, $max);
}
$prenom    = champ('prenom', 80);
$nom       = champ('nom', 80);
$structure = champ('structure', 120);
$email     = filter_var(champ('email', 150), FILTER_VALIDATE_EMAIL);
$message   = isset($_POST['message']) ? mb_substr(strip_tags(trim((string)$_POST['message'])), 0, 5000) : '';

if ($prenom === '' || !$email || $message === '') { header('Location: /?envoi=erreur#contact'); exit; }

$sujet = '=?UTF-8?B?' . base64_encode('Site APJA — message de ' . $prenom . ' ' . $nom) . '?=';
$corps = "Nouveau message depuis le site www.apja.ga\n\n"
       . "Prénom : $prenom\nNom : $nom\nStructure : $structure\nE-mail : $email\n\n"
       . "Message :\n$message\n";
$entetes = "From: APJA site web <$EXPEDITEUR>\r\n"
         . "Reply-To: $email\r\n"
         . "MIME-Version: 1.0\r\n"
         . "Content-Type: text/plain; charset=UTF-8\r\n"
         . "Content-Transfer-Encoding: 8bit\r\n";

$ok = mail($DESTINATAIRE, $sujet, $corps, $entetes, '-f' . $EXPEDITEUR);
header('Location: /?envoi=' . ($ok ? 'ok' : 'erreur') . '#contact');
exit;
