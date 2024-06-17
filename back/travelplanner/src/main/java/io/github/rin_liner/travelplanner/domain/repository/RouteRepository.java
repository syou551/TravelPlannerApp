package io.github.rin_liner.travelplanner.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.rin_liner.travelplanner.domain.model.Route;

public interface RouteRepository extends JpaRepository<Route, Long> {
    List<Route> findByRouteIdIn(List<Long> routeIds);
}
