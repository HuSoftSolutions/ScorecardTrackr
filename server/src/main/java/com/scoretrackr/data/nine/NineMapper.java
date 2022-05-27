package com.scoretrackr.data.nine;

import com.scoretrackr.data.course.CourseMapper;
import com.scoretrackr.models.Nine;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class NineMapper implements RowMapper<Nine> {

    @Override
    public Nine mapRow(ResultSet rs, int rowNum) throws SQLException {
        Nine nine = new Nine();

        nine.setNineId(rs.getInt("nine_id"));
        nine.setName(rs.getString("`name`"));
        CourseMapper courseMapper = new CourseMapper();
        nine.setCourse(courseMapper.mapRow(rs, rowNum));

        return nine;
    }
}
