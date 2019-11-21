-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Vært: 127.0.0.1
-- Genereringstid: 26. 09 2019 kl. 17:51:00
-- Serverversion: 5.6.24
-- PHP-version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `boligstjernen`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `address` varchar(45) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `comment` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `contact_info`
--

CREATE TABLE IF NOT EXISTS `contact_info` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `phone` int(11) NOT NULL,
  `fax` int(11) NOT NULL,
  `email` varchar(45) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `contact_info`
--

INSERT INTO `contact_info` (`id`, `name`, `address`, `city`, `phone`, `fax`, `email`) VALUES
(1, 'Boligstjernen A/S', 'Park Allé 335', '2100 København Ø', 67912801, 67912811, 'info@boligstjernen.dk');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `houses`
--

CREATE TABLE IF NOT EXISTS `houses` (
  `id` int(11) NOT NULL,
  `case_number` int(11) NOT NULL,
  `title` varchar(105) NOT NULL,
  `description` text NOT NULL,
  `price` int(11) NOT NULL,
  `brutto` int(11) NOT NULL,
  `netto` int(11) NOT NULL,
  `size_home` int(11) NOT NULL,
  `size_area` int(11) NOT NULL,
  `fk_house_type` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `houses`
--

INSERT INTO `houses` (`id`, `case_number`, `title`, `description`, `price`, `brutto`, `netto`, `size_home`, `size_area`, `fk_house_type`) VALUES
(7, 287100, 'Indflytningsklar luksusejendom nær skov og strand.', 'I byggeriet er der lagt vægt på enkle materialer. Det sker for at opnå et æstetisk rent udtryk, der danner en moderne kontrast til det naturskønne område. ', 550000, 32689, 26357, 285, 11700, 4),
(8, 108072, 'Nyopført rækkehus ved golfbanen', 'Beliggenheden er ideel, fordi man bor i byen, men samtidig er meget nær en god golfbane og dejlige, rekreative områder.', 2895000, 17976, 16137, 128, 182, 2),
(9, 180702, 'Nydelig og funktionelt indrettet høj stuelejlighed.', 'Lejligheden er beliggende i en hyggelig, stille sidegade med mange smukke, gamle ejendomme og masser miljø. Lejligheden ligger i gåafstand til et spændende udvalg af indkøbsmuligheder, caféer, specialbutikker samt restauranter. Der er ligeledes få minutters gang til offentligt transport. Lejligheden indeholder entre/gang, nyt stort HTH køkken med mulighed for spiseplads, stort lyst soveværelse, stort pænt badeværelse samt 2 store og dejlige lyse stuer en suite. Lejligheden er indflytningsklar, meget lys og har nye flotte plankegulve. Ejendommen, der er opført i 1920, er istandsat med respekt for de mange detaljer denne ejendom byder på. Tag og facader er nyistandsat med nye termovinduer med lavenergiglas. Til lejligheden hører kælderrum, fælles vaskekælder samt hyggeligt nyrenoveret gårdmiljø.', 1795000, 12854, 9873, 128, 128, 3),
(10, 172708, 'Arkitektonisk perle tæt på centrum.', 'Herskabelig og nyistandsat villa med en meget attraktiv beliggenhed i det bedste kvartér. Den charmerende villa, der er opført i 1910 og er beliggende direkte ned til åen.	 \r\nVillaens samlede boligareal udgør 212 m2 fordelt på stueplan og første sal. \r\nDertil kommer en kælder på 108 m2 i meget fin boligkvalitet.', 4795000, 29229, 25120, 212, 2046, 1);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `house_type`
--

CREATE TABLE IF NOT EXISTS `house_type` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `house_type`
--

INSERT INTO `house_type` (`id`, `name`) VALUES
(1, 'Villa'),
(2, 'Rækkehus'),
(3, 'Lejlighed'),
(4, 'Landejendom');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `images`
--

CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) NOT NULL,
  `path` varchar(100) NOT NULL,
  `primary_img` tinyint(4) NOT NULL DEFAULT '0',
  `fk_house` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `images`
--

INSERT INTO `images` (`id`, `path`, `primary_img`, `fk_house`) VALUES
(23, '1569502082016_aold.jpg', 1, 7),
(24, '1569502082018_ynki.jpg', 0, 7),
(25, '1569502082019_ageo.jpg', 0, 7),
(26, '1569502082019_rlod.jpg', 0, 7),
(27, '1569502188768_l913.jpg', 1, 8),
(28, '1569502188769_af29.jpg', 0, 8),
(29, '1569502188770_g1w5.jpg', 0, 8),
(30, '1569502188770_qlgg.jpg', 0, 8),
(31, '1569502308745_24gr.jpg', 1, 9),
(32, '1569502308747_jqay.jpg', 0, 9),
(33, '1569502308747_s06p.jpg', 0, 9),
(34, '1569502308747_rfyy.jpg', 0, 9),
(35, '1569502379081_8bl1.jpg', 1, 10),
(36, '1569502379082_8cwv.jpg', 0, 10),
(37, '1569502379082_xvry.jpg', 0, 10),
(38, '1569502379083_4whu.jpg', 0, 10);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL,
  `headline` varchar(72) NOT NULL,
  `text` text NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `news`
--

INSERT INTO `news` (`id`, `headline`, `text`, `date`) VALUES
(1, 'EJENDOMSHANDEL MERE TRYG OG SIKKER', 'Ejendomsmæglerne får øget oplysningspligt. Og et disciplinærnævn skal sikre skrappere sanktioner, hvis en mægler overtræder reglerne.  Økonomi- og erhvervsminister Bendt Bendtsen (K) fik torsdag vedtaget sin skarpere linje over for ejendomsmæglere i Folketinget.  - Jeg er meget tilfreds med, at der var bred opbakning i Folketinget til mit lovforslag til stramninger af reglerne for omsætning af fast ejendom. Det bliver nu endnu mere trygt og sikkert for forbrugerne at handle bolig i Danmark, siger økonomi- og erhvervsminister Bendt Bendtsen.', '2006-04-26'),
(2, 'VI SKAL INFORMERE BEDRE', 'Dansk Ejendomsmæglerforening vil se nærmere på, om danske ejendomsmæglere kan blive bedre til at informere køberne ved bolighandler.   Når vi mødes efter sommerferien vil vi kigge på, om vores forbrugeretiske regler bør udbygges med nogle punkter om det her, siger næstformand Arne Madsen fra Dansk Ejendomsmæglerforening.   Generelt vil vi indskærpe, at man skal informere ordentligt. Køberne skal altid være velinformerede om deres situation, tilføjer Arne Madsen.', '2006-04-30'),
(3, 'LÆNGERE MELLEM BUDRUNDER PÅ BOLIGMARKEDET', 'Boligkøberne står ikke længere på nakken af hinanden, og det har siden sidste sommer betydet en halvering af boliger, der bliver sat til salg i licitation.  Boligejernes Videncenter Bolius har taget temperaturen på licitationsalget hos de tre største ejendomsmæglerkæder, Home, EDC og Danbolig. Alle tre melder om en halvering fra 10-12 procent sidste sommer til under 4-5 procent i dag.', '2006-05-05');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `open_times`
--

CREATE TABLE IF NOT EXISTS `open_times` (
  `id` int(11) NOT NULL,
  `days` varchar(20) NOT NULL,
  `open` time NOT NULL,
  `close` time NOT NULL,
  `not_open` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `open_times`
--

INSERT INTO `open_times` (`id`, `days`, `open`, `close`, `not_open`) VALUES
(1, 'Mandag', '00:00:00', '00:00:00', 1),
(2, 'Tirsdag', '09:30:00', '17:30:00', 0),
(3, 'Onsdag', '09:30:00', '17:30:00', 0),
(4, 'Torsdag', '09:30:00', '17:30:00', 0),
(5, 'Fredag', '09:30:00', '17:30:00', 0),
(6, 'Lørdag', '09:30:00', '13:00:00', 0),
(7, 'Søndag', '10:00:00', '15:00:00', 0);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `level` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `roles`
--

INSERT INTO `roles` (`id`, `name`, `level`) VALUES
(1, 'SuperAdmin', 100),
(2, 'admin', 99);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `username` varchar(18) NOT NULL,
  `password` varchar(72) NOT NULL,
  `fk_role` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `fk_role`) VALUES
(1, 'admin', '$2a$10$RePqOuxNyvVZIkpm/Ddm/.wQoWgREBsOF2BmMlZG0dIDs6uAmqC/m', 1);

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `contact_info`
--
ALTER TABLE `contact_info`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `houses`
--
ALTER TABLE `houses`
  ADD PRIMARY KEY (`id`), ADD KEY `fk_homes_house_type_idx` (`fk_house_type`);

--
-- Indeks for tabel `house_type`
--
ALTER TABLE `house_type`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`), ADD KEY `fk_images_homes_idx` (`fk_house`);

--
-- Indeks for tabel `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `open_times`
--
ALTER TABLE `open_times`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`), ADD KEY `fk_users_roles_idx` (`fk_role`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- Tilføj AUTO_INCREMENT i tabel `contact_info`
--
ALTER TABLE `contact_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- Tilføj AUTO_INCREMENT i tabel `houses`
--
ALTER TABLE `houses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- Tilføj AUTO_INCREMENT i tabel `house_type`
--
ALTER TABLE `house_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- Tilføj AUTO_INCREMENT i tabel `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=39;
--
-- Tilføj AUTO_INCREMENT i tabel `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- Tilføj AUTO_INCREMENT i tabel `open_times`
--
ALTER TABLE `open_times`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- Tilføj AUTO_INCREMENT i tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- Tilføj AUTO_INCREMENT i tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- Begrænsninger for dumpede tabeller
--

--
-- Begrænsninger for tabel `houses`
--
ALTER TABLE `houses`
ADD CONSTRAINT `fk_homes_house_type` FOREIGN KEY (`fk_house_type`) REFERENCES `house_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Begrænsninger for tabel `images`
--
ALTER TABLE `images`
ADD CONSTRAINT `fk_images_house` FOREIGN KEY (`fk_house`) REFERENCES `houses` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Begrænsninger for tabel `users`
--
ALTER TABLE `users`
ADD CONSTRAINT `fk_users_roles` FOREIGN KEY (`fk_role`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
