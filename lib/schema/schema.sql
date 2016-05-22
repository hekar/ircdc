drop schema public cascade;
create schema public;

create table session (
  id bigserial primary key,
  json jsonb not null
);

create table channel (
  id bigserial primary key,
  json jsonb not null
);

create table log (
  id bigserial primary key,
  t timestamp not null,
  owner varchar(128) not null,
  message text not null
);

create table user (
  id bigserial primary key,
  username varchar(196) not null,
  last timestamp not null,
  owner varchar(128) not null,
  message text not null
);
