package io.github.rin_liner.travelplanner.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import io.github.rin_liner.travelplanner.domain.model.RouteDetail;

public interface RouteDetailRepository extends JpaRepository<RouteDetail, Integer> { 
    List<RouteDetail> findByRouteIdOrderByRouteRankAsc(Long routeId);

    @Query("SELECT COALESCE(MAX(rd.routeRank), 0) FROM RouteDetail rd WHERE rd.routeId = :routeId")
    int findMaxRouteRankByRouteId(@Param("routeId") Long routeId);
}
