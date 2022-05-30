package com.scoretrackr.domain;

import com.scoretrackr.data.user.UserRepository;
import com.scoretrackr.domain.result.Result;
import com.scoretrackr.models.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository repository;
    private final PasswordEncoder encoder;

    public UserService(UserRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    public List<String> findAllRoles() { return repository.findAllRoles(); }

    public User findByUserId(int userId) { return repository.findByUserId(userId); }

    public User findByEmail(String email) { return repository.findByEmail(email); }

    public User findByFirstName(String firstName) { return repository.findByFirstName(firstName); }

    public User findByLastName(String lastName) { return repository.findByLastName(lastName); }

    public Result<User> add(User user) {
        Result<User> result = validateWithoutPassword(user);
        if (!result.isSuccess()) {
            return result;
        }

        result = validatePassword(user);
        if (!result.isSuccess()) {
            return result;
        }

        if (user.getUserId() != 0) {
            result.addErrorMessage("User id cannot be set before user creation.");
            return result;
        }

        user.setPassword(encoder.encode(user.getPassword()));

        user = repository.add(user);
        if (user == null) {
            result.addErrorMessage("user not created.");
        }
        result.setPayload(user);

        return result;
    }

    public Result<User> update(User user) {
        Result<User> result = validateWithoutPassword(user);
        if (!result.isSuccess()) {
            return result;
        }

        boolean success = repository.update(user);
        if (!success) {
            result.addErrorMessage("Could not update User ID: " + user.getUserId());
        }

        return result;
    }

    // THE CHANGE FUNCTIONS BELOW MIGHT NOT BE NEEDED

    public Result<User> changeEmail(User user) {
        Result<User> result = validatePassword(user);
        if (!result.isSuccess()) {
            return result;
        }

        if (user.getUserId() <= 0) {
            result.addErrorMessage("User id must be set to change email.");
            return result;
        }

        user.setEmail(encoder.encode(user.getEmail()));
        boolean success = repository.changeEmail(user);
        if (!success) {
            result.addErrorMessage("Email not updated.");
        }

        return result;
    }

    public Result<User> changePassword(User user) {
        Result<User> result = validatePassword(user);
        if (!result.isSuccess()) {
            return result;
        }

        if (user.getUserId() <= 0) {
            result.addErrorMessage("User id must be set to change password.");
            return result;
        }

        user.setPassword(encoder.encode(user.getPassword()));
        boolean success = repository.changePassword(user);
        if (!success) {
            result.addErrorMessage("Password not updated.");
        }

        return result;
    }

    public Result<User> changeHandicap(User user) {
        Result<User> result = validateWithoutPassword(user);
        if (!result.isSuccess()) {
            return result;
        }

        boolean success = repository.changeHandicap(user);
        if (!success) {
            result.addErrorMessage("Could not change handicap of User ID: "
                    + user.getUserId() + ", Name: " + user.getFirstName());
        }

        return result;
    }

    private Result<User> validateWithoutPassword(User user) {
        var result = new Result<User>();

        if (user == null) {
            result.addErrorMessage("User cannot be null.");
            return result;
        }

        if (user.getEmail() == null || user.getEmail().isBlank()) {
            result.addErrorMessage("Email is required.");
            return result;
        }

        var existing = repository.findByEmail(user.getEmail());
        if (existing != null && existing.getUserId() != user.getUserId()) {
            result.addErrorMessage("This email is already in use.");
            return result;
        }

        return result;
    }

    private Result<User> validatePassword(User user) {

        var result = new Result<User>();

        if (user == null) {
            result.addErrorMessage("User cannot be null.");
            return result;
        }

        if (user.getPassword() == null || user.getPassword().isBlank() || user.getPassword().length() < 8) {
            result.addErrorMessage("Password must be at least 8 characters.");
            return result;
        }

        int digits = 0;
        int letters = 0;
        int others = 0;
        for (char c : user.getPassword().toCharArray()) {
            if (Character.isDigit(c)) {
                digits++;
            } else if (Character.isLetter(c)) {
                letters++;
            } else {
                others++;
            }
        }

        if (digits == 0 || letters == 0 || others == 0) {
            result.addErrorMessage("Password must contain a digit, a letter, and a non-digit/non-letter.");
        }

        return result;
    }
}
