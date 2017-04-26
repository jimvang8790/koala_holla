CREATE TABLE koala(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(12) UNIQUE,
  sex VARCHAR(1),
  age INT,
  ready_for_transfer BOOLEAN,
  notes VARCHAR(140)
);

INSERT INTO koala (name, sex, age, ready_for_transfer,notes) VALUES ('Scotty','M',4,true,'Born in Guatemala');
INSERT INTO koala (name, sex, age, ready_for_transfer,notes) VALUES ('Jean','F',5,true,'Allergic to lots of lava');
INSERT INTO koala (name, sex, age, ready_for_transfer,notes) VALUES ('Ororo','F',7,false,'loves listening to Paula (Abdul)');
INSERT INTO koala (name, sex, age, ready_for_transfer,notes) VALUES ('Logan','M',15,false,'Love the sauna');
INSERT INTO koala (name, sex, age, ready_for_transfer,notes) VALUES ('Charlie','M',9,true,'Favorite band is Nirvana');
INSERT INTO koala (name, sex, age, ready_for_transfer,notes) VALUES ('Betsy','F',4,true,'Has a pet iguana');
