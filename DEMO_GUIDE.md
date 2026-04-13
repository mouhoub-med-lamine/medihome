# MediHome - Guide Utilisateur & Démo

Ce document détaille le fonctionnement de MediHome, ses utilisateurs et comment réaliser une démonstration efficace.

## 1. Les Acteurs du Système

| Acteur | Rôle |
| :--- | :--- |
| **Le Patient** | Individu nécessitant des soins. Il peut déclencher un SOS ou demander une visite à domicile. |
| **Le Médecin** | Professionnel de santé mobile. Il reçoit les alertes, se déplace chez le patient et génère des ordonnances. |
| **L'Administrateur** | Gestionnaire de la plateforme. Il valide les comptes médecins et surveille les statistiques globales. |

## 2. Cas d'Utilisation (Réels)

### A. Urgence SOS (Critique)
Un patient fait un malaise ou a une douleur intense. Il appuie sur le bouton **SOS**. Le système détecte sa position GPS et alerte immédiatement les médecins les plus proches. 
*   **Bénéfice :** Réduction du temps d'intervention vitale.

### B. Consultation de Routine à Domicile
Un parent souhaite faire ausculter son enfant fiévreux sans se déplacer aux urgences. Il remplit un formulaire avec les symptômes. Un pédiatre accepte la demande.
*   **Bénéfice :** Confort et limitation de la propagation des maladies.

### C. Suivi Médical Digital
Après l'intervention, le docteur remplit son rapport sur l'application. L'ordonnance est générée instantanément en PDF et disponible sur le profil du patient.
*   **Bénéfice :** Zéro papier, historique médical centralisé.

## 3. Comment utiliser l'App (Parcours Démo)

### Étape 1 : Le Patient demande de l'aide
1.  Connectez-vous comme **Patient** (`patient@demo.com`).
2.  Sur le dashboard, cliquez sur **DÉCLENCHER SOS**.
3.  Confirmez l'alerte. Une requête fictive est créée.

### Étape 2 : Le Médecin accepte la mission
1.  Connectez-vous comme **Médecin** (`doctor@demo.com`).
2.  Allez dans l'onglet **DEMANDES**.
3.  Vous voyez la demande du patient. Cliquez sur **ACCEPTER**.
4.  L'écran de suivi s'affiche. Cliquez sur **JE SUIS ARRIVÉ** puis **COMMENCER**.

### Étape 3 : La Consultation
1.  Remplissez le diagnostic (ex: "Grippe saisonnière").
2.  Ajoutez un médicament.
3.  Cliquez sur **TERMINER LA VISITE**. Un message de succès confirme la fin.

### Étape 4 : L'Administration
1.  Connectez-vous comme **Admin** (`admin@demo.com`).
2.  Consultez les statistiques de visites et le répertoire des médecins validés.
