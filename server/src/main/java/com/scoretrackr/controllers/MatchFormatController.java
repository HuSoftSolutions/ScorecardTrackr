package com.scoretrackr.controllers;

import com.scoretrackr.domain.MatchFormatService;
import com.scoretrackr.domain.result.Result;
import com.scoretrackr.models.MatchFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/scoretrackr/mFormat")
public class MatchFormatController {

    private final MatchFormatService service;

    public MatchFormatController(MatchFormatService service) { this.service = service; }

    @GetMapping
    public List<MatchFormat> findAll() { return service.findAll(); }

    @GetMapping("/{mFormatId}")
    public ResponseEntity<MatchFormat> findByMatchFormatId(@PathVariable String mFormatId){
        MatchFormat round = service.findByMatchFormatId(mFormatId);
        if (round == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(round);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody MatchFormat matchFormat) {
        Result<MatchFormat> result = service.add(matchFormat);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }
}
