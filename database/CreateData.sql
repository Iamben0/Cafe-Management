DROP TABLE IF EXISTS bid;
DROP TABLE IF EXISTS work_slot;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS user_profile;

-- user_profile TABLE
INSERT INTO user_profile (profile_type, job_title, active)
VALUES ('admin', 'senior system admin', TRUE);
INSERT INTO user_profile (profile_type, job_title, active)
VALUES ('admin', 'junior system admin', TRUE);
INSERT INTO user_profile (profile_type, job_title, active)
VALUES ('owner', 'owner', TRUE);
INSERT INTO user_profile (profile_type, job_title, active)
VALUES ('manager', 'senior manager', TRUE);
INSERT INTO user_profile (profile_type, job_title, active)
VALUES ('manager', 'junior manager', TRUE);
INSERT INTO user_profile (profile_type, job_title, active)
VALUES ('staff', 'cashier', TRUE);
INSERT INTO user_profile (profile_type, job_title, active)
VALUES ('staff', 'waiter', TRUE);
INSERT INTO user_profile (profile_type, job_title, active)
VALUES ('staff', 'chef', TRUE);

-- user_account TABLE
INSERT INTO user_account (username, name, password, email, user_profile)
VALUES ('admin1', 'Robert Downey', 'password1', 'ironman@gmail.com', 1);
INSERT INTO user_account (username, name, password, email, user_profile)
VALUES ('admin2', 'Chris Evans', 'password2', 'captamerica@gmail.com', 2);
INSERT INTO user_account (username, name, password, email, user_profile)
VALUES ('owner', 'Chris Hemsworth', 'password3', 'thor@gmail.com', 3);
INSERT INTO user_account (username, name, password, email, user_profile)
VALUES ('manager1', 'Scarlett Johansson', 'password4', 'blackwidow@gmail.com', 4);
INSERT INTO user_account (username, name, password, email, user_profile)
VALUES ('manager2', 'Jeremy Renner', 'password5', 'hawkeye@gmail.com', 5);
INSERT INTO user_account (username, name, password, email, user_profile)
VALUES ('staff1', 'Mark Ruffalo', 'password6', 'hulk@gmail.com', 6);
INSERT INTO user_account (username, name, password, email, user_profile)
VALUES ('staff2', 'Samuel L. Jackson', 'password7', 'nightfury@gmail.com', 7);
INSERT INTO user_account (username, name, password, email, user_profile)
VALUES ('staff3', 'Peter Parker', 'password8', 'spiderman@gmail.com', 8);

CREATE TABLE work_slot
(
    id       SERIAL       NOT NULL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    shift    VARCHAR(255) NOT NULL CHECK ( shift IN ('morning', 'afternoon') ),
    date     DATE         NOT NULL,
    role     VARCHAR(255) NOT NULL CHECK (shift IN ('chef', 'waiter', 'cashier')),
    staff_id INTEGER REFERENCES user_account (id)
);

CREATE TABLE bid
(
    id           SERIAL  NOT NULL PRIMARY KEY,
    work_slot_id INTEGER REFERENCES work_slot (id),
    staff_id     INTEGER REFERENCES user_account (id),
    approved     BOOLEAN NOT NULL
);

