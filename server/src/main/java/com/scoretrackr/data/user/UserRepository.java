package com.scoretrackr.data.user;

import com.scoretrackr.models.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    public List<String> findAllRoles() {
        return jdbcTemplate.query("select * from `role`;",
                (rs, i) -> rs.getString("name"));
    }

    public User findByUserId(int userId) {
        User user = jdbcTemplate.query("select * from user where user_id = ?;", new UserMapper(), userId)
                .stream().findFirst().orElse(null);

        if (user != null) {
            var authorities = getAuthorities(user.getUserId());
            user.setAuthorityNames(authorities);
        }
        return user;
    }

    public User findByEmail(String email) {
        User user = jdbcTemplate.query("select * from user where email = ?;", new UserMapper(), email)
                .stream().findFirst().orElse(null);

        if (user != null) {
            var authorities = getAuthorities(user.getUserId());
            user.setAuthorityNames(authorities);
        }
        return user;
    }

    public User findByFirstName(String firstName) {
        User user = jdbcTemplate.query("select * from user where first_name = ?;", new UserMapper(), firstName)
                .stream().findFirst().orElse(null);

        if (user != null) {
            var authorities = getAuthorities(user.getUserId());
            user.setAuthorityNames(authorities);
        }
        return user;
    }

    public User findByLastName(String lastName) {
        User user = jdbcTemplate.query("select * from user where last_name = ?;", new UserMapper(), lastName)
                .stream().findFirst().orElse(null);

        if (user != null) {
            var authorities = getAuthorities(user.getUserId());
            user.setAuthorityNames(authorities);
        }
        return user;
    }

    public User add(User user) {
        final String sql = "insert into user (email, password_hash, first_name, last_name, handicap) "
                + "values (?, ?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, user.getEmail());
            statement.setString(2, user.getPassword());
            statement.setString(3, user.getFirstName());
            statement.setString(4, user.getLastName());
            statement.setInt(5, user.getHandicap());
            return statement;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        user.setUserId(keyHolder.getKey().intValue());

        final String sqlRoleInsert = "insert into user_role (user_id, role_id) "
                + "values (" + user.getUserId() + ", 1);";

        jdbcTemplate.update(sqlRoleInsert);

        return user;
    }

    public boolean update(User user) {
        final String sql = "update user set "
                + "email = ?, "
                + "password_hash = ?, "
                + "first_name = ?, "
                + "last_name = ?, "
                + "handicap = ? "
                + "where user_id = ?;";

        int rowsAffected = jdbcTemplate.update(sql,
                user.getEmail(),
                user.getPassword(),
                user.getFirstName(),
                user.getLastName(),
                user.getHandicap(),
                user.getUserId());

        return rowsAffected > 0;
    }

    // THE CHANGE FUNCTIONS BELOW MIGHT NOT BE NEEDED

    public boolean changeEmail(User user) {
        final String sql = "update user set email = ? where user_id = ?;";

        int rowsAffected = jdbcTemplate.update(sql, user.getEmail(), user.getUserId());

        if (rowsAffected > 0) {
            setAuthorities(user);
            return true;
        }

        return false;
    }

    public boolean changePassword(User user) {
        final String sql = "update user set password_hash = ? where user_id = ?;";

        int rowsAffected = jdbcTemplate.update(sql, user.getPassword(), user.getUserId());

        if (rowsAffected > 0) {
            setAuthorities(user);
            return true;
        }

        return false;
    }

    public boolean changeHandicap(User user) {
        String sql = "update user set handicap = ? where user_id = ?;";

        int rowsAffected = jdbcTemplate.update(sql, user.getHandicap(), user.getUserId());

        if (rowsAffected > 0) {
            setAuthorities(user);
            return true;
        }

        return false;
    }

    private void setAuthorities(User user) {
        jdbcTemplate.update("delete from user_role where user_id = ?;", user.getUserId());

        for (var name : user.getAuthorityNames()) {
            String sql = "insert into user_role (user_id, role_id) "
                    + "values (?, (select role_id from `role` where `name` = ?));";
            jdbcTemplate.update(sql, user.getUserId(), name);
        }
    }

    private List<String> getAuthorities(int userId) {
        String sql = "select r.role_id, r.`name` "
                + "from user_role ur "
                + "inner join role r on ur.role_id = r.role_id "
                + "where ur.user_id = ?";

        return jdbcTemplate.query(sql,
                (rs, i) -> rs.getString("name"),
                userId);
    }

}
