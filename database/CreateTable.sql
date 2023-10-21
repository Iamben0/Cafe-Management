DROP TABLE IF EXISTS work_slots;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS user_profile;


CREATE TABLE user_profile (
    id           SERIAL NOT NULL PRIMARY KEY,
    profile_type VARCHAR (255) NOT NULL,
    job_title    VARCHAR (255) NOT NULL UNIQUE
);

INSERT INTO user_profile (profile_type, job_title) VALUES ('System Admin', 'Junior System Admin');
INSERT INTO user_profile (profile_type, job_title) VALUES ('System Admin', 'Senior System Admin');
INSERT INTO user_profile (profile_type, job_title) VALUES ('Owner', 'Owner');
INSERT INTO user_profile (profile_type, job_title) VALUES ('Manager', 'Junior Manager');
INSERT INTO user_profile (profile_type, job_title) VALUES ('Manager', 'Senior Manager');
INSERT INTO user_profile (profile_type, job_title) VALUES ('Staff', 'Chef');
INSERT INTO user_profile (profile_type, job_title) VALUES ('Staff', 'Waiter');
INSERT INTO user_profile (profile_type, job_title) VALUES ('Staff', 'Cashier');

CREATE TABLE user_account(
    id           SERIAL NOT NULL PRIMARY KEY,
    username     VARCHAR(50) NOT NULL,
    name         VARCHAR(50) NOT NULL,
    password     VARCHAR(50) NOT NULL,
    up           INTEGER REFERENCES user_profile(id),
    time_created Timestamptz DEFAULT NOW()
);

CREATE TABLE work_slots (
    id          SERIAL NOT NULL PRIMARY KEY,
    start_time  Timestamptz NOT NULL,
    end_time    Timestamptz NOT NULL,
    user_id     INTEGER REFERENCES user_account(id)
);

-- Timestamptz: 2004-10-19 10:23:54 (format for time and date)

-- Java: OffsetDateTime(2004, 10, 19, 10, 23, 54, 0, ZoneOffset.UTC)
-- OffsetDateTime: 2004-10-19T10:23:54Z (format for time and date)