package com.seb33.digitalWizardserver.answer.dto;

import com.seb33.digitalWizardserver.answer.entity.Answer;
import com.seb33.digitalWizardserver.member.dto.CustomMemberDto;
import com.seb33.digitalWizardserver.question.dto.QuestionDto;
import com.seb33.digitalWizardserver.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class AnswerDto {
    private Long answerId;
    private String body;
    private Long questionId;
    private CustomMemberDto member;
    private LocalDateTime createAt;
    private LocalDateTime modifiedAt;

    public static AnswerDto from(Answer entity){
        return new AnswerDto(
                entity.getAnswerId(),
                entity.getBody(),
                entity.getQuestion().getQuestionId(),
                CustomMemberDto.from(entity.getMember()),
                entity.getCreatedAt(),
                entity.getModifiedAt()
        );
    }
}
