INSERT INTO author(firstname, lastname, email)
VALUES ($1, $2, $3)
RETURNING *;