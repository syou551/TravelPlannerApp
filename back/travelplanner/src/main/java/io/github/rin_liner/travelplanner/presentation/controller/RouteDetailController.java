package io.github.rin_liner.travelplanner.presentation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.rin_liner.travelplanner.domain.model.RouteDetail;
import io.github.rin_liner.travelplanner.domain.service.RouteDetailService;

@RestController
@RequestMapping("/api/route-details")
public class RouteDetailController {
    @Autowired
    private RouteDetailService routeDetailService;

    @PostMapping
    public ResponseEntity<RouteDetail> addPlaceToRoute(@RequestBody RouteDetail routeDetail) {
        RouteDetail savedRouteDetail = routeDetailService.addPlaceToRoute(routeDetail);
        return ResponseEntity.ok(savedRouteDetail);
    }
}