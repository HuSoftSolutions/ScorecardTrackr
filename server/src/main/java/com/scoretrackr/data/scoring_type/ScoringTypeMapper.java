package com.scoretrackr.data.scoring_type;

import com.scoretrackr.models.ScoringType;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ScoringTypeMapper implements RowMapper<ScoringType> {

    @Override
    public ScoringType mapRow(ResultSet rs, int rowNum) throws SQLException {
        ScoringType scoringType = new ScoringType();

        scoringType.setScoringTypeId(rs.getString("scoring_type_id"));

        return scoringType;
    }

}
