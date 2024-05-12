BULK INSERT Scooter
FROM '/data/scooters.csv'  -- Provide the path to your scooters.csv file
WITH (
    FIELDTERMINATOR = ',', 
    ROWTERMINATOR = '\n', 
    FIRSTROW = 1
);