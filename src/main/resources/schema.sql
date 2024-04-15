CREATE TABLE Billett
(
    id INTEGER AUTO_INCREMENT NOT NULL,
    fornavn VARCHAR(255) NOT NULL,
    etternavn VARCHAR(255) NOT NULL,
    telefonnr SMALLINT NOT NULL,
    epost VARCHAR(255) NOT NULL,
    film  VARCHAR(255) NOT NULL,
    antall SMALLINT NOT NULL,
    primary key (id)
);