package com.seb33.digitalWizardserver.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;

public class MemberDto {
    @Getter
    @AllArgsConstructor
    public static class PostMember{
        @Email
        private String email;
        private String password;
        private String memberNickName;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long memberId;
        private String nickName;

        private String password; // 비번 변경 요청시 비밀번호 입력하도록 나중에 기능 추가

        public void setMemberId(long memberId) {
            this.memberId = memberId;
        }
    }
}
