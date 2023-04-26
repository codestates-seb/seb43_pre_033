package com.seb33.digitalWizardserver.answercomment.dto.response;

import com.seb33.digitalWizardserver.answercomment.dto.AnswerCommentDto;
import com.seb33.digitalWizardserver.member.dto.response.CustomMemberResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class AnswerCommentResponse {

    private Long answerCommentId;
    private String body;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private CustomMemberResponse  member;

    public static AnswerCommentResponse from(AnswerCommentDto dto){
        return new AnswerCommentResponse(
                dto.getAnswerId(),
                dto.getBody(),
                dto.getCreatedAt(),
                dto.getModifiedAt(),
                CustomMemberResponse.from(dto.getMember()));
    }
}