create table "Users"
(
	iduser serial not null
		constraint "Users_pkey"
			primary key,
	iddocument varchar(255) not null
		constraint "Users_iddocument_key"
			unique,
	name varchar(255) not null,
	lastname varchar(255) not null,
	telephone varchar(255) not null,
	image text,
	email varchar(255) not null
		constraint "Users_email_key"
			unique,
	password varchar(255) not null,
	token text,
	nickname varchar(255) not null
		constraint "Users_nickname_key"
			unique,
	"createdAt" timestamp with time zone not null,
	"updatedAt" timestamp with time zone not null
);

alter table "Users" owner to goyrkqdlmhyutc;


