package io.github.rin_liner.travelplanner.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import io.github.rin_liner.travelplanner.domain.model.Member;

public interface MemberRepository extends JpaRepository<Member, String> {
    @Query("SELECT m.routeId FROM Member m WHERE m.userId = :userId")
    List<Long> findRouteIdsByUserId(@Param("userId") String userId);
}
