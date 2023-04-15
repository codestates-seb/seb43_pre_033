package com.seb33.digitalWizardserver.answer.controller;

import com.seb33.digitalWizardserver.answer.dto.request.AnswerRequest;
import com.seb33.digitalWizardserver.answer.dto.response.AnswerResponse;
import com.seb33.digitalWizardserver.answer.service.AnswerService;
import com.seb33.digitalWizardserver.exception.Response.Response;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/question")
public class AnswerController {

    private final AnswerService answerService;

    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @GetMapping("{questionId}/answers")
    public Response<Page<AnswerResponse>> getAnswers(Pageable pageable, @PathVariable Long questionId){
        return Response.success(answerService.answerList(questionId, pageable).map(AnswerResponse::from));
    }

    @PostMapping("/{questionId}/answers")
    public Response<Void> answer(@PathVariable Long questionId, @RequestBody AnswerRequest request, Authentication authentication){
        answerService.answer(questionId, authentication.getName(), request.getBody());
        return Response.success();
    }


}
