package com.scoretrackr.controllers;

import com.scoretrackr.domain.CourseService;
import com.scoretrackr.domain.HoleService;
import com.scoretrackr.domain.result.Result;
import com.scoretrackr.models.Course;
import com.scoretrackr.models.Hole;
import com.scoretrackr.models.Nine;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/scoretrackr/hole")
public class HoleController {

    private final HoleService service;

    public HoleController(HoleService service) { this.service = service; }

    @GetMapping("/holeId/{holeId}")
    public ResponseEntity<Hole> findByHoleId(@PathVariable int holeId){
        Hole hole = service.findByHoleId(holeId);
        if (hole == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(hole);
    }

    @GetMapping("/nineId/{nineId}")
    public ResponseEntity<List<Hole>> findByNineId(@PathVariable int nineId){
        List<Hole> holes = service.findByNineId(nineId);
        if (holes == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(holes);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Hole hole) {
        Result<Hole> result = service.add(hole);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{holeId}")
    public ResponseEntity<Object> update(@PathVariable int holeId, @RequestBody Hole hole){
        Result<Hole> result = service.update(hole);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }
}
