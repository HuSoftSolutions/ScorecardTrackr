package com.scoretrackr.controllers;

import com.scoretrackr.domain.TeamService;
import com.scoretrackr.domain.result.Result;
import com.scoretrackr.models.Team;
import com.scoretrackr.models.Team;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/scoretrackr/team")
public class TeamController {

    private final TeamService service;

    public TeamController(TeamService service) { this.service = service; }

    @GetMapping("/{teamId}")
    public ResponseEntity<Team> findByTeamId(@PathVariable String teamId){
        Team team = service.findByTeamId(teamId);
        if (team == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(team);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Team team) {
        Result<Team> result = service.add(team);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }
}
