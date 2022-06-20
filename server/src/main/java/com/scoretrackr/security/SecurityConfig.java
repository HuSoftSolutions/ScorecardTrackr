package com.scoretrackr.security;

import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@EnableWebSecurity
@ConditionalOnWebApplication
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtConverter converter;

    public SecurityConfig(JwtConverter converter) {
        this.converter = converter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable();
        http.cors();

        http.authorizeRequests()
                .antMatchers(HttpMethod.GET, "/health_check").permitAll()
                .antMatchers(HttpMethod.POST, "/authenticate", "/encode", "/user/create").permitAll()
                .antMatchers(HttpMethod.POST, "/refresh_token").authenticated()
                .antMatchers(HttpMethod.GET, "/user/role").permitAll()
                .antMatchers(HttpMethod.GET, "/user/{userId}").permitAll()
                .antMatchers(HttpMethod.GET, "/user/email/{email}").permitAll()
                .antMatchers(HttpMethod.GET, "/user/firstName/{firstName}").permitAll()
                .antMatchers(HttpMethod.GET, "/user/lastName/{lastName}").permitAll()
                .antMatchers(HttpMethod.PUT, "/user/{userId}").authenticated()
                .antMatchers(HttpMethod.GET, "/scoretrackr/course").permitAll()
                .antMatchers(HttpMethod.GET, "/scoretrackr/course/{courseId}").permitAll()
                .antMatchers(HttpMethod.GET, "/scoretrackr/course/name/{name}").permitAll()
                .antMatchers(HttpMethod.POST, "/scoretrackr/course").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.PUT, "/scoretrackr/course/{courseId}").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.GET, "/scoretrackr/hole/holeId/{holeId}").permitAll()
                .antMatchers(HttpMethod.GET, "/scoretrackr/hole/nineId/{nineId}").permitAll()
                .antMatchers(HttpMethod.POST, "/scoretrackr/hole").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.PUT, "/scoretrackr/hole/{holeId}").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.GET, "/scoretrackr/match/{matchId}").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/scoretrackr/match").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/scoretrackr/match/{matchId}").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/scoretrackr/matchFormat").permitAll()
                .antMatchers(HttpMethod.GET, "/scoretrackr/matchFormat/{matchFormatId}").permitAll()
                .antMatchers(HttpMethod.POST, "/scoretrackr/matchFormat").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.GET, "/scoretrackr/matchType").permitAll()
                .antMatchers(HttpMethod.GET, "/scoretrackr/matchType/{matchTypeId}").permitAll()
                .antMatchers(HttpMethod.POST, "/scoretrackr/matchType").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.GET, "/scoretrackr/scoringType").permitAll()
                .antMatchers(HttpMethod.GET, "/scoretrackr/scoringType/{scoringTypeId}").permitAll()
                .antMatchers(HttpMethod.POST, "/scoretrackr/scoringType").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.GET, "/scoretrackr/team/{teamId}").permitAll()
                .antMatchers(HttpMethod.POST, "/scoretrackr/team").hasAnyAuthority("USER")
                .antMatchers(HttpMethod.GET, "/scoretrackr/nine/nineId/{nineId}").permitAll()
                .antMatchers(HttpMethod.GET, "/scoretrackr/nine/courseId/{courseId}").permitAll()
                .antMatchers(HttpMethod.POST, "/scoretrackr/nine").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.GET, "/scoretrackr/round/{roundId}").permitAll()
                .antMatchers(HttpMethod.POST, "/scoretrackr/round").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.PUT, "/scoretrackr/round/{roundId}").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/scoretrackr/roundtype").permitAll()
                .antMatchers(HttpMethod.GET, "/scoretrackr/roundtype/{roundTypeId}").permitAll()
                .antMatchers(HttpMethod.POST, "/scoretrackr/roundtype").hasAnyAuthority("ADMIN")
                .antMatchers("/**").denyAll()
                .and()
                .addFilter(new JwtRequestFilter(authenticationManager(), converter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

}
