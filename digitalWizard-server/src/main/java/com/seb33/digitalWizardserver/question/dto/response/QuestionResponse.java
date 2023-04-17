package com.seb33.digitalWizardserver.question.dto.response;

import com.seb33.digitalWizardserver.member.dto.response.CustomMemberResponse;
import com.seb33.digitalWizardserver.question.dto.QuestionDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class QuestionResponse {
    private Long questionId;
    private String title;
    private String body;
    private int vote;
    private int view;
    private int answerCount;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private CustomMemberResponse member;

    public static QuestionResponse from(QuestionDto dto){
        return new QuestionResponse(
                dto.getQuestionId(),
                dto.getTitle(),
                dto.getBody(),
                dto.getVote(),
                dto.getView(),
                dto.getAnswerCount(),
                dto.getCreateAt(),
                dto.getModifiedAt(),
                CustomMemberResponse.from(dto.getMember())
                );
    }
}
