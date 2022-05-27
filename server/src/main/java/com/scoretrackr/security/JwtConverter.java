package com.scoretrackr.security;

import com.scoretrackr.models.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtConverter {

    private Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final String ISSUER = "scoretrackr";
    private final int EXPIRATION_MINUTES = 15;
    private final int EXPIRATION_MILLIS = EXPIRATION_MINUTES * 60 * 1000;

    public String getTokenFromUser(User user) {

        return Jwts.builder()
                .setIssuer(ISSUER)
                .setSubject(user.getEmail())
                .claim("id", user.getUserId())
                .claim("authorities", String.join(",", user.getAuthorityNames()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MILLIS))
                .signWith(key)
                .compact();
    }

    public User getUserFromToken(String token) {

        if (token == null) {
            return null;
        }

        try {
            Jws<Claims> jws = Jwts.parserBuilder()
                    .requireIssuer(ISSUER)
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);

            User user = new User();

            user.setEmail(jws.getBody().getSubject());
            user.setUserId(jws.getBody().get("id", Integer.class));

            String authStr = jws.getBody().get("authorities", String.class);
            List<String> authorities = Arrays.stream(authStr.split(","))
                    .filter(a -> a != null && a.trim().length() != 0)
                    .collect(Collectors.toList());
            user.setAuthorityNames(authorities);

            return user;

        } catch (JwtException e) {
            System.out.println(e);
        }

        return null;
    }
}
