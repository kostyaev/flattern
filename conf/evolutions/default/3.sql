# --- First database schema

# --- !Ups
CREATE SEQUENCE room_id_seq INCREMENT BY 1;
CREATE SEQUENCE house_id_seq INCREMENT BY 1;
CREATE SEQUENCE house_photo_id_seq INCREMENT BY 1;
CREATE SEQUENCE room_photo_id_seq INCREMENT BY 1;
CREATE SEQUENCE seat_id_seq INCREMENT BY 1;
CREATE SEQUENCE "city_id_seq" INCREMENT BY 1;
CREATE SEQUENCE "country_id_seq" INCREMENT BY 1;
CREATE SEQUENCE "state_id_seq" INCREMENT BY 1;


CREATE TABLE country
(
	id INTEGER DEFAULT nextval('"country_id_seq"'::regclass) NOT NULL,
	code VARCHAR(150) NULL,
	names public."hstore" NULL
) WITHOUT OIDS;

/* Add Primary Key */
ALTER TABLE country ADD CONSTRAINT pkcountry
	PRIMARY KEY (id);


CREATE TABLE state
(
	id INTEGER DEFAULT nextval('"state_id_seq"'::regclass) NOT NULL,
	code VARCHAR(150) NULL,
	country_id INTEGER NULL,
	names public."hstore" NULL
) WITHOUT OIDS;

/* Add Primary Key */
ALTER TABLE state ADD CONSTRAINT pkstate
	PRIMARY KEY (id);


CREATE TABLE city
(
	id INTEGER DEFAULT nextval('"city_id_seq"'::regclass) NOT NULL,
	code VARCHAR(150) NULL,
	state_id INTEGER NULL,
	names public."hstore" NULL
) WITHOUT OIDS;

/* Add Primary Key */
ALTER TABLE city ADD CONSTRAINT pkcity
	PRIMARY KEY (id);


CREATE TABLE client
(
	user_id BIGINT NOT NULL,
	about TEXT NULL
);

/* Add Primary Key */
ALTER TABLE client ADD CONSTRAINT pkclient
	PRIMARY KEY (user_id);



CREATE TABLE renter
(
	user_id BIGINT NOT NULL,
	requirements TEXT NULL
);

/* Add Primary Key */
ALTER TABLE renter ADD CONSTRAINT pkrenter
	PRIMARY KEY (user_id);


CREATE TABLE house
(
	id BIGINT DEFAULT nextval('house_id_seq'::regclass) NOT NULL,
	city_id INTEGER NOT NULL,
	user_id BIGINT NOT NULL,
	street VARCHAR(150) NOT NULL,
	building VARCHAR(10) NOT NULL,
	floor INTEGER NULL,
	housing VARCHAR(10) NULL,
	description TEXT NULL,
	area NUMERIC(10, 2) NOT NULL,
	price BIGINT NULL
);

/* Add Primary Key */
ALTER TABLE house ADD CONSTRAINT pkhouse
	PRIMARY KEY (id);


CREATE TABLE house_photo
(
	id BIGINT DEFAULT nextval('house_photo_id_seq'::regclass) NOT NULL,
	house_id BIGINT NOT NULL
);

/* Add Primary Key */
ALTER TABLE house_photo ADD CONSTRAINT pkhouse_photo
	PRIMARY KEY (id);


CREATE TABLE room
(
	id BIGINT DEFAULT nextval('room_id_seq'::regclass) NOT NULL,
	seats INTEGER NULL,
	house_id INTEGER NOT NULL,
	area NUMERIC(10, 2) NOT NULL,
	price BIGINT NULL
);

/* Add Primary Key */
ALTER TABLE room ADD CONSTRAINT pkroom
	PRIMARY KEY (id);



CREATE TABLE room_photo
(
	id BIGINT DEFAULT nextval('room_photo_id_seq'::regclass) NOT NULL,
	room_id BIGINT NOT NULL
);

/* Add Primary Key */
ALTER TABLE room_photo ADD CONSTRAINT pkroom_photo
	PRIMARY KEY (id);


CREATE TABLE seat
(
	id INTEGER DEFAULT nextval('seat_id_seq'::regclass) NOT NULL,
	room_id BIGINT NOT NULL,
	user_id BIGINT NOT NULL
);

/* Add Primary Key */
ALTER TABLE seat ADD CONSTRAINT pkseat
	PRIMARY KEY (id);



/************ Add Foreign Keys ***************/

/* Add Foreign Key: fk_city_state */
ALTER TABLE city ADD CONSTRAINT fk_city_state
	FOREIGN KEY (state_id) REFERENCES state (id)
	ON UPDATE CASCADE ON DELETE CASCADE;

/* Add Foreign Key: fk_client_users */
ALTER TABLE client ADD CONSTRAINT fk_client_users
	FOREIGN KEY (user_id) REFERENCES users (id)
	ON UPDATE CASCADE ON DELETE CASCADE;

/* Add Foreign Key: fk_house_city */
ALTER TABLE house ADD CONSTRAINT fk_house_city
	FOREIGN KEY (city_id) REFERENCES city (id)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_house_users */
ALTER TABLE house ADD CONSTRAINT fk_house_users
	FOREIGN KEY (user_id) REFERENCES users (id)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_photo_house */
ALTER TABLE house_photo ADD CONSTRAINT fk_photo_house
	FOREIGN KEY (house_id) REFERENCES house (id)
	ON UPDATE CASCADE ON DELETE CASCADE;

/* Add Foreign Key: fk_renter_users */
ALTER TABLE renter ADD CONSTRAINT fk_renter_users
	FOREIGN KEY (user_id) REFERENCES users (id)
	ON UPDATE CASCADE ON DELETE CASCADE;

/* Add Foreign Key: fk_room_house */
ALTER TABLE room ADD CONSTRAINT fk_room_house
	FOREIGN KEY (house_id) REFERENCES house (id)
	ON UPDATE CASCADE ON DELETE CASCADE;

/* Add Foreign Key: fk_photo_room */
ALTER TABLE room_photo ADD CONSTRAINT fk_photo_room
	FOREIGN KEY (room_id) REFERENCES room (id)
	ON UPDATE CASCADE ON DELETE CASCADE;

/* Add Foreign Key: fk_seat_room */
ALTER TABLE seat ADD CONSTRAINT fk_seat_room
	FOREIGN KEY (room_id) REFERENCES room (id)
	ON UPDATE CASCADE ON DELETE CASCADE;

/* Add Foreign Key: fk_seat_users */
ALTER TABLE seat ADD CONSTRAINT fk_seat_users
	FOREIGN KEY (user_id) REFERENCES users (id)
	ON UPDATE CASCADE ON DELETE CASCADE;

/* Add Foreign Key: fk_state_country */
ALTER TABLE state ADD CONSTRAINT fk_state_country
	FOREIGN KEY (country_id) REFERENCES country (id)
	ON UPDATE CASCADE ON DELETE CASCADE;



# --- !Downs
drop table city;
drop table country;
drop table state;
drop table seat;
drop table room;
drop table room_photo;
drop table house;
drop table house_photo;
drop table client;
drop table renter;

drop sequence house_id_seq;
drop sequence house_photo_id_seq;
drop sequence room_id_seq;
drop sequence room_photo_id_seq;
drop sequence seat_id_seq;
drop sequence city_id_seq;
drop sequence country_id_seq;
drop sequence state_id_seq;




