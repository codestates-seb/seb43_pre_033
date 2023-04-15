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
    private CustomMemberResponse member;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;


    public static AnswerResponse from(AnswerDto dto){
        return new AnswerResponse(
                dto.getAnswerId(),
                dto.getBody(),
                CustomMemberResponse.from(dto.getMember()),
                dto.getCreateAt(),
                dto.getModifiedAt()
        );
    }
}
