package com.seb33.digitalWizardserver.answer.controller;

import com.seb33.digitalWizardserver.answer.dto.AnswerDto;
import com.seb33.digitalWizardserver.answer.dto.request.AnswerRequest;
import com.seb33.digitalWizardserver.answer.dto.response.AnswerResponse;
import com.seb33.digitalWizardserver.answer.service.AnswerService;
import com.seb33.digitalWizardserver.exception.Response.Response;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/question")
public class AnswerController {

    private final AnswerService answerService;

    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @Transactional //TODO: 지연로딩
    @GetMapping("{questionId}/answers")
    public Response<Page<AnswerResponse>> getAnswers(Pageable pageable, @PathVariable Long questionId){
        return Response.success(answerService.answerList(questionId, pageable).map(AnswerResponse::from));
    }

    @PostMapping("/{questionId}/answers")
    public Response<Void> answer(@PathVariable Long questionId, @RequestBody AnswerRequest request, Authentication authentication){
        String bodyRemoveTag = Jsoup.clean(request.getBody(), Safelist.none());
        answerService.create(questionId, authentication.getName(), bodyRemoveTag);
        return Response.success();
    }

    @PatchMapping("/{questionId}/answers/{answerId}")
    public Response<AnswerResponse> update(@PathVariable Long questionId,
                                           @PathVariable Long answerId,
                                           @RequestBody AnswerRequest request,
                                           Authentication authentication){
        AnswerDto answerDto = answerService.update(request.getBody(), authentication.getName(),questionId, answerId);
        return Response.success(AnswerResponse.from(answerDto));
    }

    @DeleteMapping("/{questionId}/answers/{answerId}")
    public Response<Void> delete(@PathVariable Long questionId,
                                 @PathVariable Long answerId,
                                 Authentication authentication){
        answerService.delete(authentication.getName(), questionId, answerId);
        return Response.success();
    }
}
