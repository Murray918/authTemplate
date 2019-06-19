INSERT INTO users (color, brightness, size, age)
SELECT color, brightness, size, age 
FROM users
WHERE NOT EXISTS (
    SELECT 1 FROM 
    FROM users
    WHERE 
);
SELECT (color, brightness, size, age) 
FROM users 
WHERE 