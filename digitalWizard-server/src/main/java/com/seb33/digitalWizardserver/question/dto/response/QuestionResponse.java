package com.seb33.digitalWizardserver.question.dto.response;

import com.seb33.digitalWizardserver.member.dto.response.CustomMemberResponse;
import com.seb33.digitalWizardserver.question.dto.QuestionDto;
import com.seb33.digitalWizardserver.question.entity.Hashtag;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Getter
public class QuestionResponse {
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
    private CustomMemberResponse member;

    public static QuestionResponse from(QuestionDto dto){
        return new QuestionResponse(
                dto.getQuestionId(),
                dto.getTitle(),
                dto.getBody(),
                dto.getVote(),
                dto.getView(),
                dto.getAnswerCount(),
                dto.getHashtags(),
                dto.getImageUrl(),
                dto.getCreatedAt(),
                dto.getModifiedAt(),
                CustomMemberResponse.from(dto.getMember()));
    }
}
