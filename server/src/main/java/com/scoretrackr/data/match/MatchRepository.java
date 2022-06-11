package com.scoretrackr.data.match;

import com.scoretrackr.models.Match;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;

@Repository
public class MatchRepository {

    private final JdbcTemplate jdbcTemplate;

    public MatchRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    public Match findByMatchId(String matchId) {
        final String sql = "select * from `match` where match_id = `" + matchId + "`;";
        return jdbcTemplate.queryForObject(sql, new MatchMapper());
    }

    public Match add(Match match) {
        final String sql = "insert into `match` (match_id, round_id, scoring_type_id, match_format_id, match_type_id) "
                + "values (?, ?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, match.getMatchId());
            statement.setString(2, match.getRound().getRoundId());
            statement.setString(3, match.getScoringType().getScoringTypeId());
            statement.setString(4, match.getMatchFormat().getMatchFormatId());
            statement.setString(5, match.getMatchType().getMatchTypeId());
            return statement;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        return match;
    }

    public boolean deleteByMatchId(String matchId) {
        final String sql = "delete from `match` where match_id = `" + matchId + "`;";
        int rowsAffected = jdbcTemplate.update(sql, matchId);
        return rowsAffected > 0;
    }

}
