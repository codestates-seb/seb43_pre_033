package com.seb33.digitalWizardserver.vote.controller;

import com.seb33.digitalWizardserver.exception.Response.Response;
import com.seb33.digitalWizardserver.vote.service.VoteService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("")
public class VoteController {

    private final VoteService voteService;

    public VoteController(VoteService voteService) {
        this.voteService = voteService;
    }

    @PostMapping("/{questionId}/likes")
    public Response<Void> like(@PathVariable Long questionId,
                               Authentication authentication){
        voteService.like(questionId, authentication.getName());
        return Response.success();
    }

    @PostMapping("/{questionId}/hates")
    public Response<Void> hate(@PathVariable Long questionId,
                               Authentication authentication){
        voteService.hate(questionId, authentication.getName());
        return Response.success();
    }
    @GetMapping("/{questionId}/results")
    public Response<Long> resultCount(@PathVariable Long questionId){
        return Response.success(voteService.resultCount(questionId));
    }
}






