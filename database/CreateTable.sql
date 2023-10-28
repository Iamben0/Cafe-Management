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
    active       BOOLEAN      NOT NULL DEFAULT TRUE
);

INSERT INTO work_slot (shift, role, date, active) VALUES
    ('morning'   , 'chef'  ,   '2023-11-01' , TRUE) ,
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
    ('morning'   , 'cashier' , '2023-11-03' , TRUE) ,
    ('afternoon' , 'chef'    , '2023-11-03' , TRUE) ,
    ('afternoon' , 'waiter'  , '2023-11-03' , TRUE) ;


-- SELECT * FROM work_slot WHERE date = '' AND shift = 'morning';
-- ^if exactly three rows of data and each row is uniquely one 'chef', 'waiter', and 'cashier', then work_slot is fully filled

-- make sure staff_id and work_slot_id role matches
CREATE TABLE bid
(
    id           SERIAL PRIMARY KEY,
    work_slot_id INTEGER REFERENCES work_slot (id) NOT NULL UNIQUE,
    staff_id     INTEGER REFERENCES user_account (id),
    approved     BOOLEAN NOT NULL
);

--chef 6, cashier 7, waiter 8
-- IF staff_id is NULL, then it is a 'un-assign' role, therefore approved is FALSE
INSERT INTO bid (work_slot_id, staff_id, approved) VALUES
(1  ,    6 , TRUE)     ,
(2  ,    7 , TRUE)     ,
(3  ,    8 , TRUE)     ,
(4  ,    6 , TRUE)     ,
(5  ,    7 , TRUE)     ,
(6  ,    8 , TRUE)     ,
(7  ,    6 , TRUE)     ,
(8  ,    7 , TRUE)     ,
(9  ,    8 , TRUE)     ,
(10 ,    6 , TRUE)     ,
(11 ,    7 , TRUE)     ,
(12 ,    8 , TRUE)     ,
(13 ,    6 , TRUE)     ,
(14 ,    7 , TRUE)     ,
(15 ,    8 , TRUE)     ,
(16 ,    6 , TRUE)     ,
(17 ,    7 , TRUE)     ,
(18 , NULL , FALSE)    ,
(19 , NULL , FALSE)    ,
(20 , NULL , FALSE)  ;




