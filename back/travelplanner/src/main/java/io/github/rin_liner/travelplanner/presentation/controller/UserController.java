package io.github.rin_liner.travelplanner.presentation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.rin_liner.travelplanner.domain.dto.UserDTO;
import io.github.rin_liner.travelplanner.domain.model.User;
import io.github.rin_liner.travelplanner.domain.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable String id) {
        return userService.getUserWithRoutes(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    // テスト用エンドポイント
    /*    @GetMapping("/query")
    public ResponseEntity<List<User>> getUserRoutes(@RequestParam String userId) {
        // 実際のロジックに応じてこの部分を実装します。
        // ユーザーに関連するルートを取得するためのサービスメソッドを呼び出す
        List<User> userRoutes = userService.getUserRoutes(userId);
        return ResponseEntity.ok(userRoutes);
    }*/
}
