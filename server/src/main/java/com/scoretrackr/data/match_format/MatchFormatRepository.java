package com.scoretrackr.data.match_format;


import com.scoretrackr.data.match_format.MatchFormatMapper;
import com.scoretrackr.models.MatchFormat;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class MatchFormatRepository {

    private final JdbcTemplate jdbcTemplate;

    public MatchFormatRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    public List<MatchFormat> findAll() {
        final String sql = "select * from match_format;";
        return jdbcTemplate.query(sql, new MatchFormatMapper());
    }

    public MatchFormat findByMatchFormatId(String matchFormatId) {
        final String sql = "select * from match_format where match_format_id = '" + matchFormatId + "';";
        return jdbcTemplate.queryForObject(sql, new MatchFormatMapper());
    }

    public MatchFormat add(MatchFormat matchFormat) {
        final String sql = "insert into match_format (match_format_id, `name`) values (?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, matchFormat.getMatchFormatId());
            statement.setString(2, matchFormat.getName());
            return statement;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        return matchFormat;
    }

}
