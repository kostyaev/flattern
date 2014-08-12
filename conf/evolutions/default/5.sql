# --- First database schema

# --- !Ups
alter table users add middlename varchar(255) null;
alter table users add birthday timestamp null;
alter table users add timezone BIGINT null;
alter table users add sex BIGINT null;
alter table users add login varchar(255) null;

# --- !Downs
alter table users drop middlename;
alter table users drop birthday;
alter table users drop timezone;
alter table users drop sex;
alter table users drop login;




