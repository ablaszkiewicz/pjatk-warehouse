-- Create a temporary table to load data from CSV
CREATE TABLE TempRentalA (
    id VARCHAR(50) PRIMARY KEY,
    scooterId VARCHAR(50),
    userId VARCHAR(50),
    startDate DATETIME,
    endDate DATETIME,
    city VARCHAR(255)
);

CREATE TABLE TempRentalB (
    id VARCHAR(50) PRIMARY KEY,
    scooterId VARCHAR(50),
    userId VARCHAR(50),
    city VARCHAR(50),
    startDate DATE,
    timeOfDay VARCHAR(255)
);

-- Load data into temporary table
BULK INSERT TempRentalA
FROM '/data/rentals.csv'  -- Provide the path to your rentals.csv file
WITH (
    FIELDTERMINATOR = ',', 
    ROWTERMINATOR = '\n', 
    FIRSTROW = 2
);

-- Insert into Rental table with timeId and isLocal calculation
INSERT INTO TempRentalB (id, scooterId, userId, city, startDate, timeOfDay)
SELECT 
    tr.id,
    tr.scooterId,
    tr.userId,
    tr.city,
    tr.startDate,
    CASE
	    WHEN DATEPART(HOUR, tr.startDate) >= 8 AND DATEPART(HOUR, tr.startDate) < 12 THEN 'morning'
	    WHEN DATEPART(HOUR, tr.startDate) >= 12 AND DATEPART(HOUR, tr.startDate) < 16 THEN 'afternoon'
	    ELSE 'evening'
	END AS timeOfDay
FROM TempRentalA tr


INSERT INTO Rental (id, scooterId, userId, timeId, isLocal)
SELECT 
    trb.id,
    trb.scooterId,
    trb.userId,
    mt.id AS timeId,
    CASE WHEN trb.city = tu.city THEN 1 ELSE 0 END AS isLocal
FROM TempRentalB trb
JOIN MyUser tu ON trb.userId = tu.id
JOIN (
    SELECT 
        id,
        day,
        month,
        year,
        timeOfDay
    FROM MyTime
) mt ON 
    mt.year = YEAR(trb.startDate) AND
    mt.month = MONTH(trb.startDate) AND
    mt.day = DAY(trb.startDate) AND
    mt.timeOfDay = trb.timeOfDay
    
    
DROP TABLE TempRentalA;
DROP TABLE TempRentalB;
