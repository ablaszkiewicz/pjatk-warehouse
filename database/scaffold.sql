CREATE TABLE Scooter (
    id VARCHAR(50) PRIMARY KEY,
    model VARCHAR(255)
);

CREATE TABLE MyUser (
    id VARCHAR(50) PRIMARY KEY,
    ageGroup VARCHAR(50), -- young (<18), adult (<60), old (>=60)
    city VARCHAR(50)
);

CREATE TABLE MyTime (
    id VARCHAR(50) PRIMARY KEY,
    day INT,
    month INT,
    year INT,
    timeOfDay VARCHAR(50)
);

CREATE TABLE Rental (
    id VARCHAR(50) PRIMARY KEY,
    scooterId VARCHAR(50),
    userId VARCHAR(50),
    timeId VARCHAR(50),
    isLocal BIT, -- true if city of rental is a city of user doing the rental
    FOREIGN KEY (scooterId) REFERENCES Scooter(id),
    FOREIGN KEY (userId) REFERENCES MyUser(id),
    FOREIGN KEY (timeId) REFERENCES MyTime(id),
);