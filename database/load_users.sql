CREATE TABLE TempUser (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    birthDate DATE,
    gender VARCHAR(10),
    city VARCHAR(255)
);

BULK INSERT TempUser
FROM '/data/users.csv'
WITH (
    FIELDTERMINATOR = ',', 
    ROWTERMINATOR = '\n', 
    FIRSTROW = 1
);

INSERT INTO MyUser (id, ageGroup, city)
SELECT 
    id,
    CASE 
        WHEN DATEDIFF(YEAR, birthDate, GETDATE()) < 18 THEN 'young'
        WHEN DATEDIFF(YEAR, birthDate, GETDATE()) < 60 THEN 'adult'
        ELSE 'old'
    END AS ageGroup,
    city
FROM TempUser;

DROP TABLE TempUser;