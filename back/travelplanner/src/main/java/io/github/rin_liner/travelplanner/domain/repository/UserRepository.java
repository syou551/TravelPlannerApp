package io.github.rin_liner.travelplanner.domain.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.rin_liner.travelplanner.domain.model.User;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findById(String userId);

    /*    // カスタムクエリを追加してユーザーのルートを取得
    @Query("SELECT u FROM User u JOIN Member m ON u.userId = m.userId WHERE m.routeId = :routeId")
    List<User> findUserRoutes(@Param("userID") String userId);*/
}
