package com.scoretrackr.domain;

import com.scoretrackr.data.course.CourseRepository;
import com.scoretrackr.data.score.ScoreRepository;
import com.scoretrackr.domain.result.Result;
import com.scoretrackr.domain.result.ResultType;
import com.scoretrackr.models.Course;
import com.scoretrackr.models.Score;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class ScoreService {
    private final ScoreRepository repository;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    public ScoreService(ScoreRepository repository) { this.repository = repository; }

    public Score findByScoreId(String scoreId) { return repository.findByScoreId(scoreId); }

    public Score findByRoundId(String roundId) { return repository.findByRoundId(roundId); }

    public Score findByUserId(String userId) { return repository.findByUserId(userId); }

    public Score findByHoleId(String holeId) { return repository.findByHoleId(holeId); }

    public Result<Score> add(Score score) {
        Result<Score> result = validate(score);
        if (!result.isSuccess()) {
            return result;
        }

        score = repository.add(score);
        result.setPayload(score);

        simpMessagingTemplate.convertAndSend("/topic/scores/", score);

        return result;
    }

    public Result<Score> changeScore(Score score) {
        Result<Score> result = validate(score);
        if (!result.isSuccess()) {
            return result;
        }

        boolean success = repository.changeScore(score);
        if (!success) {
            result.addErrorMessage("Could not change score of Score ID: " + score.getScoreId());
        }

        return result;
    }

    public Result<Score> addOneToScore(Score score) {
        Result<Score> result = validate(score);
        if (!result.isSuccess()) {
            return result;
        }

        boolean success = repository.addOneToScore(score);
        if (!success) {
            result.addErrorMessage("Could not add one to score of Score ID: " + score.getScoreId());
        }

        return result;
    }

    public Result<Score> subtractOneFromScore(Score score) {
        Result<Score> result = validate(score);
        if (!result.isSuccess()) {
            return result;
        }

        boolean success = repository.subtractOneFromScore(score);
        if (!success) {
            result.addErrorMessage("Could not subtract one to score of Score ID: " + score.getScoreId());
        }

        return result;
    }

    private Result<Score> validate(Score score) {
        Result<Score> result = new Result<>();

        if (score == null) {
            result.addMessage("Score cannot be null.", ResultType.INVALID);
            return result;
        }

        return result;
    }
}
