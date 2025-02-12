create table user (
  id int unsigned primary key auto_increment not null,
  pseudo varchar(120) not null unique,
  email varchar(255) not null unique,
  password varchar(255) not null
);

create table animals (
  id int unsigned primary key auto_increment not null,
  name varchar(255) not null,
  age int null,
  poids varchar(50) null,
  commentaire varchar(800) null,
  vaccin TINYINT(1)  not null,
  vaccin_date date null,
  img_path varchar(900) null,
  user_id int unsigned not null,
  foreign key(user_id) references user(id)
);

create table species (
    id int unsigned primary key auto_increment not null,
    espece varchar(125) not null,
    race varchar(125) null,
    animals_id int unsigned not null,
    foreign key(animals_id) references animals(id)
);

INSERT INTO user (pseudo, email, password) 
VALUES 
('Alice123', 'alice@example.com', 'hashed_password_1'),
('Bob456', 'bob@example.com', 'hashed_password_2'),
('Charlie789', 'charlie@example.com', 'hashed_password_3'),
('David007', 'david@example.com', 'hashed_password_4'),
('EveXYZ', 'eve@example.com', 'hashed_password_5');


INSERT INTO animals (name, age, poids, commentaire, vaccin, vaccin_date, img_path, user_id) 
VALUES 
('Milo', 3, '12.5', 'Chien très joueur et sociable.', 1, '2024-01-15', 'images/milo.jpg', 1),
('Whiskers', 2, '4.2', 'Chat calme mais curieux.', 0, NULL, 'images/whiskers.jpg', 2),
('Nugget', 1, '1.8', 'Petit lapin très actif.', 1, '2023-12-10', 'images/nugget.jpg', 3),
('Rex', 5, '30', 'Chien de grande taille, très protecteur.', 1, '2023-06-25', NULL, 4),
('Goldie', NULL, NULL, 'Poisson rouge paisible.', 0, NULL, NULL, 1);


INSERT INTO species (espece, race, animals_id) 
VALUES 
('Chien', 'Labrador', 1),
('Chat', 'Siamois', 2),
('Lapin', 'Nain', 3),
('Chien', 'Berger Allemand', 4),
('Poisson', 'Poisson Rouge', 5);
