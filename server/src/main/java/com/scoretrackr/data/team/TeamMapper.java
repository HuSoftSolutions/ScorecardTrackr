package com.scoretrackr.data.team;

import com.scoretrackr.data.course.CourseMapper;
import com.scoretrackr.data.match.MatchMapper;
import com.scoretrackr.models.Match;
import com.scoretrackr.models.Team;
import com.scoretrackr.models.Team;
import com.scoretrackr.models.Team;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TeamMapper implements RowMapper<Team> {
    @Override
    public Team mapRow(ResultSet rs, int rowNum) throws SQLException {
        Team team = new Team();

        team.setTeamId(rs.getString("team_id"));
        MatchMapper matchMapper = new MatchMapper();
        team.setMatch(matchMapper.mapRow(rs, rowNum));

        return team;
    }
}
