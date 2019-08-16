/*
    this trys to find a record in the sql db
*/

SELECT user from ${schema~}.users(username)
VALUES($1)
RETURNING *
