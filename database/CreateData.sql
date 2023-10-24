
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

