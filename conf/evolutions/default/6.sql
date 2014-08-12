# --- First database schema

# --- !Ups
alter table house add country_id int not null;
alter table house add conditions public."hstore" null;
alter table house add house_type int not null;
alter table house add rent_type int not null;
alter table house add title text null;
alter table house add num_of_rooms int null;
alter table house add apt_number int null;

alter table house add constraint fk_house_country
	foreign key (country_id) references country (id);

# --- !Downs
alter table house drop country_id;
alter table house drop conditions;
alter table house drop house_type;
alter table house drop rent_type;
alter table house drop title;
alter table house drop num_of_rooms;
alter table house drop apt_number;





