DROP TABLE IF EXISTS work_slot;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS user_profile;


CREATE TABLE user_profile
(
    id           SERIAL       NOT NULL PRIMARY KEY,
    profile_type VARCHAR(255) NOT NULL,
    job_title    VARCHAR(255) NOT NULL,
    active       BOOLEAN      NOT NULL
);

INSERT INTO user_profile (profile_type, job_title, active)
VALUES ('System Admin', 'Senior System Admin', TRUE);
INSERT INTO user_profile (profile_type, job_title, active)
VALUES ('System Admin', ' Junior System Admin', TRUE);
INSERT INTO user_profile (profile_type, job_title, active)
VALUES ('Owner', 'Owner', TRUE);
INSERT INTO user_profile (profile_type, job_title, active)
VALUES ('Manager', 'Senior Manager', TRUE);
INSERT INTO user_profile (profile_type, job_title, active)
VALUES ('Manager', 'Junior Manager', TRUE);
INSERT INTO user_profile (profile_type, job_title, active)
VALUES ('Staff', 'Chef', TRUE);
INSERT INTO user_profile (profile_type, job_title, active)
VALUES ('Staff', 'Waiter', TRUE);
INSERT INTO user_profile (profile_type, job_title, active)
VALUES ('Staff', 'Cashier', TRUE);

CREATE TABLE user_account
(
    id           SERIAL       NOT NULL PRIMARY KEY,
    username     VARCHAR(255) NOT NULL,
    name         VARCHAR(255) NOT NULL,
    password     VARCHAR(255) NOT NULL,
    email        VARCHAR(255) NOT NULL,
    user_profile INTEGER REFERENCES user_profile (id)
);

INSERT INTO user_account (username, name, password, email, user_profile)
VALUES ('admin1', 'Robert Downey', 'password1', 'ironman@gmail.com', 1 );
INSERT INTO user_account (username, name, password, email, user_profile)
VALUES ('admin2', 'Chris Evans', 'password2', 'captamerica@gmail.com', 2 );
INSERT INTO user_account (username, name, password, email, user_profile)
VALUES ('owner', 'Chris Hemsworth', 'password3', 'thor@gmail.com', 3 );
INSERT INTO user_account (username, name, password, email, user_profile)
VALUES ('manager1', 'Scarlett Johansson', 'password4', 'blackwidow@gmail.com', 4 );
INSERT INTO user_account (username, name, password, email, user_profile)
VALUES ('manager2', 'Jeremy Renner', 'password5', 'hawkeye@gmail.com', 5 );
INSERT INTO user_account (username, name, password, email, user_profile)
VALUES ('staff1', 'Mark Ruffalo', 'password6', 'hulk@gmail.com', 6 );
INSERT INTO user_account (username, name, password, email, user_profile)
VALUES ('staff2', 'Samuel L. Jackson', 'password7', 'nightfury@gmail.com', 7 );
INSERT INTO user_account (username, name, password, email, user_profile)
VALUES ('staff3', 'Peter Parker', 'password8', 'spiderman@gmail.com', 8 );

CREATE TABLE work_slot
(
    id         SERIAL      NOT NULL PRIMARY KEY,
    start_time Timestamptz NOT NULL,
    end_time   Timestamptz NOT NULL,
    user_id    INTEGER REFERENCES user_account (id)
);

-- Timestamptz: 2004-10-19 10:23:54 (format for time and date)
--
-- Java: OffsetDateTime(2004, 10, 19, 10, 23, 54, 0, ZoneOffset.UTC)
-- OffsetDateTime: 2004-10-19T10:23:54Z (format for time and date)
