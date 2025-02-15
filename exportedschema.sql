-- MySQL dump 10.13  Distrib 8.1.0, for Win64 (x86_64)
--
-- Host: localhost    Database: cineculture
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actor`
--

DROP TABLE IF EXISTS `actor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actor` (
  `actor_id` varchar(40) NOT NULL,
  `Age` varchar(40) DEFAULT NULL,
  `Gender` varchar(40) DEFAULT NULL,
  `Name` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`actor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actor`
--

LOCK TABLES `actor` WRITE;
/*!40000 ALTER TABLE `actor` DISABLE KEYS */;
INSERT INTO `actor` VALUES ('1','46','Male','Leonardo DiCaprio'),('10','80','Male','Marlon Brando'),('11','57','Male','Russell Crowe'),('12','47','Male','Christian Bale'),('13','56','Male','Robert Downey Jr.'),('15','45','Male','Sam Worthington'),('16','67','Male','John Travolta'),('18','66','Male','Bryan Cranston'),('19','42','Male','Aaron Paul'),('2','65','Male','Tom Hanks'),('20','34','Female','Emilia Clarke'),('21','35','Male','Kit Harington'),('22','17','Female','Millie Bobby Brown'),('23','46','Male','David Harbour'),('24','46','Male','Pedro Pascal'),('25','39','Female','Gina Carano'),('26','49','Male','Karl Urban'),('27','46','Male','Antony Starr'),('28','49','Male','Lee Jung-jae'),('29','40','Male','Park Hae-soo'),('30','58','Male','Jared Harris'),('31','69','Male','Stellan Skarsg├Ñrd'),('32','36','Female','Phoebe Waller-Bridge'),('33','39','Female','Sian Clifford'),('34','74','Male','Eugene Levy'),('4','52','Male','Edward Norton'),('5','57','Male','Keanu Reeves'),('6','47','Male','Christian Bale'),('7','59','Male','Matthew Broderick'),('8','74','Male','Sam Neill'),('9','52','Male','Matthew McConaughey');
/*!40000 ALTER TABLE `actor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `award_movie`
--

DROP TABLE IF EXISTS `award_movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `award_movie` (
  `award_id` int NOT NULL,
  `date` date NOT NULL,
  `Description` mediumblob,
  `Name` varchar(40) NOT NULL,
  `movie_id` varchar(40) NOT NULL,
  PRIMARY KEY (`award_id`),
  KEY `award_movie_id_idx` (`movie_id`),
  CONSTRAINT `award_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `award_movie`
--

LOCK TABLES `award_movie` WRITE;
/*!40000 ALTER TABLE `award_movie` DISABLE KEYS */;
/*!40000 ALTER TABLE `award_movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `can_review_and_rate_movie`
--

DROP TABLE IF EXISTS `can_review_and_rate_movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `can_review_and_rate_movie` (
  `movie_id` varchar(40) NOT NULL,
  `rating` decimal(3,2) DEFAULT NULL,
  KEY `rate_movie_idx` (`movie_id`),
  CONSTRAINT `rate_movie` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `can_review_and_rate_movie`
--

LOCK TABLES `can_review_and_rate_movie` WRITE;
/*!40000 ALTER TABLE `can_review_and_rate_movie` DISABLE KEYS */;
/*!40000 ALTER TABLE `can_review_and_rate_movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `can_review_and_rate_tv`
--

DROP TABLE IF EXISTS `can_review_and_rate_tv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `can_review_and_rate_tv` (
  `tv_id` varchar(40) NOT NULL,
  `rating` decimal(3,2) DEFAULT NULL,
  KEY `rating_tv_idx` (`tv_id`),
  CONSTRAINT `rating_tv` FOREIGN KEY (`tv_id`) REFERENCES `tv_show` (`tv_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `can_review_and_rate_tv`
--

LOCK TABLES `can_review_and_rate_tv` WRITE;
/*!40000 ALTER TABLE `can_review_and_rate_tv` DISABLE KEYS */;
/*!40000 ALTER TABLE `can_review_and_rate_tv` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `director`
--

DROP TABLE IF EXISTS `director`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `director` (
  `director_id` varchar(40) NOT NULL,
  `Age` varchar(40) DEFAULT NULL,
  `Gender` varchar(40) DEFAULT NULL,
  `Name` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`director_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `director`
--

LOCK TABLES `director` WRITE;
/*!40000 ALTER TABLE `director` DISABLE KEYS */;
INSERT INTO `director` VALUES ('1','57','Male','Alejandro Gonz├ílez I├▒├írritu'),('10','47','Male','Joss Whedon'),('11','46','Male','James Cameron'),('12','57','Male','Quentin Tarantino'),('2','70','Male','Robert Zemeckis'),('3','51','Male','Christopher Nolan'),('4','58','Male','David Fincher'),('5','56','N/A','The Wachowskis'),('6','66','Male','Steven Spielberg'),('7','N/A','N/A','Various Directors'),('8','51','Male','Francis Ford Coppola'),('9','56','Male','Ridley Scott');
/*!40000 ALTER TABLE `director` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `genre_id` varchar(40) NOT NULL,
  `Name` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`genre_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES ('1','Action'),('10','Mystery'),('2','Adventure'),('3','Comedy'),('4','Drama'),('5','Fantasy'),('6','Science Fiction'),('7','Romance'),('8','Horror'),('9','Thriller');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `has`
--

DROP TABLE IF EXISTS `has`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `has` (
  `director_id` varchar(40) DEFAULT NULL,
  `language_id` varchar(40) DEFAULT NULL,
  `actor_id` varchar(40) DEFAULT NULL,
  `movie_id` varchar(40) DEFAULT NULL,
  `tv_id` varchar(40) DEFAULT NULL,
  `genre_id` varchar(40) DEFAULT NULL,
  KEY `has_director_id_idx` (`director_id`),
  KEY `has_language_id_idx` (`language_id`),
  KEY `has_actor_id_idx` (`actor_id`),
  KEY `has_movie_id_idx` (`movie_id`),
  KEY `has_tv_id_idx` (`tv_id`),
  KEY `has_genre_id_idx` (`genre_id`),
  CONSTRAINT `has_actor_id` FOREIGN KEY (`actor_id`) REFERENCES `actor` (`actor_id`),
  CONSTRAINT `has_director_id` FOREIGN KEY (`director_id`) REFERENCES `director` (`director_id`),
  CONSTRAINT `has_genre_id` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`genre_id`),
  CONSTRAINT `has_language_id` FOREIGN KEY (`language_id`) REFERENCES `language` (`language_id`),
  CONSTRAINT `has_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`),
  CONSTRAINT `has_tv_id` FOREIGN KEY (`tv_id`) REFERENCES `tv_show` (`tv_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `has`
--

LOCK TABLES `has` WRITE;
/*!40000 ALTER TABLE `has` DISABLE KEYS */;
INSERT INTO `has` VALUES ('1','1','1','892nln-ifsu',NULL,'4'),('2','1','2','90sfjbfwfj',NULL,'4'),('3','1','1','asdf-12-jk',NULL,'6'),('4','1','4','asufhaof32',NULL,'4'),('5','1','5','ci92nc02-u',NULL,'6'),('3','1','12','cwoh2s',NULL,'1'),('8','1','10','sfasdfe',NULL,'5'),('3','1','10',NULL,'0','2'),('4','1','1',NULL,'1','4'),('7','1','6',NULL,'12','3'),('1','1','9',NULL,'16','1'),('6','2','11',NULL,'18','6'),('5','4','8',NULL,'15','5'),('5','1','2','ohgiwig',NULL,'4'),('1','1','1','sdcaknce',NULL,'1'),('2','3','1','sfasdf',NULL,'9'),('6','1','4','sfh80kn',NULL,'4'),('8','1','5','sfnaisjfuh98',NULL,'5'),('3','2','7','sifh0skncl',NULL,'6'),('4','3','6','siha[icxlkn',NULL,'7'),('5','4','8','skoaic21',NULL,'9'),('7','5','9','srhiajb',NULL,'2'),('9','8','10','ucbuweo',NULL,'3'),('5','4','8',NULL,'15','5'),('2','6','5',NULL,'14','8'),('7','1','2',NULL,'3','1'),('8','3','4',NULL,'4','10'),('4','1','1',NULL,'5','3'),('6','6','6',NULL,'6','6'),('9','1','2',NULL,'7','3'),('6','3','5',NULL,'8','6'),('1','8','2',NULL,'9','2'),('8','9','6',NULL,'10','3'),('9','3','10',NULL,'11','5');
/*!40000 ALTER TABLE `has` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language`
--

DROP TABLE IF EXISTS `language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `language` (
  `language_id` varchar(40) NOT NULL,
  `Name` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`language_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language`
--

LOCK TABLES `language` WRITE;
/*!40000 ALTER TABLE `language` DISABLE KEYS */;
INSERT INTO `language` VALUES ('1','English'),('10','Portuguese'),('11','Korean'),('12','Italian'),('13','Dutch'),('14','Swedish'),('15','Turkish'),('16','Greek'),('17','Polish'),('18','Czech'),('19','Hungarian'),('2','Spanish'),('20','Danish'),('3','French'),('4','German'),('5','Chinese'),('6','Arabic'),('7','Hindi'),('8','Japanese'),('9','Russian');
/*!40000 ALTER TABLE `language` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `movie_id` varchar(40) NOT NULL,
  `name` varchar(40) NOT NULL,
  `avg_rating` decimal(3,2) NOT NULL,
  `poster` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`movie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES ('892nln-ifsu','The Revenant',2.00,'posters/movieposter/revenant.jpg'),('90sfjbfwfj','Forrest Gump',4.00,'posters/movieposter/forrest_gump.jpg'),('asdf-12-jk','Inception',4.00,'posters/movieposter/inception.jpg'),('asufhaof32','Fight Club',3.00,'posters/movieposter/fight_club.jpg'),('ci92nc02-u','The Matrix Reloaded',4.20,'posters/movieposter/matrix_reloaded.jpg'),('cwoh2s','The Dark Knight Rises',4.80,'posters/movieposter/dkr.jpg'),('ohgiwig','The Lion King',4.30,'posters/movieposter/lionking.jpg'),('sdcaknce','Jurassic Park',4.00,'posters/movieposter/jurassic_park.jpg'),('sfasdf','Interstellar',4.10,'posters/movieposter/interstellar.jpg'),('sfasdfe','The Godfather',5.00,'posters/movieposter/godfather.jpg'),('sfh80kn','Gladiator',2.60,'posters/movieposter/gladiator.jpg'),('sfnaisjfuh98','The Dark Knight',2.50,'posters/movieposter/dk.jpg'),('sifh0skncl','The Avengers',3.00,'posters/movieposter/avengers.jpg'),('siha[icxlkn','The Matrix',2.10,'posters/movieposter/matrix.jpg'),('skoaic21','Avatar',3.20,'posters/movieposter/avatar.jpg'),('srhiajb','Pulp Fiction',3.80,'posters/movieposter/pulp_fiction.jpg'),('ucbuweo','Titanic',4.50,'posters/movieposter/titanic.jpg');
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie_reviews`
--

DROP TABLE IF EXISTS `movie_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie_reviews` (
  `movie_id` varchar(40) NOT NULL,
  `review` longtext,
  `rating` smallint DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `isReviewer` tinyint DEFAULT NULL,
  KEY `movie_review_id_idx` (`movie_id`),
  CONSTRAINT `movie_review_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie_reviews`
--

LOCK TABLES `movie_reviews` WRITE;
/*!40000 ALTER TABLE `movie_reviews` DISABLE KEYS */;
INSERT INTO `movie_reviews` VALUES ('sfasdfe','the godfather is goated with the sauce',2,'reviewer1',1),('sifh0skncl','The avengers sucks. Thor is amazing so its a 2. ',2,'dshah',0),('sdcaknce','sfasdf',4,'dshah',0),('892nln-ifsu','dasdf',2,'admin1',1),('asdf-12-jk','Inception',4,'dshah1',0),('asufhaof32','Da Fight club',3,'dshah1',0);
/*!40000 ALTER TABLE `movie_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviewer`
--

DROP TABLE IF EXISTS `reviewer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviewer` (
  `affiliation` varchar(40) DEFAULT NULL,
  `user_id` varchar(40) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `name` varchar(40) DEFAULT NULL,
  KEY `user_id_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviewer`
--

LOCK TABLES `reviewer` WRITE;
/*!40000 ALTER TABLE `reviewer` DISABLE KEYS */;
INSERT INTO `reviewer` VALUES ('New York Times','1','hashed_password','nytimes_user','John Doe'),('New York Times','9af32807-6d6a-451b-a16a-8e31b8ba9710','$2b$12$BJUJLibSsNc2hCU5VHn1C.2j1mZ.oxzGv.AOMoSKUq3CRqwxxDXvu','reviewer','reviewer'),('The Daily Mail','9a9d3bbb-9ea9-4ca6-a012-277535f39005','$2b$12$U0P14oiTs5zQZRzIgqYdY.IW9rt0IqV.ngzeXZGwqwFJtGkFyysaG','reviewer1','reviewer1'),('New York Times','047348e0-fcc8-4ac0-972c-c9483cde37e2','$2b$12$bavqGYSN6Gfywr5kJ56jRusJ96USsjGdyCNlQkwLcB4hSTqp2BDva','reviewer2','reviewer2'),(NULL,'2ec3eab2-0368-4e9c-babf-0e596580a989','$2b$12$VM.WubysYKozTm0Wr9AXNeIzxQmk9m8P3bqwT/8yjk1V49FUJThFO','Reviewer3','The homie'),(NULL,'1c0d82aa-4894-4d6a-8378-deff97017c8c','$2b$12$VCmYdYyHZq5d/DfDuHmMZeBWv9hs5iuJ3xbbRguuoTokFPOZvyh/e','admin1','aayush'),(NULL,'2ce03163-d27a-468b-a928-e9379fce3a7f','$2b$12$gc/sH6hBsxdy9q.qgXjzmeAaI60tLNItVXmljv2icsl5QKMobRouW','admin3','admin3');
/*!40000 ALTER TABLE `reviewer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tv_reviews`
--

DROP TABLE IF EXISTS `tv_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tv_reviews` (
  `tv_id` varchar(40) NOT NULL,
  `review` longtext,
  `rating` smallint DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `isReviewer` tinyint DEFAULT NULL,
  KEY `tv_review_id_idx` (`tv_id`),
  CONSTRAINT `tv_review_id` FOREIGN KEY (`tv_id`) REFERENCES `tv_show` (`tv_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tv_reviews`
--

LOCK TABLES `tv_reviews` WRITE;
/*!40000 ALTER TABLE `tv_reviews` DISABLE KEYS */;
INSERT INTO `tv_reviews` VALUES ('18','dasf',NULL,'dshah1',NULL),('12','asdfa',4,'reviewer1',1),('12','ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',2,'dshah1',0),('15','Arcane my ass ma boi',2,'dshah1',0),('18','Amazing fleabag',5,'reviewer1',1),('5','This is my favorite show, saul goodman is the goat for real. ',4,'dshah1',0),('5','Better caul saul! What a show. ',4,'dshah',0),('10','Ted lasso is super heart warming. ',2,'dshah',0),('9','adfadsf',2,'dshah1',0),('3','the sopranos more like the ',1,'dshah1',0),('4','Many Men ',3,'dshah1',0),('16','Heart Stopper!!!',5,'admin1',1),('3','Sopranos is great!',5,'user4',0),('3','DA SOPRANOS',5,'user3',0),('5','better call your mom fr',3,'user3',0),('3','Amazing!',1,'user6',0);
/*!40000 ALTER TABLE `tv_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tv_show`
--

DROP TABLE IF EXISTS `tv_show`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tv_show` (
  `tv_id` varchar(40) NOT NULL,
  `name` varchar(40) NOT NULL,
  `avg_rating` decimal(3,2) NOT NULL,
  `numberSeasons` int NOT NULL,
  `numberEpisodes` int NOT NULL,
  `poster` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`tv_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tv_show`
--

LOCK TABLES `tv_show` WRITE;
/*!40000 ALTER TABLE `tv_show` DISABLE KEYS */;
INSERT INTO `tv_show` VALUES ('0','Breaking Bad',1.90,2,23,'posters/tvposter/breakingbad.jpg'),('1','Game of Thrones',2.00,3,43,'posters/tvposter/gameofthrones.jpg'),('10','Ted Lasso',2.90,9,76,'posters/tvposter/tedlasso.jpg'),('11','Stranger Things',3.00,11,54,'posters/tvposter/strangerthings.jpg'),('12','The Mandalorian',3.10,7,76,'posters/tvposter/themando.jpg'),('13','The Boys',3.20,8,43,'posters/tvposter/theboys.jpg'),('14','Squid Game',3.30,4,32,'posters/tvposter/squidgame.jpg'),('15','Arcane',3.40,2,54,'posters/tvposter/arcane.jpg'),('16','Heartstopper',5.00,1,37,'posters/tvposter/heartstopper.jpg'),('17','Chernobyl',3.60,2,28,'posters/tvposter/chernobyl.jpg'),('18','Fleabag',3.70,3,23,'posters/tvposter/aliceinborderland.jpg'),('19','Schitt\'s Creek',3.80,4,16,'posters/tvposter/screek.jpg'),('2','The Wire',2.10,5,54,'posters/tvposter/thewire.jpg'),('3','The Sopranos',3.00,8,6,'posters/tvposter/thesopranos.jpg'),('4','Mad Men',3.00,9,45,'posters/tvposter/madmen.jpg'),('5','Better Call Saul',3.67,5,65,'posters/tvposter/bcs.jpg'),('6','Succession',2.50,10,76,'posters/tvposter/succession.jpg'),('7','Ozark',2.60,5,24,'posters/tvposter/ozark.jpg'),('8','The Crown',2.70,2,55,'posters/tvposter/crown.jpg'),('9','Severance',2.00,6,34,'posters/tvposter/severance.jpg');
/*!40000 ALTER TABLE `tv_show` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` varchar(40) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email_address` varchar(45) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('0','bob','aa','bob12@gmail.com',''),('05684e16-6b4b-48ba-a005-07a0f09f2c62','user6','$2b$12$flX4xWl0XSGlnJvX1HtevuTUwZAbNMw9apVSDwC9yzlQ06xFPRZOa','user6@gmail.com','user6'),('1','marley','bb','bob13@gmail.com',''),('10','aayush','kkk','bob22@gmail.com',''),('11','dhruvil','llll','bob23@gmail.com',''),('12','ryan','mmmm','bob24@gmail.com',''),('13','tim','nn','bob25@gmail.com',''),('14','timmy','ooo','bob26@gmail.com',''),('15','will','pppp','bob27@gmail.com',''),('16','willis','qqq','bob28@gmail.com',''),('17','octopus','rs','bob29@gmail.com',''),('18','tyler','tuv','bob30@gmail.com',''),('19','wayne','wxyz','bob31@gmail.com',''),('2','brown','cc','bob14@gmail.com',''),('2e098848-6b40-43de-8b4a-76de726e6fd3','user5','$2b$12$JJgxna2wlqcXmfvS/O3z8uSS7QlCmX8zIm5YmXAb9iXrli3lKjwsK','user5@gmail.com','user5'),('3','blue','dd','bob15@gmail.com',''),('385963b3-2ef7-4442-af4e-32f12e0e65f5','usernames','passwords',NULL,''),('3e5f5cd0-17c7-4619-a725-135155ccb362','','',NULL,''),('4','mace','ee','bob16@gmail.com',''),('49405206-39d3-4f42-9c1c-59d2ccc3da9b','richard','rahma',NULL,''),('4d1ee10c-976b-4131-ae59-fb3be69fb149','him','$2b$12$8aVNxW3wLucMtpZAdH12LuoLEE/GJkWKW1t5KH03NcJ.Dje7yg9t.','gmails@gmail.com','usernamess'),('5','macy','ff','bob17@gmail.com',''),('5de1d11a-71a0-4153-bc52-76f5bb316d8b','user4','$2b$12$pDgDqofInJYUwybJ6BBPIOWLTBccQI6QsCCquYlovu40YaMelMHBC','user4@gmail.com','user4'),('6','mary','gg','bob18@gmail.com',''),('7','rich','hh','bob19@gmail.com',''),('72766e06-6d1b-4182-b1fb-790fe98dbb78','dshah1','$2b$12$JueLopLU2xSGRUi6g1PZFeEDgOQgmWBd7E09fLD6Ppo6Vy4BGdANW','gmail@gmail.com','dshah1'),('72f0798c-d6da-4360-89f2-b82c5eddbaa1','username','password',NULL,''),('8','parth','iii','bob20@gmail.com',''),('9','rishi','jjjj','bob21@gmail.com',''),('92512630-0058-4f92-99d9-c6a2256cc08b','user3','$2b$12$3ttpEIdX4qrXPZH.TNSASeGWnoGkNlMnQOTp7oAoWKH9toettzy8C','user3@gmail.com','user3'),('ab123',NULL,NULL,NULL,''),('ab464',NULL,NULL,NULL,''),('e442e38d-8bac-44fb-9bc4-d0304d51e4e2','dshah','$2b$12$LeXi.ufgGS3aSKhJsxwn8.uBNL63As7t12ofCfpeh6AAWzL2g2Kyu','dshah@gmail.com','dshah');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watchlist`
--

DROP TABLE IF EXISTS `watchlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `watchlist` (
  `Name` varchar(40) NOT NULL,
  `user_ID` varchar(40) NOT NULL,
  KEY `user_id_idx` (`user_ID`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_ID`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watchlist`
--

LOCK TABLES `watchlist` WRITE;
/*!40000 ALTER TABLE `watchlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `watchlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watchlist_content`
--

DROP TABLE IF EXISTS `watchlist_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `watchlist_content` (
  `user_id` varchar(40) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  KEY `watchlist_content_idx` (`user_id`),
  CONSTRAINT `watchlist_content` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watchlist_content`
--

LOCK TABLES `watchlist_content` WRITE;
/*!40000 ALTER TABLE `watchlist_content` DISABLE KEYS */;
/*!40000 ALTER TABLE `watchlist_content` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-04  0:06:53
