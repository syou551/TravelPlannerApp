package io.github.rin_liner.travelplanner.domain.service;

import java.util.Optional;

import io.github.rin_liner.travelplanner.domain.dto.UserDTO;
import io.github.rin_liner.travelplanner.domain.model.User;

public interface UserService {
    User saveUser(User user);
    Optional<User> getUserById(String userId);
    Optional<UserDTO> getUserWithRoutes(String userId);

    /*    // テスト用関数
    List<User> getUserRoutes(String userId);*/
}
