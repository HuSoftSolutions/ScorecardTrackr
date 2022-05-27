package com.scoretrackr.data.score;

import com.scoretrackr.data.hole.HoleMapper;
import com.scoretrackr.data.round.RoundMapper;
import com.scoretrackr.data.user.UserMapper;
import com.scoretrackr.models.Score;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ScoreMapper implements RowMapper<Score> {

    @Override
    public Score mapRow(ResultSet rs, int rowNum) throws SQLException {
        Score score = new Score();

        score.setScoreId(rs.getInt("score_id"));
        score.setScore(rs.getInt("score"));
        RoundMapper roundMapper = new RoundMapper();
        score.setRound(roundMapper.mapRow(rs, rowNum));
        UserMapper userMapper = new UserMapper();
        score.setUser(userMapper.mapRow(rs, rowNum));
        HoleMapper holeMapper = new HoleMapper();
        score.setHole(holeMapper.mapRow(rs, rowNum));

        return score;
    }
}
