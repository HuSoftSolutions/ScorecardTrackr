package com.scoretrackr.controllers;

import com.scoretrackr.domain.ScoringTypeService;
import com.scoretrackr.domain.result.Result;
import com.scoretrackr.models.ScoringType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/scoretrackr/scoringType")
public class ScoringTypeController {

    private final ScoringTypeService service;

    public ScoringTypeController(ScoringTypeService service) { this.service = service; }

    @GetMapping
    public List<ScoringType> findAll() { return service.findAll(); }

    @GetMapping("/{scoringTypeId}")
    public ResponseEntity<ScoringType> findByScoringTypeId(@PathVariable String scoringTypeId){
        ScoringType round = service.findByScoringTypeId(scoringTypeId);
        if (round == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(round);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody ScoringType scoringType) {
        Result<ScoringType> result = service.add(scoringType);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }
}
