package io.github.rin_liner.travelplanner.infrastructure.persistence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.github.rin_liner.travelplanner.domain.model.RouteDetail;
import io.github.rin_liner.travelplanner.domain.repository.RouteDetailRepository;
import io.github.rin_liner.travelplanner.domain.service.RouteDetailService;

@Service
public class RouteDetailServiceImpl implements RouteDetailService {
    @Autowired
    private RouteDetailRepository routeDetailRepository;

    @Override
    public RouteDetail addPlaceToRoute(RouteDetail routeDetail) {
        if (routeDetail.getPlaceId() == null || routeDetail.getPlaceId().isEmpty()) {
            throw new IllegalArgumentException("Place ID must be provided");
        }
        int maxRouteRank = routeDetailRepository.findMaxRouteRankByRouteId(routeDetail.getRouteId());
        routeDetail.setRouteRank(maxRouteRank + 1);
        return routeDetailRepository.save(routeDetail);
    }
}
