DROP TABLE IF EXISTS schedules;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users(

id SERIAL PRIMARY KEY,
surname VARCHAR(60) NOT NULL,
firstname VARCHAR(60) NOT NULL,
email VARCHAR(255) NOT NULL,
password VARCHAR(100) NOT NULL

);

CREATE TABLE IF NOT EXISTS schedules(
id  SERIAL PRIMARY KEY,
user_id INTEGER NOT NULL,
day INTEGER NOT NULL,
start_time TIME NOT NULL ,
end_time TIME NOT NULL,
CONSTRAINT fk_users
FOREIGN KEY(user_id)
REFERENCES users(id)

);