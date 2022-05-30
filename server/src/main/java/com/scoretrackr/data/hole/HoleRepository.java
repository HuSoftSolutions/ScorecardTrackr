package com.scoretrackr.data.hole;

import com.scoretrackr.models.Hole;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class HoleRepository {

    private final JdbcTemplate jdbcTemplate;

    public HoleRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    public Hole findByHoleId(String holeId) {
        final String sql = "select * "
                        + "from hole h "
                        + "inner join nine n on h.nine_id = n.nine_id "
                        + "inner join course c on n.course_id = c.course_id "
                        + "where h.hole_id = '" + holeId + "';";
        return jdbcTemplate.queryForObject(sql, new HoleMapper());
    }

    public List<Hole> findByNineId(String nineId) {
        final String sql = "select * "
                        + "from hole h "
                        + "inner join nine n on h.nine_id = n.nine_id "
                        + "inner join course c on n.course_id = c.course_id "
                        + "where h.nine_id = '" + nineId + "';";
        return jdbcTemplate.query(sql, new HoleMapper());
    }

    public Hole add(Hole hole) {
        final String sql = "insert into hole (hole_id, `number`, handicap, par, yards, nine_id) "
                + "values (?, ?, ?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, hole.getHoleId());
            statement.setInt(2, hole.getNumber());
            statement.setInt(3, hole.getHandicap());
            statement.setInt(4, hole.getPar());
            statement.setInt(5, hole.getYards());
            statement.setString(6, hole.getNine().getNineId());
            return statement;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        return hole;
    }

    public boolean update(Hole hole) {
        final String sql = "update hole set "
                + "`number` = ?, "
                + "handicap = ?, "
                + "par = ?, "
                + "yards = ?, "
                + "nine_id = ? "
                + "where hole_id = ?;";

        int rowsAffected = jdbcTemplate.update(sql,
                hole.getNumber(),
                hole.getHandicap(),
                hole.getPar(),
                hole.getYards(),
                hole.getNine().getNineId(),
                hole.getHoleId());

        return rowsAffected > 0;
    }
}
