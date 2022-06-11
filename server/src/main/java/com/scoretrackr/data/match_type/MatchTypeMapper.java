package com.scoretrackr.data.match_type;

import com.scoretrackr.models.MatchType;
import com.scoretrackr.models.MatchType;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MatchTypeMapper implements RowMapper<MatchType> {

    @Override
    public MatchType mapRow(ResultSet rs, int rowNum) throws SQLException {
        MatchType matchType = new MatchType();

        matchType.setMatchTypeId(rs.getString("match_type_id"));

        return matchType;
    }

}
