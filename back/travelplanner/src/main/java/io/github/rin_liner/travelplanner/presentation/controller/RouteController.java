package io.github.rin_liner.travelplanner.presentation.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.github.rin_liner.travelplanner.domain.model.Route;
import io.github.rin_liner.travelplanner.domain.model.RouteDetail;
import io.github.rin_liner.travelplanner.domain.service.RouteService;

@RestController
@RequestMapping("/api/routes")
public class RouteController {
    @Autowired
    private RouteService routeService;

    @PostMapping
    public ResponseEntity<Route> createRoute(@RequestBody RouteRequest routeRequest) {
        Route route = new Route();
        route.setRouteName(routeRequest.getRouteName());
        Route savedRoute = routeService.saveRoute(route, routeRequest.getUserId(), routeRequest.getMemberId());
        return ResponseEntity.ok(savedRoute);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<RouteDetail>> getRouteDetails(@PathVariable Long id) {
      //お前ほんまにLongでええんか?RouteServiceImplやらRouteRepositoryも
        return ResponseEntity.ok(routeService.getRouteDetails(id));
    }

    // テスト用エンドポイント
    @GetMapping("/query")
    public ResponseEntity<List<RouteDetail>> getRouteDetailsByRouteId(@RequestParam Long routeId) {
        List<RouteDetail> routeDetails = routeService.getRouteDetailsByRouteId(routeId);
        return ResponseEntity.ok(routeDetails);
    }
}
