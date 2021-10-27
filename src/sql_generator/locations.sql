drop table if exists locations cascade;

create table locations_table
(
	id serial primary key,
	title varchar,
	message varchar,
	image varchar
);


