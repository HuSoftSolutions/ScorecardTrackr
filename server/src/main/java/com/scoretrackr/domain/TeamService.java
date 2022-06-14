package com.scoretrackr.domain;

import com.scoretrackr.data.team.TeamRepository;
import com.scoretrackr.domain.result.Result;
import com.scoretrackr.domain.result.ResultType;
import com.scoretrackr.models.Team;
import org.springframework.stereotype.Service;

@Service
public class TeamService {
    private final TeamRepository repository;

    public TeamService(TeamRepository repository) { this.repository = repository; }

    public Team findByTeamId(String teamId) { return repository.findByTeamId(teamId); }

    public Result<Team> add(Team team) {
        Result<Team> result = validate(team);
        if (!result.isSuccess()) {
            return result;
        }

        team = repository.add(team);
        result.setPayload(team);
        return result;
    }

    private Result<Team> validate(Team team) {
        Result<Team> result = new Result<>();

        if (team == null) {
            result.addMessage("Team cannot be null.", ResultType.INVALID);
            return result;
        }

        return result;
    }
}
