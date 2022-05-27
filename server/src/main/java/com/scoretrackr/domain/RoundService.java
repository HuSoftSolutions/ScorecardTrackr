package com.scoretrackr.domain;

import com.scoretrackr.data.course.CourseRepository;
import com.scoretrackr.data.round.RoundRepository;
import com.scoretrackr.domain.result.Result;
import com.scoretrackr.domain.result.ResultType;
import com.scoretrackr.models.Course;
import com.scoretrackr.models.Hole;
import com.scoretrackr.models.Round;
import org.springframework.stereotype.Service;

@Service
public class RoundService {
    private final RoundRepository repository;

    public RoundService(RoundRepository repository) { this.repository = repository; }

    public Round findByRoundId(int roundId) { return repository.findByRoundId(roundId); }

    public Result<Round> add(Round round) {
        Result<Round> result = validate(round);
        if (!result.isSuccess()) {
            return result;
        }

        if (round.getRoundId() != 0) {
            result.addErrorMessage("Round ID must not be set for add.");
            return result;
        }

        round = repository.add(round);
        result.setPayload(round);
        return result;
    }

    public Result<Round> update(Round round) {
        Result<Round> result = validate(round);
        if (!result.isSuccess()) {
            return result;
        }

        boolean success = repository.update(round);
        if (!result.isSuccess()) {
            result.addErrorMessage("Could not update round with Round ID: " + round.getRoundId());
        }

        return result;
    }

    // THE CHANGE FUNCTION BELOW MIGHT NOT BE NEEDED

    public Result<Round> changeRoundType(Round round) {
        Result<Round> result = validate(round);
        if (!result.isSuccess()) {
            return result;
        }

        boolean success = repository.changeRoundType(round);
        if (!success) {
            result.addErrorMessage("Could not change round type of Round ID: " + round.getRoundId());
        }

        return result;
    }

    private Result<Round> validate(Round course) {
        Result<Round> result = new Result<>();

        if (course == null) {
            result.addMessage("Round cannot be null.", ResultType.INVALID);
            return result;
        }

        return result;
    }
}
