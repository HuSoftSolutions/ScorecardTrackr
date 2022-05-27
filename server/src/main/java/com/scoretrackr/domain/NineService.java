package com.scoretrackr.domain;

import com.scoretrackr.data.course.CourseRepository;
import com.scoretrackr.data.nine.NineRepository;
import com.scoretrackr.domain.result.Result;
import com.scoretrackr.domain.result.ResultType;
import com.scoretrackr.models.Course;
import com.scoretrackr.models.Nine;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NineService {
    private final NineRepository repository;

    public NineService(NineRepository repository) { this.repository = repository; }

    public Nine findByNineId(int nineId) { return repository.findByNineId(nineId); }

    public List<Nine> findByCourseId(int courseId) { return repository.findByCourseId(courseId); }

    public Result<Nine> add(Nine nine) {
        Result<Nine> result = validate(nine);
        if (!result.isSuccess()) {
            return result;
        }

        if (nine.getNineId() != 0) {
            result.addErrorMessage("Nine ID must not be set for add.");
            return result;
        }

        nine = repository.add(nine);
        result.setPayload(nine);
        return result;
    }

    private Result<Nine> validate(Nine nine) {
        Result<Nine> result = new Result<>();

        if (nine == null) {
            result.addMessage("Nine cannot be null.", ResultType.INVALID);
            return result;
        }

        return result;
    }
}
