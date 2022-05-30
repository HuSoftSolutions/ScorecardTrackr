package com.scoretrackr.controllers;

import com.scoretrackr.models.User;
import com.scoretrackr.security.JwtConverter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;

@RestController
@ConditionalOnWebApplication
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtConverter converter;
    private final PasswordEncoder encoder;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtConverter converter,
                          PasswordEncoder encoder) {
        this.authenticationManager = authenticationManager;
        this.converter = converter;
        this.encoder = encoder;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<Object> login(@RequestBody HashMap<String, String> credentials,
                                        HttpServletResponse response) {

        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(credentials.get("email"),
                        credentials.get("password"));

        try {
            Authentication authentication = authenticationManager.authenticate(authToken);

            if (authentication.isAuthenticated()) {
                User user = (User) authentication.getPrincipal();
                String jwtToken = converter.getTokenFromUser(user);

                HashMap<String, Object> map = new HashMap<>();
                map.put("jwt", jwtToken);

                return new ResponseEntity<>(map, HttpStatus.OK);
            }

        } catch (AuthenticationException ex) {
            System.out.println(ex);
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PostMapping("/refresh_token")
    public ResponseEntity<Object> refresh(@AuthenticationPrincipal User user,
                                          HttpServletResponse response) {
        String jwtToken = converter.getTokenFromUser(user);

        HashMap<String, Object> map = new HashMap<>();
        map.put("jwt", jwtToken);

        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @PostMapping("/encode")
    public void encode(@RequestBody HashMap<String, String> body) {
        var clearText = body.get("value");
        if (clearText != null) {
            System.out.printf("%n%s%n%n", encoder.encode(clearText));
        }
    }
}

