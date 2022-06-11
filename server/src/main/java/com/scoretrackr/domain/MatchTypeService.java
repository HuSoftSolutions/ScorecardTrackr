package com.scoretrackr.domain;

import com.scoretrackr.data.match_type.MatchTypeRepository;
import com.scoretrackr.domain.result.Result;
import com.scoretrackr.domain.result.ResultType;
import com.scoretrackr.models.MatchType;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchTypeService {

    private final MatchTypeRepository repository;

    public MatchTypeService(MatchTypeRepository repository) { this.repository = repository; }

    public List<MatchType> findAll() { return repository.findAll(); }

    public MatchType findByMatchTypeId(String matchTypeId) { return repository.findByMatchTypeId(matchTypeId); }

    public Result<MatchType> add(MatchType matchType) {
        Result<MatchType> result = validate(matchType);
        if (!result.isSuccess()) {
            return result;
        }

        matchType = repository.add(matchType);
        result.setPayload(matchType);
        return result;
    }

    private Result<MatchType> validate(MatchType matchType) {
        Result<MatchType> result = new Result<>();

        if (matchType == null) {
            result.addMessage("MatchType cannot be null.", ResultType.INVALID);
            return result;
        }

        return result;
    }

}
