# --- Update house schema, add address table

# --- !Ups
alter table users add wishes varchar(255) null;
alter table users add wsex int null;
alter table users add wage int null;
alter table users add wprice numeric(10,2) null;
alter table users add wcountry varchar(255) null;
alter table users add wdistrict varchar(255) null;

# --- !Downs
alter table users drop wishes;
alter table users drop wsex;
alter table users drop wage;
alter table users drop wprice;
alter table users drop wcountry;
alter table users drop wdistrict;