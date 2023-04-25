package com.seb33.digitalWizardserver.question.dto;

import com.seb33.digitalWizardserver.member.dto.CustomMemberDto;
import com.seb33.digitalWizardserver.question.entity.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
public class QuestionDto {
    private Long questionId;
    private String title;
    private String body;
    private int vote;
    private int view;
    private int answerCount;
    private List<String> hashtags;
    private List<String> imageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private CustomMemberDto member;

    public static QuestionDto from(Question entity){
        return new QuestionDto(
                entity.getQuestionId(),
                entity.getTitle(),
                entity.getBody(),
                entity.getVotes().stream().mapToInt(Vote::getValue).sum(),
                entity.getView().stream().mapToInt(View::getCount).sum(),
                entity.getAnswers().size(),
                entity.getHashtags().stream().map(Hashtag::getName).collect(Collectors.toList()),
                entity.getImageUrls().stream().map(ImageUrl::getImageUrl).collect(Collectors.toList()),
                entity.getCreatedAt(),
                entity.getModifiedAt(),
                CustomMemberDto.from(entity.getMember())
        );
    }
}
