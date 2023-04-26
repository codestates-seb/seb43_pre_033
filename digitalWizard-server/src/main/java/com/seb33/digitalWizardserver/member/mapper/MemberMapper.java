package com.seb33.digitalWizardserver.member.mapper;

import com.seb33.digitalWizardserver.member.dto.MemberDto;
import com.seb33.digitalWizardserver.member.dto.MemberJoinResponseDto;
import com.seb33.digitalWizardserver.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostToMember(MemberDto.PostMember requestBody);
    Member memberPatchToMember(MemberDto.Patch requestBody);
    MemberJoinResponseDto memberToMemberResponse(Member member);
    List<MemberJoinResponseDto> membersToMemberResponses(List<Member> members);
}

