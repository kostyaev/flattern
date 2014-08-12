# --- Update house schema, add address table

# --- !Ups
alter table house drop column if exists city_id;
alter table house drop column if exists country_id;
alter table house drop column if exists street;
alter table house drop column if exists building;
alter table house drop column if exists housing;
alter table house drop column if exists floor;
alter table house drop column if exists apt_number;

create sequence address_id_seq;

create table address
(
  id bigint DEFAULT nextval('address_id_seq'),
  country_id int not null,
  city_id int not null,
  street varchar(150) null,
  building varchar(10) null,
  housing varchar(10) null,
  floor int null,
  apt int null
);

alter table house add address_id int not null;
alter table house add all_slots int null;
alter table house add free_slots int null;
alter table house add busy_slots int null;

alter table address add constraint pkaddress
	primary key (id);

alter table house add constraint fk_house_address
	foreign key (address_id) references address (id);

alter table address add constraint fk_address_country
	foreign key (country_id) references country (id);

alter table address add constraint fk_address_city
	foreign key (city_id) references city (id);

# --- !Downs
alter table house drop column if exists all_slots;
alter table house drop column if exists free_slots;
alter table house drop column if exists busy_slots;
alter table house drop column if exists address_id;
drop table address;
drop sequence address_id_seq;

