package com.scoretrackr.controllers;

import com.scoretrackr.domain.MatchTypeService;
import com.scoretrackr.domain.result.Result;
import com.scoretrackr.models.MatchType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/scoretrackr/type")
public class MatchTypeController {

    private final MatchTypeService service;

    public MatchTypeController(MatchTypeService service) { this.service = service; }

    @GetMapping
    public List<MatchType> findAll() { return service.findAll(); }

    @GetMapping("/{matchTypeId}")
    public ResponseEntity<MatchType> findByMatchTypeId(@PathVariable String matchTypeId){
        MatchType round = service.findByMatchTypeId(matchTypeId);
        if (round == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(round);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody MatchType matchType) {
        Result<MatchType> result = service.add(matchType);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }
}

