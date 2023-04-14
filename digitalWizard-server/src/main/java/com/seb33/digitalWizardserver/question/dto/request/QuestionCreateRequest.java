package com.seb33.digitalWizardserver.question.dto.request;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class QuestionCreateRequest {
    private String title;
    private String body;
}
