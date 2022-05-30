package com.scoretrackr.data.round_type;

import com.scoretrackr.models.RoundType;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RoundTypeMapper implements RowMapper<RoundType> {

    @Override
    public RoundType mapRow(ResultSet rs, int rowNum) throws SQLException {
        RoundType roundType = new RoundType();

        roundType.setRoundTypeId(rs.getString("round_type_id"));
        roundType.setName(rs.getString("name"));

        return roundType;
    }
}
