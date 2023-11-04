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

INSERT INTO user_profile (profile_type, job_title, active)
VALUES ('admin', 'senior system admin', TRUE),
       ('admin', 'junior system admin', TRUE),
       ('owner', 'owner', TRUE),
       ('manager', 'senior manager', TRUE),
       ('manager', 'junior manager', TRUE),
       ('staff', 'junior staff', TRUE),
       ('staff', 'senior staff', TRUE);

CREATE TABLE user_account
(
    id           SERIAL PRIMARY KEY,
    username     VARCHAR(255) NOT NULL UNIQUE,
    name         VARCHAR(255) NOT NULL,
    password     VARCHAR(255) NOT NULL,
    email        VARCHAR(255) NOT NULL,
    active       BOOLEAN      NOT NULL DEFAULT TRUE,
    role         VARCHAR(255) NOT NULL DEFAULT 'un-assign' CHECK (role IN ('un-assign', 'non-staff', 'chef', 'waiter', 'cashier')),
    user_profile INTEGER REFERENCES user_profile (id)
);

INSERT INTO user_account (username, name, password, email, active, role, user_profile) VALUES
       ('admin1'   , 'Robert Downey'      , 'password1' , 'ironman@gmail.com'     , TRUE , 'non-staff' , 1)  ,
       ('admin2'   , 'Chris Evans'        , 'password2' , 'captamerica@gmail.com' , TRUE , 'non-staff' , 2)  ,
       ('owner'    , 'Chris Hemsworth'    , 'password3' , 'thor@gmail.com'        , TRUE , 'non-staff' , 3)  ,
       ('manager1' , 'Scarlett Johansson' , 'password4' , 'blackwidow@gmail.com'  , TRUE , 'non-staff' , 4)  ,
       ('manager2' , 'Jeremy Renner'      , 'password5' , 'hawkeye@gmail.com'     , TRUE , 'non-staff' , 5)  ,
       ('staff1'   , 'Mark Ruffalo'       , 'password6' , 'hulk@gmail.com'        , TRUE , 'chef'      , 6)  ,
       ('staff2'   , 'Samuel L. Jackson'  , 'password7' , 'nightfury@gmail.com'   , TRUE , 'waiter'    , 7)  ,
       ('staff3'   , 'Peter Parker'       , 'password8' , 'spiderman@gmail.com'   , TRUE , 'cashier'   , 7)  ,
       ('staff4'   , 'person1'            , 'password6' , 'person1@gmail.com'     , TRUE , 'un-assign' , 6)  ,
       ('staff5'   , 'person2'            , 'password7' , 'person2@gmail.com'     , TRUE , 'un-assign' , 7)  ,
       ('staff6'   , 'person3'            , 'password8' , 'person3@gmail.com'     , TRUE , 'un-assign' , 7);


CREATE TABLE work_slot
(
    id           SERIAL PRIMARY KEY,
    shift        VARCHAR(255) NOT NULL CHECK ( shift IN ('morning', 'afternoon') ),
    role         VARCHAR(255) NOT NULL CHECK (role IN ('chef', 'waiter', 'cashier')),
    date         DATE         NOT NULL,
    assigned     BOOLEAN      NOT NULL DEFAULT FALSE
);

INSERT INTO work_slot (shift, role, date, assigned) VALUES
    ('morning'   , 'chef'    , '2023-12-01' , TRUE ) ,
    ('morning'   , 'waiter'  , '2023-12-01' , TRUE ) ,
    ('morning'   , 'cashier' , '2023-12-01' , TRUE ) ,
    ('afternoon' , 'chef'    , '2023-12-01' , TRUE ) ,
    ('afternoon' , 'waiter'  , '2023-12-01' , TRUE ) ,
    ('afternoon' , 'cashier' , '2023-12-02' , TRUE ) ,
    ('morning'   , 'chef'    , '2023-12-02' , TRUE ) ,
    ('morning'   , 'waiter'  , '2023-12-02' , TRUE ) ,
    ('morning'   , 'cashier' , '2023-12-02' , TRUE ) ,
    ('afternoon' , 'chef'    , '2023-12-02' , TRUE ) ,
    ('afternoon' , 'waiter'  , '2023-12-02' , TRUE ) ,
    ('afternoon' , 'cashier' , '2023-12-02' , TRUE ) ,
    ('morning'   , 'chef'    , '2023-12-03' , TRUE ) ,
    ('morning'   , 'waiter'  , '2023-12-03' , TRUE ) ,
    ('morning'   , 'cashier' , '2023-12-03' , TRUE ) ,
    ('afternoon' , 'chef'    , '2023-12-03' , TRUE ) ,
    ('afternoon' , 'waiter'  , '2023-12-03' , TRUE ) ,
    ('morning'   , 'cashier' , '2023-12-03' , FALSE ) ,
    ('afternoon' , 'chef'    , '2023-12-03' , FALSE ) ,
    ('afternoon' , 'waiter'  , '2023-12-03' , FALSE ) ,
    ('afternoon' , 'waiter'  , '2023-12-03' , FALSE ) ,
    ('morning'   , 'cashier' , '2023-12-04' , FALSE ) ,
    ('afternoon' , 'chef'    , '2023-12-04' , FALSE ) ,
    ('afternoon' , 'waiter'  , '2023-12-04' , FALSE ) ,
    ('afternoon' , 'waiter'  , '2023-12-04' , FALSE ) ,
    ('morning'   , 'cashier' , '2023-12-05' , FALSE ) ,
    ('afternoon' , 'chef'    , '2023-12-05' , FALSE ) ,
    ('afternoon' , 'waiter'  , '2023-12-05' , FALSE ) ,
    ('afternoon' , 'waiter'  , '2023-12-05' , FALSE ) ;


CREATE TABLE bid
(
    id           SERIAL PRIMARY KEY,
    work_slot_id INTEGER REFERENCES work_slot (id) NOT NULL,
    staff_id     INTEGER REFERENCES user_account (id),
    status       VARCHAR(255) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'))
);

INSERT INTO bid (work_slot_id, staff_id, status) VALUES
(1  , 6 , 'approved' )   ,
(2  , 7 , 'approved' )   ,
(3  , 8 , 'approved' )   ,
(4  , 6 , 'approved' )   ,
(5  , 7 , 'approved' )   ,
(6  , 8 , 'approved' )   ,
(7  , 6 , 'approved' )   ,
(8  , 7 , 'approved' )   ,
(9  , 8 , 'approved' )   ,
(10 , 6 , 'approved' )   ,
(11 , 7 , 'approved' )   ,
(12 , 8 , 'approved' )   ,
(13 , 6 , 'approved' )   ,
(14 , 7 , 'approved' )   ,
(15 , 8 , 'approved' )   ,
(16 , 6 , 'approved' )   ,
(17 , 7 , 'approved' )   ;








