package com.scoretrackr.controllers;

import com.scoretrackr.domain.CourseService;
import com.scoretrackr.domain.result.Result;
import com.scoretrackr.models.Course;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/scoretrackr/course")
public class CourseController {

    private final CourseService service;

    public CourseController(CourseService service) { this.service = service; }

    @GetMapping
    public List<Course> findAll() { return service.findAll(); }

    @GetMapping("/{courseId}")
    public ResponseEntity<Course> findByCourseId(@PathVariable int courseId){
        Course course = service.findByCourseId(courseId);
        if (course == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(course);
    }

    @GetMapping("/{name}")
    public ResponseEntity<Course> findByName(@PathVariable String name){
        Course course = service.findByName(name);
        if (course == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(course);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Course course) {
        Result<Course> result = service.add(course);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{courseId}")
    public ResponseEntity<Object> update(@PathVariable int courseId, @RequestBody Course course){
        Result<Course> result = service.update(course);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }
}
