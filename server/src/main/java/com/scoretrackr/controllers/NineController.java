package com.scoretrackr.controllers;

import com.scoretrackr.domain.HoleService;
import com.scoretrackr.domain.NineService;
import com.scoretrackr.domain.result.Result;
import com.scoretrackr.models.Hole;
import com.scoretrackr.models.Nine;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/scoretrackr/nine")
public class NineController {

    private final NineService service;

    public NineController(NineService service) { this.service = service; }

    @GetMapping("/nineId/{nineId}")
    public ResponseEntity<Nine> findByNineId(@PathVariable int nineId){
        Nine nine = service.findByNineId(nineId);
        if (nine == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(nine);
    }

    @GetMapping("/courseId/{courseId}")
    public ResponseEntity<List<Nine>> findByCourseId(@PathVariable int courseId){
        List<Nine> nines = service.findByCourseId(courseId);
        if (nines == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(nines);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Nine nine) {
        Result<Nine> result = service.add(nine);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }
}
