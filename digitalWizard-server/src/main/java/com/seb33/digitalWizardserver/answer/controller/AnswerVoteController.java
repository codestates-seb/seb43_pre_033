package com.seb33.digitalWizardserver.answer.controller;


import com.seb33.digitalWizardserver.answer.service.AnswerVoteService;
import com.seb33.digitalWizardserver.exception.Response.Response;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/answer")
public class AnswerVoteController {

    private final AnswerVoteService answerVoteService;

    public AnswerVoteController(AnswerVoteService answerVoteService) {
        this.answerVoteService = answerVoteService;
    }

    @PostMapping("/{answerId}/likes")
    public Response<Void> like(@PathVariable Long answerId,
                               Authentication authentication){
        answerVoteService.like(answerId, authentication.getName());
        return Response.success();
    }

    @PostMapping("/{answerId}/hates")
    public Response<Void> hate(@PathVariable Long answerId,
                               Authentication authentication){
        answerVoteService.hate(answerId, authentication.getName());
        return Response.success();
    }
    @GetMapping("/{answerId}/results")
    public Response<Long> resultCount(@PathVariable Long answerId){
        return Response.success(answerVoteService.resultCount(answerId));
    }
}
