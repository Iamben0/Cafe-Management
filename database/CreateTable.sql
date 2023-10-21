DROP TABLE IF EXISTS work_slots;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS user_profile;

CREATE TABLE user_profile
(
    id           SERIAL       NOT NULL PRIMARY KEY,
    profile_type VARCHAR(255) NOT NULL,
    job_title    VARCHAR(255) NOT NULL,
    active       BOOLEAN      NOT NULL
);


CREATE TABLE user_account
(
    id           SERIAL       NOT NULL PRIMARY KEY,
    username     VARCHAR(255) NOT NULL,
    name         VARCHAR(255) NOT NULL,
    password     VARCHAR(255) NOT NULL,
    active       BOOLEAN      NOT NULL,
    user_profile INTEGER REFERENCES user_profile (id)
);

CREATE TABLE work_slots
(
    id         SERIAL      NOT NULL PRIMARY KEY,
    start_time Timestamptz NOT NULL,
    end_time   Timestamptz NOT NULL,
    user_id    INTEGER REFERENCES user_account (id)
);