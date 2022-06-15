package com.scoretrackr.controllers;

import com.scoretrackr.domain.ScoreService;
import com.scoretrackr.models.Score;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/scoretrackr/score")
public class ScoreController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    private final ScoreService service;

    public ScoreController(ScoreService service) { this.service = service; }

    @GetMapping("/scoreId/{scoreId}")
    public ResponseEntity<Score> findByScoreId(@PathVariable  String scoreId) {
        Score score = service.findByScoreId(scoreId);
        if (score == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(score);
    }

    @GetMapping("/roundId/{roundId}")
    public ResponseEntity<Score> findByRoundId(@PathVariable  String roundId) {
        Score score = service.findByRoundId(roundId);
        if (score == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(score);
    }

    @GetMapping("/userId/{userId}")
    public ResponseEntity<Score> findByUserId(@PathVariable  String userId) {
        Score score = service.findByUserId(userId);
        if (score == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(score);
    }

    @GetMapping("/holeId/{holeId}")
    public ResponseEntity<Score> findByHoleId(@PathVariable  String holeId) {
        Score score = service.findByHoleId(holeId);
        if (score == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(score);
    }

    @MessageMapping("/message")
    @SendTo("score/public")
    public Score receiveScore(@Payload Score score){
        return score;
    }
}
