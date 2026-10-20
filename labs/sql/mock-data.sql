-- Données entièrement fictives pour les exercices SQL locaux.
-- Aucun compte réel, aucun mot de passe utilisable et aucun envoi réseau.
-- Compatible SQLite / sql.js. À exécuter uniquement dans une base de démonstration.
BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS utilisateurs (
  id INTEGER PRIMARY KEY,
  prenom TEXT NOT NULL,
  nom TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('apprenant', 'moderateur')),
  derniere_connexion TEXT
);

INSERT OR REPLACE INTO utilisateurs
  (id, prenom, nom, email, password_hash, role, derniere_connexion)
VALUES
(1, 'Alex', 'Martin', 'demo001@example.test', '$demo$NOT_A_REAL_HASH_001', 'apprenant', '2026-01-01 08:00:00'),
(2, 'Lina', 'Bernard', 'demo002@example.test', '$demo$NOT_A_REAL_HASH_002', 'apprenant', '2026-02-02 09:07:00'),
(3, 'Noah', 'Petit', 'demo003@example.test', '$demo$NOT_A_REAL_HASH_003', 'apprenant', '2026-03-03 10:14:00'),
(4, 'Emma', 'Robert', 'demo004@example.test', '$demo$NOT_A_REAL_HASH_004', 'moderateur', '2026-04-04 11:21:00'),
(5, 'Jules', 'Richard', 'demo005@example.test', '$demo$NOT_A_REAL_HASH_005', 'apprenant', '2026-05-05 12:28:00'),
(6, 'Inès', 'Durand', 'demo006@example.test', '$demo$NOT_A_REAL_HASH_006', 'apprenant', '2026-06-06 13:35:00'),
(7, 'Adam', 'Dubois', 'demo007@example.test', '$demo$NOT_A_REAL_HASH_007', 'apprenant', '2026-07-07 14:42:00'),
(8, 'Mia', 'Moreau', 'demo008@example.test', '$demo$NOT_A_REAL_HASH_008', 'moderateur', '2026-08-08 15:49:00'),
(9, 'Hugo', 'Laurent', 'demo009@example.test', '$demo$NOT_A_REAL_HASH_009', 'apprenant', '2026-09-09 16:56:00'),
(10, 'Jade', 'Simon', 'demo010@example.test', '$demo$NOT_A_REAL_HASH_010', 'apprenant', '2026-01-10 17:03:00'),
(11, 'Alex', 'Martin', 'demo011@example.test', '$demo$NOT_A_REAL_HASH_011', 'apprenant', '2026-02-11 18:10:00'),
(12, 'Lina', 'Bernard', 'demo012@example.test', '$demo$NOT_A_REAL_HASH_012', 'moderateur', '2026-03-12 19:17:00'),
(13, 'Noah', 'Petit', 'demo013@example.test', '$demo$NOT_A_REAL_HASH_013', 'apprenant', '2026-04-13 08:24:00'),
(14, 'Emma', 'Robert', 'demo014@example.test', '$demo$NOT_A_REAL_HASH_014', 'apprenant', '2026-05-14 09:31:00'),
(15, 'Jules', 'Richard', 'demo015@example.test', '$demo$NOT_A_REAL_HASH_015', 'apprenant', '2026-06-15 10:38:00'),
(16, 'Inès', 'Durand', 'demo016@example.test', '$demo$NOT_A_REAL_HASH_016', 'moderateur', '2026-07-16 11:45:00'),
(17, 'Adam', 'Dubois', 'demo017@example.test', '$demo$NOT_A_REAL_HASH_017', 'apprenant', '2026-08-17 12:52:00'),
(18, 'Mia', 'Moreau', 'demo018@example.test', '$demo$NOT_A_REAL_HASH_018', 'apprenant', '2026-09-18 13:59:00'),
(19, 'Hugo', 'Laurent', 'demo019@example.test', '$demo$NOT_A_REAL_HASH_019', 'apprenant', '2026-01-19 14:06:00'),
(20, 'Jade', 'Simon', 'demo020@example.test', '$demo$NOT_A_REAL_HASH_020', 'moderateur', '2026-02-20 15:13:00'),
(21, 'Alex', 'Martin', 'demo021@example.test', '$demo$NOT_A_REAL_HASH_021', 'apprenant', '2026-03-21 16:20:00'),
(22, 'Lina', 'Bernard', 'demo022@example.test', '$demo$NOT_A_REAL_HASH_022', 'apprenant', '2026-04-22 17:27:00'),
(23, 'Noah', 'Petit', 'demo023@example.test', '$demo$NOT_A_REAL_HASH_023', 'apprenant', '2026-05-23 18:34:00'),
(24, 'Emma', 'Robert', 'demo024@example.test', '$demo$NOT_A_REAL_HASH_024', 'moderateur', '2026-06-24 19:41:00'),
(25, 'Jules', 'Richard', 'demo025@example.test', '$demo$NOT_A_REAL_HASH_025', 'apprenant', '2026-07-25 08:48:00'),
(26, 'Inès', 'Durand', 'demo026@example.test', '$demo$NOT_A_REAL_HASH_026', 'apprenant', '2026-08-26 09:55:00'),
(27, 'Adam', 'Dubois', 'demo027@example.test', '$demo$NOT_A_REAL_HASH_027', 'apprenant', '2026-09-27 10:02:00'),
(28, 'Mia', 'Moreau', 'demo028@example.test', '$demo$NOT_A_REAL_HASH_028', 'moderateur', '2026-01-28 11:09:00'),
(29, 'Hugo', 'Laurent', 'demo029@example.test', '$demo$NOT_A_REAL_HASH_029', 'apprenant', '2026-02-01 12:16:00'),
(30, 'Jade', 'Simon', 'demo030@example.test', '$demo$NOT_A_REAL_HASH_030', 'apprenant', '2026-03-02 13:23:00'),
(31, 'Alex', 'Martin', 'demo031@example.test', '$demo$NOT_A_REAL_HASH_031', 'apprenant', '2026-04-03 14:30:00'),
(32, 'Lina', 'Bernard', 'demo032@example.test', '$demo$NOT_A_REAL_HASH_032', 'moderateur', '2026-05-04 15:37:00'),
(33, 'Noah', 'Petit', 'demo033@example.test', '$demo$NOT_A_REAL_HASH_033', 'apprenant', '2026-06-05 16:44:00'),
(34, 'Emma', 'Robert', 'demo034@example.test', '$demo$NOT_A_REAL_HASH_034', 'apprenant', '2026-07-06 17:51:00'),
(35, 'Jules', 'Richard', 'demo035@example.test', '$demo$NOT_A_REAL_HASH_035', 'apprenant', '2026-08-07 18:58:00'),
(36, 'Inès', 'Durand', 'demo036@example.test', '$demo$NOT_A_REAL_HASH_036', 'moderateur', '2026-09-08 19:05:00'),
(37, 'Adam', 'Dubois', 'demo037@example.test', '$demo$NOT_A_REAL_HASH_037', 'apprenant', '2026-01-09 08:12:00'),
(38, 'Mia', 'Moreau', 'demo038@example.test', '$demo$NOT_A_REAL_HASH_038', 'apprenant', '2026-02-10 09:19:00'),
(39, 'Hugo', 'Laurent', 'demo039@example.test', '$demo$NOT_A_REAL_HASH_039', 'apprenant', '2026-03-11 10:26:00'),
(40, 'Jade', 'Simon', 'demo040@example.test', '$demo$NOT_A_REAL_HASH_040', 'moderateur', '2026-04-12 11:33:00'),
(41, 'Alex', 'Martin', 'demo041@example.test', '$demo$NOT_A_REAL_HASH_041', 'apprenant', '2026-05-13 12:40:00'),
(42, 'Lina', 'Bernard', 'demo042@example.test', '$demo$NOT_A_REAL_HASH_042', 'apprenant', '2026-06-14 13:47:00'),
(43, 'Noah', 'Petit', 'demo043@example.test', '$demo$NOT_A_REAL_HASH_043', 'apprenant', '2026-07-15 14:54:00'),
(44, 'Emma', 'Robert', 'demo044@example.test', '$demo$NOT_A_REAL_HASH_044', 'moderateur', '2026-08-16 15:01:00'),
(45, 'Jules', 'Richard', 'demo045@example.test', '$demo$NOT_A_REAL_HASH_045', 'apprenant', '2026-09-17 16:08:00'),
(46, 'Inès', 'Durand', 'demo046@example.test', '$demo$NOT_A_REAL_HASH_046', 'apprenant', '2026-01-18 17:15:00'),
(47, 'Adam', 'Dubois', 'demo047@example.test', '$demo$NOT_A_REAL_HASH_047', 'apprenant', '2026-02-19 18:22:00'),
(48, 'Mia', 'Moreau', 'demo048@example.test', '$demo$NOT_A_REAL_HASH_048', 'moderateur', '2026-03-20 19:29:00'),
(49, 'Hugo', 'Laurent', 'demo049@example.test', '$demo$NOT_A_REAL_HASH_049', 'apprenant', '2026-04-21 08:36:00'),
(50, 'Jade', 'Simon', 'demo050@example.test', '$demo$NOT_A_REAL_HASH_050', 'apprenant', '2026-05-22 09:43:00');

COMMIT;

-- Défis d'entraînement :
-- 1. Afficher les 10 derniers utilisateurs par date de connexion.
-- 2. Compter les comptes par rôle.
-- 3. Rechercher les adresses qui se terminent par example.test.
-- 4. Remplacer les données par une table de test sans toucher à un service réel.
