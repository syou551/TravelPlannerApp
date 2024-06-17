package io.github.rin_liner.travelplanner.infrastructure.persistence;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.github.rin_liner.travelplanner.domain.model.Member;
import io.github.rin_liner.travelplanner.domain.model.Route;
import io.github.rin_liner.travelplanner.domain.model.RouteDetail;
import io.github.rin_liner.travelplanner.domain.repository.MemberRepository;
import io.github.rin_liner.travelplanner.domain.repository.RouteDetailRepository;
import io.github.rin_liner.travelplanner.domain.repository.RouteRepository;
import io.github.rin_liner.travelplanner.domain.service.RouteService;

@Service
public class RouteServiceImpl implements RouteService {
    @Autowired
    private RouteRepository routeRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private RouteDetailRepository routeDetailRepository;

    @Override
    public Route saveRoute(Route route, String userId, String memberId) {
        Route savedRoute = routeRepository.save(route);
        Member member = new Member();
        member.setRouteId(savedRoute.getRouteId());
        member.setUserId(userId);
        member.setMemberId(memberId);
        memberRepository.save(member);
        return savedRoute;
    }

    @Override
    public List<RouteDetail> getRouteDetails(Long routeId) {
        return routeDetailRepository.findByRouteIdOrderByRouteRankAsc(routeId);
    }
    // テスト用関数
    @Override
    public List<RouteDetail> getRouteDetailsByRouteId(Long routeId) {
        return routeDetailRepository.findByRouteIdOrderByRouteRankAsc(routeId);
    }
}
