WITH Dates AS (
    SELECT CAST('2024-02-01' AS DATE) AS date_column
    UNION ALL
    SELECT DATEADD(DAY, 1, date_column)
    FROM Dates
    WHERE MONTH(DATEADD(DAY, 1, date_column)) = 2
),
TimeSlots AS (
    SELECT 'morning' AS timeOfDay
    UNION ALL
    SELECT 'afternoon'
    UNION ALL
    SELECT 'evening'
)
INSERT INTO MyTime (id, day, month, year, timeOfDay)
SELECT
    NEWID(),
    DAY(d.date_column),
    MONTH(d.date_column),
    YEAR(d.date_column),
    t.timeOfDay
FROM
    Dates d
CROSS JOIN
    TimeSlots t
WHERE
    MONTH(d.date_column) IN (2, 3);
    