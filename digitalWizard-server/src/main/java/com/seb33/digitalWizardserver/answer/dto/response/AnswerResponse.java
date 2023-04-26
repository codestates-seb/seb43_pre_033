package com.seb33.digitalWizardserver.answer.dto.response;

import com.seb33.digitalWizardserver.answer.dto.AnswerDto;
import com.seb33.digitalWizardserver.member.dto.response.CustomMemberResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class AnswerResponse {
    private Long answerId;
    private String body;
    private int vote;
    private boolean isAccepted;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private CustomMemberResponse member;


    public static AnswerResponse from(AnswerDto dto){
        return new AnswerResponse(
                dto.getAnswerId(),
                dto.getBody(),
                dto.getVote(),
                dto.isAccepted(),
                dto.getCreateAt(),
                dto.getModifiedAt(),
                CustomMemberResponse.from(dto.getMember()));
    }
}
