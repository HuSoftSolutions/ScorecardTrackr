package com.scoretrackr.domain;

import com.scoretrackr.data.hole.HoleRepository;
import com.scoretrackr.domain.result.Result;
import com.scoretrackr.domain.result.ResultType;
import com.scoretrackr.models.Course;
import com.scoretrackr.models.Hole;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HoleService {
    private final HoleRepository repository;

    public HoleService(HoleRepository repository) { this.repository = repository; }

    public Hole findByHoleId(String holeId) { return repository.findByHoleId(holeId); }

    public List<Hole> findByNineId(String nineId) { return repository.findByNineId(nineId); }

    public Result<Hole> add(Hole hole) {
        Result<Hole> result = validate(hole);
        if (!result.isSuccess()) {
            return result;
        }

        hole = repository.add(hole);
        result.setPayload(hole);
        return result;
    }

    public Result<Hole> update(Hole hole) {
        Result<Hole> result = validate(hole);
        if (!result.isSuccess()) {
            return result;
        }

        boolean success = repository.update(hole);
        if (!result.isSuccess()) {
            result.addErrorMessage("Could not update hole with Hole ID: " + hole.getHoleId());
        }

        return result;
    }

    private Result<Hole> validate(Hole hole) {
        Result<Hole> result = new Result<>();

        if (hole == null) {
            result.addMessage("Hole cannot be null.", ResultType.INVALID);
            return result;
        }

        return result;
    }
}
