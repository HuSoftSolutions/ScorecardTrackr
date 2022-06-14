package com.scoretrackr.domain;

import com.scoretrackr.data.match_format.MatchFormatRepository;
import com.scoretrackr.domain.result.Result;
import com.scoretrackr.domain.result.ResultType;
import com.scoretrackr.models.MatchFormat;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchFormatService {

    private final MatchFormatRepository repository;

    public MatchFormatService(MatchFormatRepository repository) { this.repository = repository; }

    public List<MatchFormat> findAll() { return repository.findAll(); }

    public MatchFormat findByMatchFormatId(String matchFormatId) { return repository.findByMatchFormatId(matchFormatId); }

    public Result<MatchFormat> add(MatchFormat matchFormat) {
        Result<MatchFormat> result = validate(matchFormat);
        if (!result.isSuccess()) {
            return result;
        }

        matchFormat = repository.add(matchFormat);
        result.setPayload(matchFormat);
        return result;
    }

    private Result<MatchFormat> validate(MatchFormat matchFormat) {
        Result<MatchFormat> result = new Result<>();

        if (matchFormat == null) {
            result.addMessage("MatchFormat cannot be null.", ResultType.INVALID);
            return result;
        }

        return result;
    }

}
