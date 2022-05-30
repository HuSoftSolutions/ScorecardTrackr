package com.scoretrackr.data.course;

import com.scoretrackr.models.Course;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CourseMapper implements RowMapper<Course> {

    @Override
    public Course mapRow(ResultSet rs, int rowNum) throws SQLException {
        Course course = new Course();

        course.setCourseId(rs.getString("course_id"));
        course.setName(rs.getString("name"));
        course.setAddress(rs.getString("address"));
        course.setCity(rs.getString("city"));
        course.setState(rs.getString("state"));
        course.setZipCode(rs.getString("zip_code"));
        course.setPhoneNumber(rs.getString("phone_number"));
        course.setEmail(rs.getString("email"));
        course.setRating(rs.getDouble("rating"));
        course.setSlope(rs.getDouble("slope"));

        return course;
    }

}
