drop table if exists locations_table cascade;

create table locations_table
(
	id serial primary key,
	title varchar(255),
	message varchar(255),
	image bytea
);


