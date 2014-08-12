# --- Update house schema, add address table

# --- !Ups

alter table house drop column if exists house_type;
alter table house drop column if exists rent_type;

alter table address drop column if exists country_id;
alter table address drop column if exists city_id;

alter table house add house_type varchar(150) not null;
alter table house add rent_type varchar(150) not null;

alter table address add country varchar(150) not null;
alter table address add city varchar(150) not null;

alter table house alter column area drop not null;

# --- !Downs

alter table house drop column if exists house_type;
alter table house drop column if exists rent_type;

alter table house add house_type int not null;
alter table house add rent_type int not null;

alter table address drop column if exists country;
alter table address drop column if exists city;

alter table address add country_id int not null;
alter table address add city_id int not null;

alter table address add constraint fk_address_country
	foreign key (country_id) references country (id);

alter table address add constraint fk_address_city
	foreign key (city_id) references city (id);

alter table house alter column area set not null;

