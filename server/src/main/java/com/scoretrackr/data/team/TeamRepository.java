package com.scoretrackr.data.team;

import com.scoretrackr.models.Team;
import com.scoretrackr.models.Team;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;

@Repository
public class TeamRepository {

    private final JdbcTemplate jdbcTemplate;

    public TeamRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    public Team findByTeamId(String teamId) {
        final String sql = "select * "
                    + "from team t"
                    + "inner join match m on t.match_id = m.match_id "
                    + "where t.team_id = `" + teamId + "`;";
        return jdbcTemplate.queryForObject(sql, new TeamMapper());
    }

    public Team add(Team team) {
        final String sql = "insert into team (team_id, match_id) values (?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, team.getTeamId());
            statement.setString(2, team.getMatch().getMatchId());
            return statement;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        return team;
    }
}
