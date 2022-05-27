package com.scoretrackr.data.round_type;

import com.scoretrackr.models.RoundType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class RoundTypeRepository {

    private final JdbcTemplate jdbcTemplate;

    public RoundTypeRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    public List<RoundType> findAll() {
        final String sql = "select * from round_type;";
        return jdbcTemplate.query(sql, new RoundTypeMapper());
    }

    public RoundType findByRoundTypeId(int roundTypeId) {
        final String sql = "select * from round_type where round_type_id = " + roundTypeId + ";";
        return jdbcTemplate.queryForObject(sql, new RoundTypeMapper());
    }

    public RoundType add(RoundType roundType) {
        final String sql = "insert into round_type (`name`) values (?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, roundType.getName());
            return statement;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        roundType.setRoundTypeId(keyHolder.getKey().intValue());

        return roundType;
    }
}
