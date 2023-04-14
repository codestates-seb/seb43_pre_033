package com.seb33.digitalWizardserver.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class MemberJoinResponseDto {
    private long memberId;
    private String email;
    private String memberNickName;
}
