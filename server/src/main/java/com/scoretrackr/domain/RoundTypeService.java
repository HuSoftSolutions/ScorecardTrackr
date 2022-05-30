package com.scoretrackr.domain;

import com.scoretrackr.data.course.CourseRepository;
import com.scoretrackr.data.round_type.RoundTypeRepository;
import com.scoretrackr.domain.result.Result;
import com.scoretrackr.domain.result.ResultType;
import com.scoretrackr.models.Course;
import com.scoretrackr.models.RoundType;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoundTypeService {
    private final RoundTypeRepository repository;

    public RoundTypeService(RoundTypeRepository repository) { this.repository = repository; }

    public List<RoundType> findAll() { return repository.findAll(); }

    public RoundType findByRoundTypeId(String roundTypeId) { return repository.findByRoundTypeId(roundTypeId); }

    public Result<RoundType> add(RoundType roundType) {
        Result<RoundType> result = validate(roundType);
        if (!result.isSuccess()) {
            return result;
        }

        roundType = repository.add(roundType);
        result.setPayload(roundType);
        return result;
    }

    private Result<RoundType> validate(RoundType roundType) {
        Result<RoundType> result = new Result<>();

        if (roundType == null) {
            result.addMessage("RoundType cannot be null.", ResultType.INVALID);
            return result;
        }

        return result;
    }


}
