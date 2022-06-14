package com.scoretrackr.controllers;

import com.scoretrackr.domain.MatchService;
import com.scoretrackr.domain.result.Result;
import com.scoretrackr.models.Match;
import com.scoretrackr.models.Match;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/scoretrackr/match")
public class MatchController {

    private final MatchService service;

    public MatchController(MatchService service) { this.service = service; }

    @GetMapping("/{matchId}")
    public ResponseEntity<Match> findByMatchId(@PathVariable String matchId){
        Match match = service.findByMatchId(matchId);
        if (match == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(match);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Match match) {
        Result<Match> result = service.add(match);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{matchId}")
    public ResponseEntity<Void> deleteByMatchId(@PathVariable String matchId) {
        boolean success = service.deleteByMatchId(matchId);
        if (success) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
