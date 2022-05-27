package com.scoretrackr.controllers;

import com.scoretrackr.domain.RoundService;
import com.scoretrackr.domain.RoundTypeService;
import com.scoretrackr.domain.result.Result;
import com.scoretrackr.models.Course;
import com.scoretrackr.models.Round;
import com.scoretrackr.models.RoundType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/scoretrackr/roundtype")
public class RoundTypeController {

    private final RoundTypeService service;

    public RoundTypeController(RoundTypeService service) { this.service = service; }

    @GetMapping
    public List<RoundType> findAll() { return service.findAll(); }

    @GetMapping("/{roundTypeId}")
    public ResponseEntity<RoundType> findByRoundTypeId(@PathVariable int roundTypeId){
        RoundType round = service.findByRoundTypeId(roundTypeId);
        if (round == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(round);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody RoundType roundType) {
        Result<RoundType> result = service.add(roundType);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }
}
