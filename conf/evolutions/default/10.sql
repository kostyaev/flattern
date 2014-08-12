# --- Update house schema, add address table

# --- !Ups
alter table house_photo drop column if exists country;
alter table house_photo add title varchar(255) null;
alter table house_photo add description text null;

# --- !Downs
alter table house_photo drop column if exists title;
alter table house_photo drop column if exists description;