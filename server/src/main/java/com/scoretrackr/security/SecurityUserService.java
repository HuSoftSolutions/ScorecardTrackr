package com.scoretrackr.security;

import com.scoretrackr.data.user.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class SecurityUserService implements UserDetailsService {

    private final UserRepository userRepository;

    public SecurityUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String emailThatShouldBeAUsername) throws UsernameNotFoundException {
        var user = userRepository.findByEmail(emailThatShouldBeAUsername);

        if (user == null || !user.isEnabled()) {
            throw new UsernameNotFoundException("email " + emailThatShouldBeAUsername + " not found.");
        }

        return user;
    }
}
