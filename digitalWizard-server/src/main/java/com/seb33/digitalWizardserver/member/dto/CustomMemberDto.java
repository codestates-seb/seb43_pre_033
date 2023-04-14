package com.seb33.digitalWizardserver.member.dto;

import com.seb33.digitalWizardserver.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class CustomMemberDto {

    private Long memberId;
    private String memberName;
    private String memberNickName;
    private String email;
    private String profileImage;
    private String password;
    private String location;
    private String title;
    private String aboutMe;
    private LocalDateTime createAt;
    private LocalDateTime modifiedAt;

    public static CustomMemberDto from(Member entity) {
        return new CustomMemberDto(
                entity.getMemberId(),
                entity.getMemberName(),
                entity.getMemberNickName(),
                entity.getEmail(),
                entity.getProfileImage(),
                entity.getPassword(),
                entity.getLocation(),
                entity.getTitle(),
                entity.getAboutMe(),
                entity.getCreatedAt(),
                entity.getModifiedAt()
        );
    }
}
