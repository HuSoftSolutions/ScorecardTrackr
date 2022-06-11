package com.scoretrackr.data.scoring_type;

import com.scoretrackr.models.ScoringType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class ScoringTypeRepository {

    private final JdbcTemplate jdbcTemplate;

    public ScoringTypeRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    public List<ScoringType> findAll() {
        final String sql = "select * from scoring_type;";
        return jdbcTemplate.query(sql, new ScoringTypeMapper());
    }

    public ScoringType findByScoringTypeId(String scoringTypeId) {
        final String sql = "select * from scoring_type where scoring_type_id = " + scoringTypeId + ";";
        return jdbcTemplate.queryForObject(sql, new ScoringTypeMapper());
    }

    public ScoringType add(ScoringType scoringType) {
        final String sql = "insert into scoring_type (scoring_type_id, `name`) values (?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, scoringType.getScoringTypeId());
            statement.setString(2, scoringType.getName());
            return statement;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        return scoringType;
    }

}