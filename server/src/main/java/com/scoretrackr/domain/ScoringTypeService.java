package com.scoretrackr.domain;

import com.scoretrackr.data.scoring_type.ScoringTypeRepository;
import com.scoretrackr.domain.result.Result;
import com.scoretrackr.domain.result.ResultType;
import com.scoretrackr.models.ScoringType;
import com.scoretrackr.models.ScoringType;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScoringTypeService {

    private final ScoringTypeRepository repository;

    public ScoringTypeService(ScoringTypeRepository repository) { this.repository = repository; }

    public List<ScoringType> findAll() { return repository.findAll(); }

    public ScoringType findByScoringTypeId(String scoringTypeId) { return repository.findByScoringTypeId(scoringTypeId); }

    public Result<ScoringType> add(ScoringType scoringType) {
        Result<ScoringType> result = validate(scoringType);
        if (!result.isSuccess()) {
            return result;
        }

        scoringType = repository.add(scoringType);
        result.setPayload(scoringType);
        return result;
    }

    private Result<ScoringType> validate(ScoringType scoringType) {
        Result<ScoringType> result = new Result<>();

        if (scoringType == null) {
            result.addMessage("ScoringType cannot be null.", ResultType.INVALID);
            return result;
        }

        return result;
    }

}
