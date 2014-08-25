# --- Update house schema, add address table

# --- !Ups
alter table house drop column conditions;
alter table house add column amenities int[];
alter table house drop column house_type;
alter table house drop column rent_type;
alter table house add column house_type int;
alter table house add column rent_type int;

alter table address alter column country drop not null;
alter table address alter column city drop not null;

# --- !Downs
alter table house drop column amenities;
alter table house add column conditions public."hstore";
alter table house drop column house_type;
alter table house drop column rent_type;
alter table house add column house_type varchar(150);
alter table house add column rent_type varchar(150);

alter table address alter column country set not null;
alter table address alter column city set not null;