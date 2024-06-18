package io.github.rin_liner.travelplanner.infrastructure.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.github.rin_liner.travelplanner.domain.dto.UserDTO;
import io.github.rin_liner.travelplanner.domain.model.Route;
import io.github.rin_liner.travelplanner.domain.model.User;
import io.github.rin_liner.travelplanner.domain.repository.MemberRepository;
import io.github.rin_liner.travelplanner.domain.repository.RouteRepository;
import io.github.rin_liner.travelplanner.domain.repository.UserRepository;
import io.github.rin_liner.travelplanner.domain.service.UserService;
import jakarta.persistence.EntityNotFoundException;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private RouteRepository routeRepository;

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<User> getUserById(String userId) {
        return userRepository.findById(userId);
    }

    @Override
    public Optional<UserDTO> getUserWithRoutes(String userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            List<Long> routeIds = memberRepository.findRouteIdsByUserId(userId);
            List<Route> routes = routeRepository.findByRouteIdIn(routeIds);
            User user = userOpt.get();
            UserDTO userDTO = new UserDTO(user.getUserId(), user.getUserName(), user.getAddr(), user.getTimesId(), routes);
            return Optional.of(userDTO);
        } else {
            throw new EntityNotFoundException("User not found with id: " + userId);
        }
    }
 // テスト用関数
 /*    @Override
 public List<User> getUserRoutes(String userId) {
     // 実際のロジックに応じてこの部分を実装します。
     // ユーザーに関連するルートを取得するためのロジックを実装
     return userRepository.findUserRoutes(userId);
 }*/
}