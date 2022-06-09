use scoretrackr;

set foreign_key_checks = 0;
truncate table `user`;
truncate table `role`;
truncate table user_role;
truncate table course;
truncate table round;
truncate table nine;
truncate table hole;
truncate table scoring_type;
truncate table match_format;
truncate table match_type;
truncate table user_round;
truncate table nine_round;
truncate table `match`;
truncate table team;
truncate table user_team;
truncate table score;
set foreign_key_checks = 1;

insert into `user` (user_id, email, password_hash, first_name, last_name, handicap) values
    ('d5e2d64a-dfb7-11ec-9d64-0242ac120002', 'ransell@gmail.com', '$2a$10$OOzG0kG/hJ/2mHmq6nuPZ.0q71b3mm/sYthN93PgX6Q2XBDUNLu.K', 'Ryan', 'Ansell', 2),
    ('3f194c0c-dfb8-11ec-9d64-0242ac120002', 'chusek@gmail.com', '$2a$10$OOzG0kG/hJ/2mHmq6nuPZ.0q71b3mm/sYthN93PgX6Q2XBDUNLu.K', 'Cody', 'Husek', 4),
    ('43b5fbb6-dfb8-11ec-9d64-0242ac120002', 'chorn@gmail.com', '$2a$10$OOzG0kG/hJ/2mHmq6nuPZ.0q71b3mm/sYthN93PgX6Q2XBDUNLu.K', 'Conrad', 'Horn', 6),
    ('464c9c90-dfb8-11ec-9d64-0242ac120002', 'wsmith@gmail.com', '$2a$10$OOzG0kG/hJ/2mHmq6nuPZ.0q71b3mm/sYthN93PgX6Q2XBDUNLu.K', 'Wes', 'Smith', 8);

insert into `role` (role_id, `name`) values
	('491d338a-dfb8-11ec-9d64-0242ac120002', 'USER'),
    ('4ba02fae-dfb8-11ec-9d64-0242ac120002', 'ADMIN');

insert into user_role (user_id, role_id) values
	('d5e2d64a-dfb7-11ec-9d64-0242ac120002', '4ba02fae-dfb8-11ec-9d64-0242ac120002'),
    ('3f194c0c-dfb8-11ec-9d64-0242ac120002', '4ba02fae-dfb8-11ec-9d64-0242ac120002'),
    ('43b5fbb6-dfb8-11ec-9d64-0242ac120002', '491d338a-dfb8-11ec-9d64-0242ac120002'),
    ('464c9c90-dfb8-11ec-9d64-0242ac120002', '491d338a-dfb8-11ec-9d64-0242ac120002');

insert into course (course_id, `name`, address, city, state, zip_code, phone_number, email, rating, slope) values
	('79c2efca-dfb8-11ec-9d64-0242ac120002', 'Fox Run Golf Club', '129 County Hwy 142A', 'Johnstown', 'NY', 12095, '(518)-762-3717', 'richardscott@pga.com', 70.0, 125.0);
    
insert into `round` (round_id) values
	('d8cdc288-dfb8-11ec-9d64-0242ac120002');
    
insert into nine (nine_id, `name`, course_id) values
	('7cd3871a-dfb8-11ec-9d64-0242ac120002', 'Front 9', '79c2efca-dfb8-11ec-9d64-0242ac120002'),
    ('7fd570ea-dfb8-11ec-9d64-0242ac120002', 'Back 9', '79c2efca-dfb8-11ec-9d64-0242ac120002');
    
insert into hole (hole_id, `number`, handicap, par, yards, nine_id) values
	('83238746-dfb8-11ec-9d64-0242ac120002', 1, 15, 5, 150, '7cd3871a-dfb8-11ec-9d64-0242ac120002'),
    ('8651b474-dfb8-11ec-9d64-0242ac120002', 2, 2, 3, 400, '7cd3871a-dfb8-11ec-9d64-0242ac120002'),
    ('899c07a6-dfb8-11ec-9d64-0242ac120002', 3, 13, 4, 150, '7cd3871a-dfb8-11ec-9d64-0242ac120002'),
    ('8c6cb5b6-dfb8-11ec-9d64-0242ac120002', 4, 4, 3, 150, '7cd3871a-dfb8-11ec-9d64-0242ac120002'),
    ('a35ded44-dfb8-11ec-9d64-0242ac120002', 5, 5, 4, 150, '7cd3871a-dfb8-11ec-9d64-0242ac120002'),
    ('a643671e-dfb8-11ec-9d64-0242ac120002', 6, 6, 3, 150, '7cd3871a-dfb8-11ec-9d64-0242ac120002'),
    ('aa62a300-dfb8-11ec-9d64-0242ac120002', 7, 17, 5, 150, '7cd3871a-dfb8-11ec-9d64-0242ac120002'),
    ('adb5ba06-dfb8-11ec-9d64-0242ac120002', 8, 8, 4, 150, '7cd3871a-dfb8-11ec-9d64-0242ac120002'),
    ('b03c00a0-dfb8-11ec-9d64-0242ac120002', 9, 10, 4, 150, '7cd3871a-dfb8-11ec-9d64-0242ac120002'),
    ('b2b14606-dfb8-11ec-9d64-0242ac120002', 10, 9, 5, 150, '7fd570ea-dfb8-11ec-9d64-0242ac120002'),
    ('b56b3104-dfb8-11ec-9d64-0242ac120002', 11, 11, 3, 150, '7fd570ea-dfb8-11ec-9d64-0242ac120002'),
    ('b93de466-dfb8-11ec-9d64-0242ac120002', 12, 12, 4, 150, '7fd570ea-dfb8-11ec-9d64-0242ac120002'),
    ('bbc822b4-dfb8-11ec-9d64-0242ac120002', 13, 3, 3, 150, '7fd570ea-dfb8-11ec-9d64-0242ac120002'),
    ('c13e3d00-dfb8-11ec-9d64-0242ac120002', 14, 14, 4, 150, '7fd570ea-dfb8-11ec-9d64-0242ac120002'),
    ('c3bac0d0-dfb8-11ec-9d64-0242ac120002', 15, 1, 4, 150, '7fd570ea-dfb8-11ec-9d64-0242ac120002'),
    ('c7aba6f0-dfb8-11ec-9d64-0242ac120002', 16, 16, 5, 150, '7fd570ea-dfb8-11ec-9d64-0242ac120002'),
    ('ca7f0a2a-dfb8-11ec-9d64-0242ac120002', 17, 7, 4, 150, '7fd570ea-dfb8-11ec-9d64-0242ac120002'),
    ('d0e2e59e-dfb8-11ec-9d64-0242ac120002', 18, 18, 4, 150, '7fd570ea-dfb8-11ec-9d64-0242ac120002');

insert into scoring_type (scoring_type_id, `name`) values
	('d341e34e-dfb8-11ec-9d64-0242ac120002', 'STROKE'),
    ('d5ccbb0c-dfb8-11ec-9d64-0242ac120002', 'MATCH');
    
insert into match_format (match_format_id, `name`) values
	('9119dabe-e781-11ec-8fea-0242ac120002', 'INDIVIDUAL'),
    ('950eb22a-e781-11ec-8fea-0242ac120002', 'TEAMS');
    
insert into match_type (match_type_id, `name`) values
	('99e5669a-e781-11ec-8fea-0242ac120002', 'BEST BALL'),
    ('9cca1fcc-e781-11ec-8fea-0242ac120002', 'NASSAU'),
    ('9f47324e-e781-11ec-8fea-0242ac120002', 'SKINS');
    
insert into user_round (user_id, round_id) values
	('d5e2d64a-dfb7-11ec-9d64-0242ac120002', 'd8cdc288-dfb8-11ec-9d64-0242ac120002'),
    ('3f194c0c-dfb8-11ec-9d64-0242ac120002', 'd8cdc288-dfb8-11ec-9d64-0242ac120002'),
    ('43b5fbb6-dfb8-11ec-9d64-0242ac120002', 'd8cdc288-dfb8-11ec-9d64-0242ac120002'),
    ('464c9c90-dfb8-11ec-9d64-0242ac120002', 'd8cdc288-dfb8-11ec-9d64-0242ac120002');
    
insert into nine_round (nine_id, round_id) values
	('7cd3871a-dfb8-11ec-9d64-0242ac120002', 'd8cdc288-dfb8-11ec-9d64-0242ac120002'),
    ('7fd570ea-dfb8-11ec-9d64-0242ac120002', 'd8cdc288-dfb8-11ec-9d64-0242ac120002');
    
insert into `match` (match_id, round_id, scoring_type_id, match_format_id, match_type_id) values
	('5bf7140e-e782-11ec-8fea-0242ac120002', 'd8cdc288-dfb8-11ec-9d64-0242ac120002', 'd341e34e-dfb8-11ec-9d64-0242ac120002', '9119dabe-e781-11ec-8fea-0242ac120002', '99e5669a-e781-11ec-8fea-0242ac120002');
    
insert into team (team_id, match_id) values
	('19767cd6-e783-11ec-8fea-0242ac120002', '5bf7140e-e782-11ec-8fea-0242ac120002'),
	('48c14292-e78c-11ec-8fea-0242ac120002', '5bf7140e-e782-11ec-8fea-0242ac120002'),
	('4c741ee6-e78c-11ec-8fea-0242ac120002', '5bf7140e-e782-11ec-8fea-0242ac120002'),
    ('3118fea0-e78c-11ec-8fea-0242ac120002', '5bf7140e-e782-11ec-8fea-0242ac120002');
    
insert into user_team (user_id, team_id) values
    ('d5e2d64a-dfb7-11ec-9d64-0242ac120002', '19767cd6-e783-11ec-8fea-0242ac120002'),
    ('3f194c0c-dfb8-11ec-9d64-0242ac120002', '48c14292-e78c-11ec-8fea-0242ac120002'),
    ('43b5fbb6-dfb8-11ec-9d64-0242ac120002', '4c741ee6-e78c-11ec-8fea-0242ac120002'),
    ('464c9c90-dfb8-11ec-9d64-0242ac120002', '3118fea0-e78c-11ec-8fea-0242ac120002');

insert into score (score_id, score, score_round_id, user_id, hole_id) values
	('dc19f84e-dfb8-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', 'd5e2d64a-dfb7-11ec-9d64-0242ac120002', '83238746-dfb8-11ec-9d64-0242ac120002'),
    ('df735418-dfb8-11ec-9d64-0242ac120002', 4, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '3f194c0c-dfb8-11ec-9d64-0242ac120002', '83238746-dfb8-11ec-9d64-0242ac120002'),
    ('e1e09292-dfb8-11ec-9d64-0242ac120002', 7, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '43b5fbb6-dfb8-11ec-9d64-0242ac120002', '83238746-dfb8-11ec-9d64-0242ac120002'),
    ('e3f626be-dfb8-11ec-9d64-0242ac120002', 4, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '464c9c90-dfb8-11ec-9d64-0242ac120002', '83238746-dfb8-11ec-9d64-0242ac120002'),
    ('e70dad68-dfb8-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', 'd5e2d64a-dfb7-11ec-9d64-0242ac120002', '8651b474-dfb8-11ec-9d64-0242ac120002'),
    ('ea14fd18-dfb8-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '3f194c0c-dfb8-11ec-9d64-0242ac120002', '8651b474-dfb8-11ec-9d64-0242ac120002'),
    ('ecbf719c-dfb8-11ec-9d64-0242ac120002', 4, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '43b5fbb6-dfb8-11ec-9d64-0242ac120002', '8651b474-dfb8-11ec-9d64-0242ac120002'),
    ('ef18d08c-dfb8-11ec-9d64-0242ac120002', 7, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '464c9c90-dfb8-11ec-9d64-0242ac120002', '8651b474-dfb8-11ec-9d64-0242ac120002'),
    ('f177331e-dfb8-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', 'd5e2d64a-dfb7-11ec-9d64-0242ac120002', '899c07a6-dfb8-11ec-9d64-0242ac120002'),
    ('f3e0cffc-dfb8-11ec-9d64-0242ac120002', 8, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '3f194c0c-dfb8-11ec-9d64-0242ac120002', '899c07a6-dfb8-11ec-9d64-0242ac120002'),
    ('f6034c42-dfb8-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '43b5fbb6-dfb8-11ec-9d64-0242ac120002', '899c07a6-dfb8-11ec-9d64-0242ac120002'),
    ('0cc1774c-dfb9-11ec-9d64-0242ac120002', 6, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '464c9c90-dfb8-11ec-9d64-0242ac120002', '899c07a6-dfb8-11ec-9d64-0242ac120002'),
    ('0f747624-dfb9-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', 'd5e2d64a-dfb7-11ec-9d64-0242ac120002', '8c6cb5b6-dfb8-11ec-9d64-0242ac120002'),
    ('120f5ee4-dfb9-11ec-9d64-0242ac120002', 7, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '3f194c0c-dfb8-11ec-9d64-0242ac120002', '8c6cb5b6-dfb8-11ec-9d64-0242ac120002'),
    ('144919ca-dfb9-11ec-9d64-0242ac120002', 3, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '43b5fbb6-dfb8-11ec-9d64-0242ac120002', '8c6cb5b6-dfb8-11ec-9d64-0242ac120002'),
    ('16e02c1e-dfb9-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '464c9c90-dfb8-11ec-9d64-0242ac120002', '8c6cb5b6-dfb8-11ec-9d64-0242ac120002'),
    ('1961d960-dfb9-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', 'd5e2d64a-dfb7-11ec-9d64-0242ac120002', 'a35ded44-dfb8-11ec-9d64-0242ac120002'),
    ('1b79d644-dfb9-11ec-9d64-0242ac120002', 7, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '3f194c0c-dfb8-11ec-9d64-0242ac120002', 'a35ded44-dfb8-11ec-9d64-0242ac120002'),
    ('1e0108d8-dfb9-11ec-9d64-0242ac120002', 6, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '43b5fbb6-dfb8-11ec-9d64-0242ac120002', 'a35ded44-dfb8-11ec-9d64-0242ac120002'),
    ('208981a2-dfb9-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '464c9c90-dfb8-11ec-9d64-0242ac120002', 'a35ded44-dfb8-11ec-9d64-0242ac120002'),
    ('239746e0-dfb9-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', 'd5e2d64a-dfb7-11ec-9d64-0242ac120002', 'a643671e-dfb8-11ec-9d64-0242ac120002'),
    ('2704b8b2-dfb9-11ec-9d64-0242ac120002', 3, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '3f194c0c-dfb8-11ec-9d64-0242ac120002', 'a643671e-dfb8-11ec-9d64-0242ac120002'),
    ('2ad34ec2-dfb9-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '43b5fbb6-dfb8-11ec-9d64-0242ac120002', 'a643671e-dfb8-11ec-9d64-0242ac120002'),
    ('2d43f742-dfb9-11ec-9d64-0242ac120002', 7, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '464c9c90-dfb8-11ec-9d64-0242ac120002', 'a643671e-dfb8-11ec-9d64-0242ac120002'),
    ('30437a9e-dfb9-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', 'd5e2d64a-dfb7-11ec-9d64-0242ac120002', 'aa62a300-dfb8-11ec-9d64-0242ac120002'),
    ('32e025e0-dfb9-11ec-9d64-0242ac120002', 7, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '3f194c0c-dfb8-11ec-9d64-0242ac120002', 'aa62a300-dfb8-11ec-9d64-0242ac120002'),
    ('35aee414-dfb9-11ec-9d64-0242ac120002', 6, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '43b5fbb6-dfb8-11ec-9d64-0242ac120002', 'aa62a300-dfb8-11ec-9d64-0242ac120002'),
    ('3a4962ec-dfb9-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '464c9c90-dfb8-11ec-9d64-0242ac120002', 'aa62a300-dfb8-11ec-9d64-0242ac120002'),
    ('3cef0b1e-dfb9-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', 'd5e2d64a-dfb7-11ec-9d64-0242ac120002', 'adb5ba06-dfb8-11ec-9d64-0242ac120002'),
    ('3f5f011a-dfb9-11ec-9d64-0242ac120002', 4, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '3f194c0c-dfb8-11ec-9d64-0242ac120002', 'adb5ba06-dfb8-11ec-9d64-0242ac120002'),
    ('41644484-dfb9-11ec-9d64-0242ac120002', 6, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '43b5fbb6-dfb8-11ec-9d64-0242ac120002', 'adb5ba06-dfb8-11ec-9d64-0242ac120002'),
    ('43b8d0ec-dfb9-11ec-9d64-0242ac120002', 7, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '464c9c90-dfb8-11ec-9d64-0242ac120002', 'adb5ba06-dfb8-11ec-9d64-0242ac120002'),
    ('461b399c-dfb9-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', 'd5e2d64a-dfb7-11ec-9d64-0242ac120002', 'b03c00a0-dfb8-11ec-9d64-0242ac120002'),
    ('48886fe2-dfb9-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '3f194c0c-dfb8-11ec-9d64-0242ac120002', 'b03c00a0-dfb8-11ec-9d64-0242ac120002'),
    ('4cfa88d0-dfb9-11ec-9d64-0242ac120002', 6, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '43b5fbb6-dfb8-11ec-9d64-0242ac120002', 'b03c00a0-dfb8-11ec-9d64-0242ac120002'),
    ('4f8a92de-dfb9-11ec-9d64-0242ac120002', 7, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '464c9c90-dfb8-11ec-9d64-0242ac120002', 'b03c00a0-dfb8-11ec-9d64-0242ac120002'),
    ('52b4f210-dfb9-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', 'd5e2d64a-dfb7-11ec-9d64-0242ac120002', 'b2b14606-dfb8-11ec-9d64-0242ac120002'),
    ('55042ab8-dfb9-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '3f194c0c-dfb8-11ec-9d64-0242ac120002', 'b2b14606-dfb8-11ec-9d64-0242ac120002'),
    ('5761473c-dfb9-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '43b5fbb6-dfb8-11ec-9d64-0242ac120002', 'b2b14606-dfb8-11ec-9d64-0242ac120002'),
    ('59b720b0-dfb9-11ec-9d64-0242ac120002', 6, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '464c9c90-dfb8-11ec-9d64-0242ac120002', 'b2b14606-dfb8-11ec-9d64-0242ac120002'),
    ('5bd70018-dfb9-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', 'd5e2d64a-dfb7-11ec-9d64-0242ac120002', 'b56b3104-dfb8-11ec-9d64-0242ac120002'),
    ('5e7bd85c-dfb9-11ec-9d64-0242ac120002', 8, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '3f194c0c-dfb8-11ec-9d64-0242ac120002', 'b56b3104-dfb8-11ec-9d64-0242ac120002'),
    ('611d59d2-dfb9-11ec-9d64-0242ac120002', 6, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '43b5fbb6-dfb8-11ec-9d64-0242ac120002', 'b56b3104-dfb8-11ec-9d64-0242ac120002'),
    ('66b63616-dfb9-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '464c9c90-dfb8-11ec-9d64-0242ac120002', 'b56b3104-dfb8-11ec-9d64-0242ac120002'),
    ('695210b6-dfb9-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', 'd5e2d64a-dfb7-11ec-9d64-0242ac120002', 'b93de466-dfb8-11ec-9d64-0242ac120002'),
    ('6bed1000-dfb9-11ec-9d64-0242ac120002', 6, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '3f194c0c-dfb8-11ec-9d64-0242ac120002', 'b93de466-dfb8-11ec-9d64-0242ac120002'),
    ('6e133c10-dfb9-11ec-9d64-0242ac120002', 6, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '43b5fbb6-dfb8-11ec-9d64-0242ac120002', 'b93de466-dfb8-11ec-9d64-0242ac120002'),
    ('71015a10-dfb9-11ec-9d64-0242ac120002', 7, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '464c9c90-dfb8-11ec-9d64-0242ac120002', 'b93de466-dfb8-11ec-9d64-0242ac120002'),
    ('738c0bea-dfb9-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', 'd5e2d64a-dfb7-11ec-9d64-0242ac120002', 'bbc822b4-dfb8-11ec-9d64-0242ac120002'),
    ('937f50a6-dfb9-11ec-9d64-0242ac120002', 6, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '3f194c0c-dfb8-11ec-9d64-0242ac120002', 'bbc822b4-dfb8-11ec-9d64-0242ac120002'),
    ('96b89c46-dfb9-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '43b5fbb6-dfb8-11ec-9d64-0242ac120002', 'bbc822b4-dfb8-11ec-9d64-0242ac120002'),
    ('98db066c-dfb9-11ec-9d64-0242ac120002', 6, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '464c9c90-dfb8-11ec-9d64-0242ac120002', 'bbc822b4-dfb8-11ec-9d64-0242ac120002'),
    ('9cafda42-dfb9-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', 'd5e2d64a-dfb7-11ec-9d64-0242ac120002', 'c13e3d00-dfb8-11ec-9d64-0242ac120002'),
    ('9f42ae60-dfb9-11ec-9d64-0242ac120002', 7, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '3f194c0c-dfb8-11ec-9d64-0242ac120002', 'c13e3d00-dfb8-11ec-9d64-0242ac120002'),
    ('a308f810-dfb9-11ec-9d64-0242ac120002', 8, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '43b5fbb6-dfb8-11ec-9d64-0242ac120002', 'c13e3d00-dfb8-11ec-9d64-0242ac120002'),
    ('a55ce068-dfb9-11ec-9d64-0242ac120002', 7, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '464c9c90-dfb8-11ec-9d64-0242ac120002', 'c13e3d00-dfb8-11ec-9d64-0242ac120002'),
    ('a83930b6-dfb9-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', 'd5e2d64a-dfb7-11ec-9d64-0242ac120002', 'c3bac0d0-dfb8-11ec-9d64-0242ac120002'),
    ('aabbaf76-dfb9-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '3f194c0c-dfb8-11ec-9d64-0242ac120002', 'c3bac0d0-dfb8-11ec-9d64-0242ac120002'),
    ('ade4af36-dfb9-11ec-9d64-0242ac120002', 7, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '43b5fbb6-dfb8-11ec-9d64-0242ac120002', 'c3bac0d0-dfb8-11ec-9d64-0242ac120002'),
    ('b243ae10-dfb9-11ec-9d64-0242ac120002', 8, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '464c9c90-dfb8-11ec-9d64-0242ac120002', 'c3bac0d0-dfb8-11ec-9d64-0242ac120002'),
    ('b4f0254e-dfb9-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', 'd5e2d64a-dfb7-11ec-9d64-0242ac120002', 'c7aba6f0-dfb8-11ec-9d64-0242ac120002'),
    ('b772f9fe-dfb9-11ec-9d64-0242ac120002', 8, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '3f194c0c-dfb8-11ec-9d64-0242ac120002', 'c7aba6f0-dfb8-11ec-9d64-0242ac120002'),
    ('ba476b06-dfb9-11ec-9d64-0242ac120002', 7, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '43b5fbb6-dfb8-11ec-9d64-0242ac120002', 'c7aba6f0-dfb8-11ec-9d64-0242ac120002'),
    ('bcecec96-dfb9-11ec-9d64-0242ac120002', 7, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '464c9c90-dfb8-11ec-9d64-0242ac120002', 'c7aba6f0-dfb8-11ec-9d64-0242ac120002'),
    ('c0283fa0-dfb9-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', 'd5e2d64a-dfb7-11ec-9d64-0242ac120002', 'ca7f0a2a-dfb8-11ec-9d64-0242ac120002'),
    ('c32b79ba-dfb9-11ec-9d64-0242ac120002', 8, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '3f194c0c-dfb8-11ec-9d64-0242ac120002', 'ca7f0a2a-dfb8-11ec-9d64-0242ac120002'),
    ('c5fb0fac-dfb9-11ec-9d64-0242ac120002', 7, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '43b5fbb6-dfb8-11ec-9d64-0242ac120002', 'ca7f0a2a-dfb8-11ec-9d64-0242ac120002'),
    ('c8788480-dfb9-11ec-9d64-0242ac120002', 7, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '464c9c90-dfb8-11ec-9d64-0242ac120002', 'ca7f0a2a-dfb8-11ec-9d64-0242ac120002'),
    ('cb396676-dfb9-11ec-9d64-0242ac120002', 5, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', 'd5e2d64a-dfb7-11ec-9d64-0242ac120002', 'd0e2e59e-dfb8-11ec-9d64-0242ac120002'),
	('cd7d3b4c-dfb9-11ec-9d64-0242ac120002', 6, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '3f194c0c-dfb8-11ec-9d64-0242ac120002', 'd0e2e59e-dfb8-11ec-9d64-0242ac120002'),
    ('d002b496-dfb9-11ec-9d64-0242ac120002', 7, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '43b5fbb6-dfb8-11ec-9d64-0242ac120002', 'd0e2e59e-dfb8-11ec-9d64-0242ac120002'),
    ('d27b5624-dfb9-11ec-9d64-0242ac120002', 9, 'd8cdc288-dfb8-11ec-9d64-0242ac120002', '464c9c90-dfb8-11ec-9d64-0242ac120002', 'd0e2e59e-dfb8-11ec-9d64-0242ac120002');
