package com.scoretrackr.data.round;

import com.scoretrackr.models.Round;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RoundMapper implements RowMapper<Round> {

    @Override
    public Round mapRow(ResultSet rs, int rowNum) throws SQLException {
        Round round = new Round();

        round.setRoundId(rs.getString("round_id"));

        return round;
    }
}
