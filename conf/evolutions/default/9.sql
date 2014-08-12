# --- Update house schema, add address table

# --- !Ups
create sequence users_id;

alter table house drop constraint fk_house_users;
alter table seat drop constraint fk_seat_users;

drop table client;
drop table renter;

alter table users RENAME to account;
alter table account drop column birthday;
alter table account drop column timezone;
alter table account drop column sex;
alter table account drop column login;
alter table account drop column middlename;

alter table house RENAME user_id to account_id;
alter table seat RENAME user_id to account_id;

create table users
(
  id BIGINT DEFAULT nextval('users_id'),
	account_id BIGINT not null,
	privacy public."hstore" null,
	birthday timestamp null,
	timezone integer null,
	sex integer null
);

alter table house add constraint fk_house_account
	foreign key (account_id) references account (id)
	on update no action on delete no action;

alter table seat add constraint fk_seat_account
	foreign key (account_id) references account (id)
	on update cascade on delete cascade;

alter table users add constraint fk_user_account
	foreign key (account_id) references account (id)
	on update cascade on delete cascade;


# --- !Downs

alter table users drop constraint fk_user_account;
alter table seat drop constraint fk_seat_account;
alter table house drop constraint fk_house_account;

drop table users;

alter table seat RENAME account_id to user_id;
alter table house RENAME account_id to user_id;

alter table account RENAME to users;

alter table users add middlename varchar(255) null;
alter table users add login varchar(255) null;
alter table users add sex BIGINT null;
alter table users add timezone BIGINT null;
alter table users add birthday timestamp null;

create table renter
(
	user_id BIGINT not null,
	requirements TEXT null
);

alter table renter add constraint pkrenter
	primary key (user_id);
	
create table client
(
	user_id BIGINT not null,
	about TEXT null
);

alter table client add constraint pkclient
	primary key (user_id);

alter table seat add constraint fk_seat_users
  foreign key (user_id) references users (id)
  on update cascade on delete cascade;
	
alter table renter add constraint fk_renter_users
	foreign key (user_id) references users (id)
	on update cascade on delete cascade;

alter table house add constraint fk_house_users
	foreign key (user_id) references users (id)
	on update no action on delete no action;
	
alter table client add constraint fk_client_users
	foreign key (user_id) references users (id)
	on update cascade on delete cascade;

drop sequence users_id;
