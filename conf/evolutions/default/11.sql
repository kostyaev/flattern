# --- Update house schema, add address table

# --- !Ups

alter table house add photo bigint null;
alter table house add views int not null default 0;
alter table house add date timestamp null;
alter table house add published boolean null;

alter table house alter column address_id drop not null;
alter table house alter column house_type drop not null;
alter table house alter column rent_type drop not null;

# --- !Downs
alter table house drop column photo;
alter table house drop column views;
alter table house drop column date;
alter table house drop column published;

