package io.github.rin_liner.travelplanner.domain.service;

import java.util.List;

import io.github.rin_liner.travelplanner.domain.model.Route;
import io.github.rin_liner.travelplanner.domain.model.RouteDetail;

public interface RouteService {
    Route saveRoute(Route route, String userId, String memberId);
    List<RouteDetail> getRouteDetails(Long routeId);

 // テスト用関数
    List<RouteDetail> getRouteDetailsByRouteId(Long routeId);
}
