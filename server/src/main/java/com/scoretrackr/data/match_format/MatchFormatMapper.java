package com.scoretrackr.data.match_format;

import com.scoretrackr.models.MatchFormat;
import com.scoretrackr.models.MatchFormat;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MatchFormatMapper implements RowMapper<MatchFormat> {

    @Override
    public MatchFormat mapRow(ResultSet rs, int rowNum) throws SQLException {
        MatchFormat scoringType = new MatchFormat();

        scoringType.setMatchFormatId(rs.getString("match_format_id"));

        return scoringType;
    }

}
