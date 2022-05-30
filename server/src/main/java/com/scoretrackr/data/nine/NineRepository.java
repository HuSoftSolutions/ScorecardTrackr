package com.scoretrackr.data.nine;

import com.scoretrackr.models.Nine;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class NineRepository {

    private final JdbcTemplate jdbcTemplate;

    public NineRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    public Nine findByNineId(int nineId) {
        final String sql = "select * "
                        + "from nine n "
                        + "inner join course c on n.course_id = c.course_id "
                        + "where n.nine_id = " + nineId + ";";
        return jdbcTemplate.queryForObject(sql, new NineMapper());
    }

    public List<Nine> findByCourseId(int courseId) {
        final String sql = "select * "
                        + "from nine n "
                        + "inner join course c on n.course_id = c.course_id "
                        + "where n.course_id = " + courseId + ";";
        return jdbcTemplate.query(sql, new NineMapper());
    }

    public Nine add(Nine nine) {
        final String sql = "insert into nine (`name`, course_id) values (?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, nine.getName());
            statement.setInt(2, nine.getCourse().getCourseId());
            return statement;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        nine.setNineId(keyHolder.getKey().intValue());

        return nine;
    }
}
