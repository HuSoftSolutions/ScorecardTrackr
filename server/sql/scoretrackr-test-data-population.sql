use scoretrackr;

set foreign_key_checks = 0;
truncate table `user`;
truncate table `role`;
truncate table user_role;
truncate table course;
truncate table nine;
truncate table hole;
truncate table round;
truncate table score;
truncate table round_type;
set foreign_key_checks = 1;

insert into `user` (user_id, email, password_hash, first_name, last_name, handicap) values
    (1, 'ransell@gmail.com', '$2a$10$OOzG0kG/hJ/2mHmq6nuPZ.0q71b3mm/sYthN93PgX6Q2XBDUNLu.K', 'Ryan', 'Ansell', 2),
    (2, 'chusek@gmail.com', '$2a$10$OOzG0kG/hJ/2mHmq6nuPZ.0q71b3mm/sYthN93PgX6Q2XBDUNLu.K', 'Cody', 'Husek', 4),
    (3, 'chorn@gmail.com', '$2a$10$OOzG0kG/hJ/2mHmq6nuPZ.0q71b3mm/sYthN93PgX6Q2XBDUNLu.K', 'Conrad', 'Horn', 6),
    (4, 'wsmith@gmail.com', '$2a$10$OOzG0kG/hJ/2mHmq6nuPZ.0q71b3mm/sYthN93PgX6Q2XBDUNLu.K', 'Wes', 'Smith', 8);

insert into `role` (role_id, `name`) values
	(1, 'USER'),
    (2, 'ADMIN');

insert into user_role (user_id, role_id) values
	(1, 2),
    (2, 2),
    (3, 1),
    (4, 1);

insert into course (course_id, `name`, address, city, state, zip_code, phone_number, email, rating, slope) values
	(1, 'Fox Run Golf Club', '129 County Hwy 142A', 'Johnstown', 'NY', 12095, '(518)-762-3717', 'richardscott@pga.com', 70.0, 125.0);
    
insert into nine (nine_id, `name`, course_id) values
	(1, 'Front 9', 1),
    (2, 'Back 9', 1);
    
insert into hole (hole_id, `number`, handicap, par, yards, nine_id) values
	(1, 1, 15, 5, 150, 1),
    (2, 2, 2, 3, 400, 1),
    (3, 3, 13, 4, 150, 1),
    (4, 4, 4, 3, 150, 1),
    (5, 5, 5, 4, 150, 1),
    (6, 6, 6, 3, 150, 1),
    (7, 7, 17, 5, 150, 1),
    (8, 8, 8, 4, 150, 1),
    (9, 9, 10, 4, 150, 1),
    (10, 10, 9, 5, 150, 2),
    (11, 11, 11, 3, 150, 2),
    (12, 12, 12, 4, 150, 2),
    (13, 13, 3, 3, 150, 2),
    (14, 14, 14, 4, 150, 2),
    (15, 15, 1, 4, 150, 2),
    (16, 16, 16, 5, 150, 2),
    (17, 17, 7, 4, 150, 2),
    (18, 18, 18, 4, 150, 2);

insert into round_type (round_type_id, `name`) values
	(1, 'STROKE'),
    (2, 'MATCH');

insert into `round` (round_id, round_type_id) values
	(1, 1);

insert into score (score_id, score, round_id, user_id, hole_id) values
	(1, 5, 1, 1, 1),
    (2, 4, 1, 2, 1),
    (3, 7, 1, 3, 1),
    (4, 4, 1, 4, 1),
    (5, 5, 1, 1, 2),
    (6, 5, 1, 2, 2),
    (7, 4, 1, 3, 2),
    (8, 7, 1, 4, 2),
    (9, 5, 1, 1, 3),
    (10, 8, 1, 2, 3),
    (11, 5, 1, 3, 3),
    (12, 6, 1, 4, 3),
    (13, 5, 1, 1, 4),
    (14, 7, 1, 2, 4),
    (15, 3, 1, 3, 4),
    (16, 5, 1, 4, 4),
    (17, 5, 1, 1, 5),
    (18, 7, 1, 2, 5),
    (19, 6, 1, 3, 5),
    (20, 5, 1, 4, 5),
    (21, 5, 1, 1, 6),
    (22, 3, 1, 2, 6),
    (23, 5, 1, 3, 6),
    (24, 7, 1, 4, 6),
    (25, 5, 1, 1, 7),
    (26, 7, 1, 2, 7),
    (27, 6, 1, 3, 7),
    (28, 5, 1, 4, 7),
    (29, 5, 1, 1, 8),
    (30, 4, 1, 2, 8),
    (31, 6, 1, 3, 8),
    (32, 7, 1, 4, 8),
    (33, 5, 1, 1, 9),
    (34, 5, 1, 2, 9),
    (35, 6, 1, 3, 9),
    (36, 7, 1, 4, 9),
    (37, 5, 1, 1, 10),
    (38, 5, 1, 2, 10),
    (39, 5, 1, 3, 10),
    (40, 6, 1, 4, 10),
    (41, 5, 1, 1, 11),
    (42, 8, 1, 2, 11),
    (43, 6, 1, 3, 11),
    (44, 5, 1, 4, 11),
    (45, 5, 1, 1, 12),
    (46, 6, 1, 2, 12),
    (47, 6, 1, 3, 12),
    (48, 7, 1, 4, 12),
    (49, 5, 1, 1, 13),
    (50, 6, 1, 2, 13),
    (51, 5, 1, 3, 13),
    (52, 6, 1, 4, 13),
    (53, 5, 1, 1, 14),
    (54, 7, 1, 2, 14),
    (55, 8, 1, 3, 14),
    (56, 7, 1, 4, 14),
    (57, 5, 1, 1, 15),
    (58, 5, 1, 2, 15),
    (59, 7, 1, 3, 15),
    (60, 8, 1, 4, 15),
    (61, 5, 1, 1, 16),
    (62, 8, 1, 2, 16),
    (63, 7, 1, 3, 16),
    (64, 7, 1, 4, 16),
    (65, 5, 1, 1, 17),
    (66, 8, 1, 2, 17),
    (67, 7, 1, 3, 17),
    (68, 7, 1, 4, 17),
    (69, 5, 1, 1, 18),
	(70, 6, 1, 2, 18),
    (71, 7, 1, 3, 18),
    (72, 9, 1, 4, 18);
