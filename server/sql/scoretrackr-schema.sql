drop database if exists scoretrackr; 
create database scoretrackr; 
use scoretrackr; 

create table user ( 
    user_id int primary key auto_increment,
    email varchar(50) not null unique,
    password_hash varchar(2048) not null,
    first_name varchar(100) null,
    last_name varchar(100) null,
    handicap int null
);

create table `role` (
    role_id int primary key auto_increment,
    `name` varchar(50) not null unique
);

create table user_role (
    user_id int not null,
    role_id int not null,
    constraint pk_user_role
		primary key (user_id, role_id),
    constraint fk_user_role_user_id
        foreign key (user_id)
		references user(user_id),
	constraint fk_user_role_role_id
		foreign key (role_id)
		references `role`(role_id)
);

create table course (
	course_id int primary key auto_increment, 
    `name` varchar(100) not null, 
    address varchar(100) not null,
    city varchar(100) not null,
    state varchar(2) not null,
    zip_code int not null,
    phone_number varchar(50) not null,
    email varchar(50) not null unique,
    rating float not null,
	slope float not null
);

create table nine (
	nine_id int primary key auto_increment,
    `name` varchar(100) not null,
	course_id int not null,
    constraint course_id
		foreign key (course_id)
        references course(course_id)
);

create table hole (
	hole_id int primary key auto_increment, 
    `number` int not null,
    handicap int not null,
    par int not null,
    yards int not null,
	nine_id int not null,
    constraint nine_id
		foreign key (nine_id)
        references nine(nine_id)
);

create table round_type (
	round_type_id int primary key auto_increment, 
    `name` varchar(50) not null
);

create table `round` (
	round_id int primary key auto_increment,
	round_type_id int not null,
    constraint round_type_id
		foreign key (round_type_id)
        references round_type(round_type_id)
);

create table score (
	score_id int primary key auto_increment,
    score int not null,
	round_id int not null,
    user_id int not null,
    hole_id int not null,
    constraint round_id
		foreign key (round_id)
        references `round`(round_id),
	constraint user_id
		foreign key (user_id)
        references `user`(user_id),
	constraint hole_id
		foreign key (hole_id)
        references hole(hole_id)
);
