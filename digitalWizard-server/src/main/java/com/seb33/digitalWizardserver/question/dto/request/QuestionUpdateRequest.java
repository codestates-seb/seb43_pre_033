package com.seb33.digitalWizardserver.question.dto.request;

import lombok.Getter;

@Getter
public class QuestionUpdateRequest {
    private String title;
    private String body;
    private String tags;
}
