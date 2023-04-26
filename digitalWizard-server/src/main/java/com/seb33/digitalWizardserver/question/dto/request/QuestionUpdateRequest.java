package com.seb33.digitalWizardserver.question.dto.request;

import lombok.Getter;

import java.util.List;

@Getter
public class QuestionUpdateRequest {
    private String title;
    private String body;
    private List<String> tags;
}
