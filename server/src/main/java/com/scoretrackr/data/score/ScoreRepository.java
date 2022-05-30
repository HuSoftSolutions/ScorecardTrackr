package com.scoretrackr.data.score;

import com.scoretrackr.data.hole.HoleMapper;
import com.scoretrackr.models.Course;
import com.scoretrackr.models.Hole;
import com.scoretrackr.models.Score;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;

@Repository
public class ScoreRepository {

    private final JdbcTemplate jdbcTemplate;

    public ScoreRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    public Score findByScoreId(String scoreId) {
        final String sql = "select * from score where score_id = " + scoreId + ";";
        return jdbcTemplate.queryForObject(sql, new ScoreMapper());
    }

    public Score findByRoundId(String roundId) {
        final String sql = "select * from score where round_id = " + roundId + ";";
        return jdbcTemplate.queryForObject(sql, new ScoreMapper());
    }

    public Score findByUserId(String userId) {
        final String sql = "select * from score where user_id = " + userId + ";";
        return jdbcTemplate.queryForObject(sql, new ScoreMapper());
    }

    public Score findByHoleId(String holeId) {
        final String sql = "select * from score where hole_id = " + holeId + ";";
        return jdbcTemplate.queryForObject(sql, new ScoreMapper());
    }

    public Score add(Score score) {
        final String sql = "insert into score (score_id, score, round_id, user_id, hole_id) "
                + "values (?, ?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, score.getScoreId());
            statement.setInt(2, score.getScore());
            statement.setString(3, score.getRound().getRoundId());
            statement.setString(4, score.getUser().getUserId());
            statement.setString(5, score.getHole().getHoleId());
            return statement;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        return score;
    }

    public boolean changeScore(Score score) {
        final String sql = "update score set score = ? where score_id = ?;";
        int rowsAffected = jdbcTemplate.update(sql, score.getScore(), score.getScoreId());
        return rowsAffected > 0;
    }

    public boolean addOneToScore(Score score) {
        final String sql = "update score set score = ? where score_id = ?;";
        int rowsAffected = jdbcTemplate.update(sql, score.getScore() + 1, score.getScoreId());
        return rowsAffected > 0;
    }

    public boolean subtractOneFromScore(Score score) {
        final String sql = "update score set score = ? where score_id = ?;";
        int rowsAffected = jdbcTemplate.update(sql, score.getScore() - 1, score.getScoreId());
        return rowsAffected > 0;
    }
}
