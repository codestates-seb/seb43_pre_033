package com.seb33.digitalWizardserver.member.service;

import com.seb33.digitalWizardserver.auth.utils.CustomAuthorityUtils;
import com.seb33.digitalWizardserver.exception.BusinessLogicException;
import com.seb33.digitalWizardserver.exception.ExceptionCode;
import com.seb33.digitalWizardserver.member.entity.Member;
import com.seb33.digitalWizardserver.member.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor // 생성자 땜빵용
@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    private final CustomAuthorityUtils authorityUtils;

    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());

        String encryptedPassword = passwordEncoder.encode(member.getPassword()); // Password 단방향 암호화
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        if (member.getProfileImage() == null || member.getProfileImage().isEmpty()) { // 기본 이미지 등록
            member.setProfileImage("https://avatars.githubusercontent.com/u/120456261?v=4");
        }

        Member savedMember = memberRepository.save(member);

        return savedMember;
    }

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Member updateMember(Member member, String email) {
        Member findMember = findVerifiedMember(member.getMemberId());

        if(!email.equals(findMember.getEmail())){
            throw new BusinessLogicException(ExceptionCode.INVALID_PERMISSION, String.format("유저(%s)가 권한을 가지고 있지 않습니다.", email));
        }

        Optional.ofNullable(member.getMemberNickName())
                .ifPresent(name -> findMember.setMemberNickName(name));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setEmail(password));
        Optional.ofNullable(member.getProfileImage())
                .ifPresent(image -> findMember.setProfileImage(image));
        Optional.ofNullable(member.getLocation())
                .ifPresent(location -> findMember.setLocation(location));
        Optional.ofNullable(member.getTitle())
                .ifPresent(title -> findMember.setTitle(title));
        Optional.ofNullable(member.getAboutMe())
                .ifPresent(aboutMe -> findMember.setAboutMe(aboutMe));
        return memberRepository.save(findMember);
    }

    @Transactional(readOnly = true)
    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    public Page<Member> findMembers(int page, int size) {
        return memberRepository.findAll(PageRequest.of(page, size,
                Sort.by("memberId").descending()));
    }

    public void deleteMember(long memberId, String email) {
        Member findMember = findVerifiedMember(memberId);

        if(!email.equals(findMember.getEmail())){
            throw new BusinessLogicException(ExceptionCode.INVALID_PERMISSION, String.format("유저(%s)가 권한을 가지고 있지 않습니다.", email));
        }

        memberRepository.delete(findMember);
    }

    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }
}
