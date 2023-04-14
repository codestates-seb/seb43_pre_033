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
    private CustomMemberResponse member;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static QuestionResponse from(QuestionDto dto){
        return new QuestionResponse(
                dto.getQuestionId(),
                dto.getTitle(),
                dto.getBody(),
                CustomMemberResponse.from(dto.getMember()),
                dto.getCreateAt(),
                dto.getModifiedAt()
        );
    }
}
