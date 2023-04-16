package com.seb33.digitalWizardserver.member.dto.response;

import com.seb33.digitalWizardserver.member.dto.CustomMemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CustomMemberResponse {

    private Long memberId;
    private String email;
    private String profileImage;
    private String memberNickName;

    public static CustomMemberResponse from(CustomMemberDto dto){
        return new CustomMemberResponse(
                dto.getMemberId(),
                dto.getEmail(),
                dto.getProfileImage(),
                dto.getMemberNickName()
        );
    }
}
