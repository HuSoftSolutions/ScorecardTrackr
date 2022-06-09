drop database if exists scoretrackr; 
create database scoretrackr; 
use scoretrackr; 

create table user ( 
    user_id varchar(36) primary key unique,
    email varchar(50) not null unique,
    password_hash varchar(2048) not null,
    first_name varchar(100) null,
    last_name varchar(100) null,
    handicap int null
);

create table `role` (
    role_id varchar(36) primary key unique,
    `name` varchar(50) not null unique
);

create table user_role (
    user_id varchar(36) not null,
    role_id varchar(36) not null,
    constraint pk_user_role
		primary key (user_id, role_id),
    constraint fk_user_role_user_id
        foreign key (user_id)
		references `user`(user_id),
	constraint fk_user_role_role_id
		foreign key (role_id)
		references `role`(role_id)
);

create table course (
	course_id varchar(36) primary key unique, 
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

create table `round` (
	round_id varchar(36) primary key unique
);

create table nine (
	nine_id varchar(36) primary key unique,
    `name` varchar(100) not null,
	course_id varchar(36) not null,
    constraint course_id
		foreign key (course_id)
        references course(course_id)
);

create table hole (
	hole_id varchar(36) primary key unique, 
    `number` int not null,
    handicap int not null,
    par int not null,
    yards int not null,
	nine_id varchar(36) not null,
    constraint nine_id
		foreign key (nine_id)
        references nine(nine_id)
);

/* MATCH OR STROKE */
create table scoring_type (
	scoring_type_id varchar(36) primary key unique, 
    `name` varchar(50) not null
);

/* INDIVIDUAL OR TEAMS */
create table match_format (
	match_format_id varchar(36) primary key unique, 
    `name` varchar(50) not null
);

/* NASSAU, BEST BALL, OR SKINS */
create table match_type (
	match_type_id varchar(36) primary key unique, 
    `name` varchar(50) not null
);

create table user_round (
    user_id varchar(36) not null,
    round_id varchar(36) not null,
    constraint pk_user_round
		primary key (user_id, round_id),
    constraint fk_user_round_user_id
        foreign key (user_id)
		references `user`(user_id),
	constraint fk_user_round_round_id
		foreign key (round_id)
		references `round`(round_id)
);

create table nine_round (
    nine_id varchar(36) not null,
    round_id varchar(36) not null,
    constraint pk_nine_round
		primary key (nine_id, round_id),
    constraint fk_nine_round_nine_id
        foreign key (nine_id)
		references nine(nine_id),
	constraint fk_nine_round_round_id
		foreign key (round_id)
		references `round`(round_id)
);

create table `match` (
	match_id varchar(36) primary key unique,
    round_id varchar(36) not null,
    scoring_type_id varchar(36) not null,
    match_format_id varchar(36) not null,
    match_type_id varchar(36) not null,
	constraint round_id
		foreign key (round_id)
        references `round`(round_id),
	constraint scoring_type_id
		foreign key (scoring_type_id)
        references scoring_type(scoring_type_id),
	constraint match_format_id
		foreign key (match_format_id)
        references match_format(match_format_id),
	constraint match_type_id
		foreign key (match_type_id)
        references match_type(match_type_id)
);

create table team (
	team_id varchar(36) primary key unique,
    match_id varchar(36) not null,
	constraint match_id
		foreign key (match_id)
        references `match`(match_id)
);

create table user_team (
    user_id varchar(36) not null,
    team_id varchar(36) not null,
    constraint pk_user_team
		primary key (user_id, team_id),
    constraint fk_user_team_user_id
        foreign key (user_id)
		references `user`(user_id),
	constraint fk_user_team_team_id
		foreign key (team_id)
		references team(team_id)
);

create table score (
	score_id varchar(36) primary key unique,
    score int not null,
	score_round_id varchar(36) not null,
    user_id varchar(36) not null,
    hole_id varchar(36) not null,
    constraint score_round_id
		foreign key (score_round_id)
        references `round`(round_id),
	constraint user_id
		foreign key (user_id)
        references `user`(user_id),
	constraint hole_id
		foreign key (hole_id)
        references hole(hole_id)
);
