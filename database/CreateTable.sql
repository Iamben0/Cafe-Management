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

-- user_profile TABLE
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
-- idea but very expensive for SQL:
-- the first time 'staff' book, let them book anything.
-- second/subsequent time, query their first/any booking, that is their cafe_role.

/* FIRST BOOKING */
-- List<Bid> bids = bidRepository.findByStaffId('userProfile.getId()');
-- if (bids.empty()) {
--     System.out.println("Wow first day work issit");
--     Assign role to staff, then list out the workslots based on the role
--     List<WorkSlot> staffRole = workSlotRepository.findByRole('chef');
--     shiftsAvailable
-- } else {/*Subsequent Booking */}
--

/* SUBSEQUENT BOOKINGS */
-- choose one:
-- List<Bid> bids = bidRepository.findByStaffId('userProfile.getId()');  // all the previous time they bid
-- OR
-- Bid bid = bidRepository.findByStaffId('userProfile.getId()') // .getFirst() smth like this. (to chose one bid)
-- OR
-- Bid bid = bidRepository.findByStaffId('userProfile.getId()') // .get(0) smth like this. (to chose one bid?)

-- WorkSlot workSlot = bid.getWorkSlot()
-- String role = workSlot.getRole()
-- List<WorkSlot> shiftsAvailable = workSlotRepository.findByRole(role);

-- user_account TABLE
INSERT INTO user_account (username, name, password, email, active, role, user_profile) VALUES
       ('admin1'   , 'Robert Downey'      , 'password1' , 'ironman@gmail.com'     , TRUE , 'non-staff' , 1)  ,
       ('admin2'   , 'Chris Evans'        , 'password2' , 'captamerica@gmail.com' , TRUE , 'non-staff' , 2)  ,
       ('owner'    , 'Chris Hemsworth'    , 'password3' , 'thor@gmail.com'        , TRUE , 'non-staff' , 3)  ,
       ('manager1' , 'Scarlett Johansson' , 'password4' , 'blackwidow@gmail.com'  , TRUE , 'non-staff' , 4)  ,
       ('manager2' , 'Jeremy Renner'      , 'password5' , 'hawkeye@gmail.com'     , TRUE , 'non-staff' , 5)  ,
       ('staff1'   , 'Mark Ruffalo'       , 'password6' , 'hulk@gmail.com'        , TRUE , 'chef'      , 6)  ,
       ('staff2'   , 'Samuel L. Jackson'  , 'password7' , 'nightfury@gmail.com'   , TRUE , 'cashier'   , 7)  ,
       ('staff3'   , 'Peter Parker'       , 'password8' , 'spiderman@gmail.com'   , TRUE , 'waiter'    , 7)  ,
       ('staff4'   , 'Peter'              , 'password6' , 'hulk@gmail.com'        , TRUE , 'un-assign' , 6)  ,
       ('staff5'   , 'Mary'               , 'password7' , 'nightfury@gmail.com'   , TRUE , 'un-assign' , 7)  ,
       ('staff6'   , 'Tom'                , 'password8' , 'spiderman@gmail.com'   , TRUE , 'un-assign' , 7);



CREATE TABLE work_slot
(
    id           SERIAL PRIMARY KEY,
    shift        VARCHAR(255) NOT NULL CHECK ( shift IN ('morning', 'afternoon') ),
    role         VARCHAR(255) NOT NULL CHECK (role IN ('chef', 'waiter', 'cashier')),
    date         DATE         NOT NULL,
    active       BOOLEAN      NOT NULL DEFAULT TRUE
);

INSERT INTO work_slot (shift, role, date, active) VALUES
    ('morning'   , 'waiter'  , '2023-11-01' , TRUE) ,
    ('morning'   , 'cashier' , '2023-11-01' , TRUE) ,
    ('afternoon' , 'chef'    , '2023-11-01' , TRUE) ,
    ('afternoon' , 'waiter'  , '2023-11-01' , TRUE) ,
    ('afternoon' , 'cashier' , '2023-11-01' , TRUE) ,
    ('morning'   , 'chef'    , '2023-11-02' , TRUE) ,
    ('morning'   , 'waiter'  , '2023-11-02' , TRUE) ,
    ('morning'   , 'cashier' , '2023-11-02' , TRUE) ,
    ('afternoon' , 'chef'    , '2023-11-02' , TRUE) ,
    ('afternoon' , 'waiter'  , '2023-11-02' , TRUE) ,
    ('afternoon' , 'cashier' , '2023-11-02' , TRUE) ,
    ('morning'   , 'chef'    , '2023-11-03' , TRUE) ,
    ('morning'   , 'waiter'  , '2023-11-03' , TRUE) ,
    ('morning'   , 'cashier' , '2023-11-03' , TRUE) ,
    ('afternoon' , 'chef'    , '2023-11-03' , TRUE) ,
    ('afternoon' , 'waiter'  , '2023-11-03' , TRUE) ,
    ('afternoon' , 'cashier' , '2023-11-03' , TRUE) ,
    ('afternoon' , 'cashier' , '2023-11-03' , TRUE);




-- SELECT * FROM work_slot WHERE date = '' AND shift = 'morning';
-- ^if exactly three rows of data and each row is uniquely one 'chef', 'waiter', and 'cashier', then work_slot is fully filled

CREATE TABLE bid
(
    id           SERIAL PRIMARY KEY,
    work_slot_id INTEGER REFERENCES work_slot (id),
    staff_id     INTEGER REFERENCES user_account (id),
    approved     BOOLEAN NOT NULL
);

INSERT INTO bid (work_slot_id, staff_id, approved) VALUES
(1  ,  6 , TRUE)  ,
(2  ,  7 , TRUE)  ,
(3  ,  8 , TRUE)  ,
(4  ,  9 , TRUE)  ,
(5  , 10 , TRUE)  ,
(6  , 11 , TRUE)  ;
-- (7  , 12 , TRUE)  ,
-- (8  , 13 , TRUE)  ,
-- (9  , 14 , TRUE)  ,
-- (10 , 15 , TRUE)  ,
-- (11 , 16 , TRUE)  ,
-- (12 , 17 , TRUE)  ,
-- (13 , 18 , TRUE)  ,
-- (14 , 19 , TRUE)  ,
-- (15 , 20 , TRUE)  ,
-- (16 , 21 , TRUE)  ,
-- (17 , 22 , TRUE)  ,
-- (18 , 23 , TRUE)  ,
-- (19 , 24 , TRUE)  ,
-- (20 , 25 , TRUE)  ,
-- (21 , 26 , TRUE)  ,
-- (22 , 27 , TRUE)  ,
-- (23 , 28 , TRUE)  ,
-- (24 , 29 , TRUE)  ,
-- (25 , 30 , TRUE)  ,
-- (26 , 31 , TRUE)  ,
-- (27 , 32 , TRUE)  ,
-- (28 , 33 , TRUE)  ,
-- (29 , 34 , TRUE)  ,
-- (30 , 35 , TRUE)  ,
-- (31 , 36 , TRUE)  ,
-- (32 , 37 , TRUE)  ,
-- (33 , 38 , TRUE)  ,
-- (34 , 39 , TRUE)  ,
-- (35 , 40 , TRUE)  ,
-- (36 , 41 , TRUE)  ,
-- (37 , 42 , TRUE)  ,
-- (38 , 43 , TRUE)  ,
-- (39 , 44 , TRUE)  ,
-- (40 , 45 , TRUE)  ,
-- (41 , 46 , TRUE)  ,
-- (42 , 47 , TRUE)  ,
-- (43 , 48 , TRUE)  ,
-- (44 , 49 , TRUE)  ,
-- (45 , 50 , TRUE)  ,
-- (46 , 51 , TRUE)  ,
-- (47 , 52 , TRUE)  ,
-- (48 , 53 , TRUE)  ,
-- (49 , 54 , TRUE)  ,
-- (50 , 55 , TRUE)  ,
-- (51 , 56 , TRUE)  ,
-- (52 , 57 , TRUE)  ,
-- (53 , 58 , TRUE)  ,
-- (54 , 59 , TRUE)  ,
-- (55 , 60 , TRUE)  ,
-- (56 , 61 , TRUE)  ,
-- (57 , 62 , TRUE)  ,
-- (58 , 63 , TRUE)  ,
-- (59 , 64 , TRUE)  ,
-- (60 , 65 , TRUE)  ,
-- (61 , 66 , TRUE)  ,
-- (62 , 67 , TRUE)  ,
-- (63 , 68 , TRUE)  ,
-- (64 , 69 , TRUE)  ,
-- (65 , 70 , TRUE)  ,
-- (66 , 71 , TRUE)  ,
-- (67 , 72 , TRUE)  ,
-- (68 , 73 , TRUE)  ,
-- (69 , 74 , TRUE)  ,
-- (70 , 75 , TRUE)  ,
-- (71 , 76 , TRUE)  ,
-- (72 , 77 , TRUE)  ,
-- (73 , 78 , TRUE)  ,
-- (74 , 79 , TRUE);
