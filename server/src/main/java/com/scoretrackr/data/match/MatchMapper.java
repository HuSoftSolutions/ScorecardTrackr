package com.scoretrackr.data.match;

import com.scoretrackr.data.match_format.MatchFormatMapper;
import com.scoretrackr.data.match_type.MatchTypeMapper;
import com.scoretrackr.data.round.RoundMapper;
import com.scoretrackr.data.scoring_type.ScoringTypeMapper;
import com.scoretrackr.models.Match;
import com.scoretrackr.models.ScoringType;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MatchMapper implements RowMapper<Match> {

    @Override
    public Match mapRow(ResultSet rs, int rowNum) throws SQLException {
        Match match = new Match();

        match.setMatchId(rs.getString("match_id"));
        RoundMapper roundMapper = new RoundMapper();
        match.setRound(roundMapper.mapRow(rs, rowNum));
        ScoringTypeMapper scoringTypeMapper = new ScoringTypeMapper();
        match.setScoringType(scoringTypeMapper.mapRow(rs, rowNum));
        MatchFormatMapper matchFormatMapper = new MatchFormatMapper();
        match.setMatchFormat(matchFormatMapper.mapRow(rs, rowNum));
        MatchTypeMapper matchTypeMapper = new MatchTypeMapper();
        match.setMatchType(matchTypeMapper.mapRow(rs, rowNum));

        return match;
    }
}
