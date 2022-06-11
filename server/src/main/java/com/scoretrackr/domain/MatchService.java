package com.scoretrackr.domain;

import com.scoretrackr.data.match.MatchRepository;
import com.scoretrackr.domain.result.Result;
import com.scoretrackr.domain.result.ResultType;
import com.scoretrackr.models.Match;
import com.scoretrackr.models.Match;
import com.scoretrackr.models.Match;
import org.springframework.stereotype.Service;

@Service
public class MatchService {
    private final MatchRepository repository;

    public MatchService(MatchRepository repository) { this.repository = repository; }

    public Match findByMatchId(String matchId) { return repository.findByMatchId(matchId); }

    public Result<Match> add(Match match) {
        Result<Match> result = validate(match);
        if (!result.isSuccess()) {
            return result;
        }

        match = repository.add(match);
        result.setPayload(match);
        return result;
    }

    public boolean deleteByMatchId(String matchId) {
        return repository.deleteByMatchId(matchId);
    }

    private Result<Match> validate(Match match) {
        Result<Match> result = new Result<>();

        if (match == null) {
            result.addMessage("Match cannot be null.", ResultType.INVALID);
            return result;
        }

        return result;
    }
}
