package com.seb33.digitalWizardserver.answercomment.dto;

import com.seb33.digitalWizardserver.answercomment.entity.AnswerComment;
import com.seb33.digitalWizardserver.member.dto.CustomMemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class AnswerCommentDto {

    private Long answerCommentId;
    private String body;
    private Long answerId;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private CustomMemberDto member;



    public static AnswerCommentDto from(AnswerComment entity) {
        return new AnswerCommentDto(
                entity.getAnswerCommentId(),
                entity.getBody(),
                entity.getAnswer().getAnswerId(),
                entity.getAnswer().getCreatedAt(),
                entity.getMember().getModifiedAt(),
                CustomMemberDto.from(entity.getMember())
        );
    }
}