# --- First database schema

# --- !Ups
create sequence landing_email_id_seq;

create table landing_email
(
    id bigint default nextval('landing_email_id_seq') not null,
    email varchar(255) not null,
    ip varchar(255) not null
);

alter table landing_email add constraint pklanding_email
	primary key (id);

# --- !Downs
drop table landing_email;

drop sequence landing_email_id_seq;




