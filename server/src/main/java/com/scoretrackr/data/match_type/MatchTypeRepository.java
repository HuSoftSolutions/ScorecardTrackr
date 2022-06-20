package com.scoretrackr.data.match_type;

import com.scoretrackr.data.match_type.MatchTypeMapper;
import com.scoretrackr.models.MatchType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class MatchTypeRepository {

    private final JdbcTemplate jdbcTemplate;

    public MatchTypeRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    public List<MatchType> findAll() {
        final String sql = "select * from match_type;";
        return jdbcTemplate.query(sql, new MatchTypeMapper());
    }

    public MatchType findByMatchTypeId(String matchTypeId) {
        final String sql = "select * from match_type where match_type_id = '" + matchTypeId + "';";
        return jdbcTemplate.queryForObject(sql, new MatchTypeMapper());
    }

    public MatchType add(MatchType matchType) {
        final String sql = "insert into match_type (match_type_id, `name`) values (?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, matchType.getMatchTypeId());
            statement.setString(2, matchType.getName());
            return statement;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        return matchType;
    }

}