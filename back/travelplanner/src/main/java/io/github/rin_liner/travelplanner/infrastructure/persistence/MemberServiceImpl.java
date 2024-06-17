package io.github.rin_liner.travelplanner.infrastructure.persistence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.github.rin_liner.travelplanner.domain.model.Member;
import io.github.rin_liner.travelplanner.domain.repository.MemberRepository;
import io.github.rin_liner.travelplanner.domain.service.MemberService;

@Service
public class MemberServiceImpl implements MemberService {
    @Autowired
    private MemberRepository memberRepository;

    @Override
    public Member saveMember(Member member) {
        return memberRepository.save(member);
    }
}
