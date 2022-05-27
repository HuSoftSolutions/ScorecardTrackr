package com.scoretrackr.controllers;

import com.scoretrackr.domain.UserService;
import com.scoretrackr.models.User;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@ConditionalOnWebApplication
public class UserController {

    private final UserService service;

    public UserController(UserService service) { this.service = service; }

    @GetMapping("/user/role")
    public List<String> findAllRoles() { return service.findAllRoles(); }

    @GetMapping("/user/{userId}")
    public User findByUserId(@PathVariable int userId) { return service.findByUserId(userId); }

    @GetMapping("/user/{email}")
    public User findByEmail(@PathVariable String email) { return service.findByEmail(email); }

    @GetMapping("/user/{firstName}")
    public User findByFirstName(@PathVariable String firstName) { return service.findByFirstName(firstName); }

    @GetMapping("/user/{lastName}")
    public User findByLastName(@PathVariable String lastName) { return service.findByLastName(lastName); }

    @PostMapping("/user/create")
    public ResponseEntity<Object> create(@RequestBody User user) {
        var result = service.add(user);
        if (!result.isSuccess()) {
            return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/user/email")
    public ResponseEntity<Object> changeEmail(
            @RequestBody HashMap<String, String> values, @AuthenticationPrincipal User principal) {

        // can only update our own email, never someone else's
        principal.setEmail(values.get("email"));

        var result = service.changeEmail(principal);
        if (!result.isSuccess()) {
            return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/user/password")
    public ResponseEntity<Object> changePassword(
            @RequestBody HashMap<String, String> values, @AuthenticationPrincipal User principal) {

        // can only update our own password, never someone else's
        principal.setPassword(values.get("password"));

        var result = service.changePassword(principal);
        if (!result.isSuccess()) {
            return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/user/handicap")
    public ResponseEntity<Object> changeHandicap(
            @RequestBody HashMap<String, String> values, @AuthenticationPrincipal User principal) {

        // can only update our own handicap, never someone else's
        principal.setHandicap(Integer.parseInt(values.get("handicap")));

        var result = service.changeHandicap(principal);
        if (!result.isSuccess()) {
            return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
