package com.scoretrackr.domain;

import com.scoretrackr.data.course.CourseRepository;
import com.scoretrackr.domain.result.Result;
import com.scoretrackr.domain.result.ResultType;
import com.scoretrackr.models.Course;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    private final CourseRepository repository;

    public CourseService(CourseRepository repository) { this.repository = repository; }

    public List<Course> findAll() { return repository.findAll(); }

    public Course findByCourseId(int courseId) { return repository.findByCourseId(courseId); }

    public Course findByName(String name) { return repository.findByName(name); }

    public Result<Course> add(Course course) {
        Result<Course> result = validate(course);
        if (!result.isSuccess()) {
            return result;
        }

        if (course.getCourseId() != 0) {
            result.addErrorMessage("Course ID must not be set for add.");
            return result;
        }

        course = repository.add(course);
        result.setPayload(course);
        return result;
    }

    public Result<Course> update(Course course) {
        Result<Course> result = validate(course);
        if (!result.isSuccess()) {
            return result;
        }

        boolean success = repository.update(course);
        if (!success) {
            result.addErrorMessage("Could not update Course ID: " + course.getCourseId());
        }

        return result;
    }

    // THE CHANGE FUNCTIONS BELOW MIGHT NOT BE NEEDED

    public Result<Course> changeName(Course course) {
        Result<Course> result = validate(course);
        if (!result.isSuccess()) {
            return result;
        }

        boolean success = repository.changeName(course);
        if (!success) {
            result.addErrorMessage("Could not change name of Course ID: " + course.getCourseId());
        }

        return result;
    }

    public Result<Course> changePhoneNumber(Course course) {
        Result<Course> result = validate(course);
        if (!result.isSuccess()) {
            return result;
        }

        boolean success = repository.changePhoneNumber(course);
        if (!success) {
            result.addErrorMessage("Could not change phone number of Course ID: " + course.getCourseId());
        }

        return result;
    }

    public Result<Course> changeEmail(Course course) {
        Result<Course> result = validate(course);
        if (!result.isSuccess()) {
            return result;
        }

        boolean success = repository.changeEmail(course);
        if (!success) {
            result.addErrorMessage("Could not change email of Course ID: " + course.getCourseId());
        }

        return result;
    }

    public Result<Course> changeRating(Course course) {
        Result<Course> result = validate(course);
        if (!result.isSuccess()) {
            return result;
        }

        boolean success = repository.changeRating(course);
        if (!success) {
            result.addErrorMessage("Could not change rating of Course ID: " + course.getCourseId());
        }

        return result;
    }

    public Result<Course> changeSlope(Course course) {
        Result<Course> result = validate(course);
        if (!result.isSuccess()) {
            return result;
        }

        boolean success = repository.changeSlope(course);
        if (!success) {
            result.addErrorMessage("Could not change slope of Course ID: " + course.getCourseId());
        }

        return result;
    }

    private Result<Course> validate(Course course) {
        Result<Course> result = new Result<>();

        if (course == null) {
            result.addMessage("Course cannot be null.", ResultType.INVALID);
            return result;
        }

        return result;
    }
}
