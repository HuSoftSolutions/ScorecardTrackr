package com.scoretrackr.controllers;

import com.scoretrackr.domain.HoleService;
import com.scoretrackr.domain.RoundService;
import com.scoretrackr.domain.result.Result;
import com.scoretrackr.models.Hole;
import com.scoretrackr.models.Round;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/scoretrackr/round")
public class RoundController {

    private final RoundService service;

    public RoundController(RoundService service) { this.service = service; }

    @GetMapping("/{roundId}")
    public ResponseEntity<Round> findByRoundId(@PathVariable int roundId){
        Round round = service.findByRoundId(roundId);
        if (round == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(round);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Round round) {
        Result<Round> result = service.add(round);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{roundId}")
    public ResponseEntity<Object> update(@PathVariable int roundId, @RequestBody Round round){
        Result<Round> result = service.update(round);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }
}
