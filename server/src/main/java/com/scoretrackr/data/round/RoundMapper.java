package com.scoretrackr.data.round;

import com.scoretrackr.data.round_type.RoundTypeMapper;
import com.scoretrackr.models.Round;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RoundMapper implements RowMapper<Round> {

    @Override
    public Round mapRow(ResultSet rs, int rowNum) throws SQLException {
        Round round = new Round();

        round.setRoundId(rs.getInt("round_id"));
        RoundTypeMapper roundTypeMapper = new RoundTypeMapper();
        round.setRoundType(roundTypeMapper.mapRow(rs, rowNum));

        return round;
    }
}
