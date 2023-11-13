DROP TABLE IF EXISTS bid;
DROP TABLE IF EXISTS work_slot;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS user_profile;
CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE user_profile
(
    id           SERIAL PRIMARY KEY,
    profile_type VARCHAR(255) NOT NULL,
    job_title    VARCHAR(255) NOT NULL UNIQUE,
    active       BOOLEAN      NOT NULL DEFAULT TRUE
);

CREATE TABLE user_account
(
    id              SERIAL PRIMARY KEY                                                    ,
    username        VARCHAR(255) NOT NULL UNIQUE                                          ,
    name            VARCHAR(255) NOT NULL                                                 ,
    password        VARCHAR(255) NOT NULL                                                 ,
    email           VARCHAR(255) NOT NULL                                                 ,
    active          BOOLEAN      NOT NULL DEFAULT TRUE                                    ,
    role            VARCHAR(255) NOT NULL DEFAULT 'un-assign' CHECK (role IN ('un-assign' , 'non-staff' , 'chef' , 'waiter' , 'cashier')) ,
    user_profile_id INTEGER REFERENCES user_profile (id)

);

CREATE TABLE work_slot
(
    id           SERIAL PRIMARY KEY,
    shift        VARCHAR(255) NOT NULL CHECK ( shift IN ('morning', 'afternoon') ),
    role         VARCHAR(255) NOT NULL CHECK (role IN ('chef', 'waiter', 'cashier')),
    date         DATE         NOT NULL,
    assigned     BOOLEAN      NOT NULL DEFAULT FALSE
);


CREATE TABLE bid
(
    id           SERIAL PRIMARY KEY,
    work_slot_id INTEGER REFERENCES work_slot (id) NOT NULL,
    staff_id     INTEGER REFERENCES user_account (id),
    status       VARCHAR(255) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'))
);

