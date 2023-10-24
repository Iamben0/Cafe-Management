DROP TABLE IF EXISTS bid;
DROP TABLE IF EXISTS work_slot;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS user_profile;


CREATE TABLE user_profile
(
    id           SERIAL       NOT NULL PRIMARY KEY,
    profile_type VARCHAR(255) NOT NULL,
    job_title    VARCHAR(255) NOT NULL UNIQUE,
    active       BOOLEAN      NOT NULL
);

CREATE TABLE user_account
(
    id           SERIAL       NOT NULL PRIMARY KEY,
    username     VARCHAR(255) NOT NULL UNIQUE,
    name         VARCHAR(255) NOT NULL,
    password     VARCHAR(255) NOT NULL,
    email        VARCHAR(255) NOT NULL,
    user_profile INTEGER REFERENCES user_profile (id)
);

CREATE TABLE work_slot
(
    id    SERIAL       NOT NULL PRIMARY KEY,
    shift VARCHAR(255) NOT NULL CHECK ( shift IN ('morning', 'afternoon') ),
    date  DATE         NOT NULL
);

)
CREATE TABLE bid
(
    id           SERIAL       NOT NULL PRIMARY KEY,
    work_slot_id INTEGER REFERENCES work_slot (id),
    staff_id     INTEGER REFERENCES user_account (id),
    role         VARCHAR(255) NOT NULL CHECK (role IN ('chef', 'waiter', 'cashier')),
    approved     BOOLEAN      NOT NULL
);

-- Timestamptz: 2004-10-19 10:23:54 (format for time and date)
--
-- Java: OffsetDateTime(2004, 10, 19, 10, 23, 54, 0, ZoneOffset.UTC)
-- OffsetDateTime: 2004-10-19T10:23:54Z (format for time and date)
