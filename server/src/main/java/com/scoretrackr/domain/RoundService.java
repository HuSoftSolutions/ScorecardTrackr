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

    public Round findByRoundId(String roundId) { return repository.findByRoundId(roundId); }

    public Result<Round> add(Round round) {
        Result<Round> result = validate(round);
        if (!result.isSuccess()) {
            return result;
        }

        round = repository.add(round);
        result.setPayload(round);
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
