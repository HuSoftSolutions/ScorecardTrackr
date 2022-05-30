package com.scoretrackr.data.course;

import com.scoretrackr.models.Course;
import com.scoretrackr.models.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class CourseRepository {

    private final JdbcTemplate jdbcTemplate;

    public CourseRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    public List<Course> findAll() {
        final String sql = "select * from course;";
        return jdbcTemplate.query(sql, new CourseMapper());
    }

    public Course findByCourseId(String courseId) {
        final String sql = "select * from course where course_id = '" + courseId + "';";
        return jdbcTemplate.queryForObject(sql, new CourseMapper());
    }

    public Course findByName(String name) {
        final String sql = "select * from course where `name` = \"" + name + "\";";
        return jdbcTemplate.queryForObject(sql, new CourseMapper());
    }

    public Course add(Course course) {
        final String sql = "insert into course (course_id, `name`, address, city, state, zip_code, phone_number, "
            + "email, rating, slope) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, course.getCourseId());
            statement.setString(2, course.getName());
            statement.setString(3, course.getAddress());
            statement.setString(4, course.getCity());
            statement.setString(5, course.getState());
            statement.setString(6, course.getZipCode());
            statement.setString(7, course.getPhoneNumber());
            statement.setString(8, course.getEmail());
            statement.setDouble(9, course.getRating());
            statement.setDouble(10, course.getSlope());
            return statement;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        return course;
    }

    public boolean update(Course course) {
        final String sql = "update course set "
                + "`name` = ?, "
                + "address = ?, "
                + "city = ?, "
                + "state = ?, "
                + "zip_code = ?, "
                + "phone_number = ?, "
                + "email = ?, "
                + "rating = ?, "
                + "slope = ? "
                + "where course_id = ?;";

        int rowsAffected = jdbcTemplate.update(sql,
                course.getName(),
                course.getAddress(),
                course.getCity(),
                course.getState(),
                course.getZipCode(),
                course.getPhoneNumber(),
                course.getEmail(),
                course.getRating(),
                course.getSlope(),
                course.getCourseId());

        return rowsAffected > 0;
    }

    // THE CHANGE FUNCTIONS BELOW MIGHT NOT BE NEEDED

    public boolean changeName(Course course) {
        final String sql = "update course set name = ? where course_id = ?;";
        int rowsAffected = jdbcTemplate.update(sql, course.getName(), course.getCourseId());
        return rowsAffected > 0;
    }

    public boolean changePhoneNumber(Course course) {
        final String sql = "update course set phone_number = ? where course_id = ?;";
        int rowsAffected = jdbcTemplate.update(sql, course.getPhoneNumber(), course.getCourseId());
        return rowsAffected > 0;
    }

    public boolean changeEmail(Course course) {
        String sql = "update course set email = ? where course_id = ?;";
        int rowsAffected = jdbcTemplate.update(sql, course.getEmail(), course.getCourseId());
        return rowsAffected > 0;
    }

    public boolean changeRating(Course course) {
        String sql = "update course set rating = ? where course_id = ?;";
        int rowsAffected = jdbcTemplate.update(sql, course.getRating(), course.getCourseId());
        return rowsAffected > 0;
    }

    public boolean changeSlope(Course course) {
        String sql = "update course set slope = ? where course_id = ?;";
        int rowsAffected = jdbcTemplate.update(sql, course.getSlope(), course.getCourseId());
        return rowsAffected > 0;
    }
}
