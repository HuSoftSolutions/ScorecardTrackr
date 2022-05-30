package com.scoretrackr.data.round;

import com.scoretrackr.models.Hole;
import com.scoretrackr.models.Round;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class RoundRepository {

    private final JdbcTemplate jdbcTemplate;

    public RoundRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    public Round findByRoundId(String roundId) {
        final String sql = "select * "
                        + "from `round` r "
                        + "inner join round_type rt on r.round_type_id = rt.round_type_id "
                        + "where r.round_id = " + roundId + ";";
        return jdbcTemplate.queryForObject(sql, new RoundMapper());
    }

    public Round add(Round round) {
        final String sql = "insert into `round` (round_id, round_type_id) values (?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, round.getRoundId());
            statement.setString(2, round.getRoundType().getRoundTypeId());
            return statement;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        return round;
    }

    public boolean update(Round round) {
        final String sql = "update round set "
                + "round_type_id = ? "
                + "where round_id = ?;";

        int rowsAffected = jdbcTemplate.update(sql,
                round.getRoundType().getRoundTypeId(),
                round.getRoundId());

        return rowsAffected > 0;
    }

    // THE CHANGE FUNCTION BELOW MIGHT NOT BE NEEDED

    public boolean changeRoundType(Round round) {
        final String sql = "update `round` set round_type_id = ? where round_id = ?;";
        int rowsAffected = jdbcTemplate.update(sql, round.getRoundType().getRoundTypeId(), round.getRoundId());
        return rowsAffected > 0;
    }
}
