# --- Update house schema, add address table

-- Database evolution that creates most of the tables used above
# --- !Ups
drop table if exists oauth1_credential_sets;
drop table if exists oauth2_credential_sets;
drop table if exists password_credential_sets;

alter table account add email_address varchar null;
alter table account drop column if exists email;
alter table account drop column if exists token;
alter table account drop column if exists secret;
alter table account drop column if exists access_token;
alter table account drop column if exists token_type;
alter table account drop column if exists expires_in;
alter table account drop column if exists refresh_token;
alter table account drop column if exists hasher;
alter table account drop column if exists password;
alter table account drop column if exists salt;

create sequence account_id_seq;
alter sequence account_id_seq owned by account.id;
drop sequence users_id;

create index account_identity_id on account (user_id, provider_id);

-- oauth1_credential_sets
create TABLE oauth1_credential_sets(
  id                  serial primary key,
  account_id          bigint not null,
  token               varchar not null,
  secret              varchar not null,
  foreign key (account_id) references account(id)
);

create index oauth1_credential_sets_account_id
  on oauth1_credential_sets(account_id);

-- oauth2_credential_sets
create table oauth2_credential_sets(
  id                  serial primary key,
  account_id          bigint not null,
  access_token        varchar not null,
  token_type          varchar,
  expires_in          integer,
  refresh_token       varchar,
  foreign key (account_id) references account(id)
);

create index oauth2_credential_sets_account_id
  on oauth2_credential_sets(account_id);

-- password credential sets
create TABLE password_credential_sets(
  id                  serial primary key,
  account_id          bigint not null,
  hasher              varchar not null,
  password            varchar not null,
  salt                varchar,
  foreign key (account_id) references account(id)
);

create index password_credential_sets_account_id
  on password_credential_sets(account_id);

# --- !Downs
drop table if exists oauth1_credential_sets;
drop table if exists oauth2_credential_sets;
drop table if exists password_credential_sets;

alter table account drop column if exists email_address;
alter table account add email varchar(255);
alter table account add  avatar_url varchar(255);
alter table account add  auth_method varchar(255) not null;
alter table account add  token varchar(255);
alter table account add  secret varchar(255);
alter table account add  access_token varchar(255);
alter table account add  token_type varchar(255);
alter table account add  expires_in integer;
alter table account add  refresh_token varchar(255);
alter table account add  hasher varchar(255);
alter table account add  password varchar(255);
alter table account add  salt varchar(255);

create sequence users_id;
alter sequence users_id owned by account.id;
drop sequence account_id_seq;