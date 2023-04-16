package com.seb33.digitalWizardserver.question.dto;

import com.seb33.digitalWizardserver.member.dto.CustomMemberDto;
import com.seb33.digitalWizardserver.question.entity.Question;
import com.seb33.digitalWizardserver.vote.entity.Vote;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class QuestionDto {
    private Long questionId;
    private String title;
    private String body;
    private int vote;
    private CustomMemberDto member;
    private LocalDateTime createAt;
    private LocalDateTime modifiedAt;

    public static QuestionDto from(Question entity){
        return new QuestionDto(
                entity.getQuestionId(),
                entity.getTitle(),
                entity.getBody(),
                entity.getVotes().stream().mapToInt(Vote::getValue).sum(),
                CustomMemberDto.from(entity.getMember()),
                entity.getCreatedAt(),
                entity.getModifiedAt()
        );
    }
}
