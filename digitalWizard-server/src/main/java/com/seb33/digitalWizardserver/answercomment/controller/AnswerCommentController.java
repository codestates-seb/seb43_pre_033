package com.seb33.digitalWizardserver.answercomment.controller;

import com.seb33.digitalWizardserver.answercomment.dto.AnswerCommentDto;
import com.seb33.digitalWizardserver.answercomment.dto.request.AnswerCommentRequest;
import com.seb33.digitalWizardserver.answercomment.dto.response.AnswerCommentResponse;
import com.seb33.digitalWizardserver.answercomment.service.AnswerCommentService;
import com.seb33.digitalWizardserver.exception.Response.Response;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/answer")
public class AnswerCommentController {
    private final AnswerCommentService answerCommentService;

    public AnswerCommentController(AnswerCommentService answerCommentService) {
        this.answerCommentService = answerCommentService;
    }

    @Transactional
    @GetMapping("{answerId}/comments")
    public Response<Page<AnswerCommentResponse>> getComments(Pageable pageable, @PathVariable Long answerId){
        return Response.success(answerCommentService.commentList(answerId, pageable).map(AnswerCommentResponse::from));
    }

    @PostMapping("/{answerId}/comments")
    public Response<Void> comment(@PathVariable Long answerId, @RequestBody AnswerCommentRequest request, Authentication authentication){
        String bodyRemoveTag = Jsoup.clean(request.getBody(), Safelist.none());
        answerCommentService.create(answerId, authentication.getName(), bodyRemoveTag);
        return Response.success();
    }

    @PatchMapping("/{answerId}/comments/{commentId}")
    public Response<AnswerCommentResponse> update(@PathVariable Long answerId,
                                                  @PathVariable Long commentId,
                                                  @RequestBody AnswerCommentRequest request,
                                                  Authentication authentication){
        AnswerCommentDto answerCommentDto = answerCommentService.update(request.getBody(), authentication.getName(), answerId, commentId);
        return Response.success(AnswerCommentResponse.from(answerCommentDto));
    }

    @DeleteMapping("/{answerId}/comments/{commentId}")
    public Response<Void> delete(@PathVariable Long answerId,
                                 @PathVariable Long commentId,
                                 Authentication authentication){
        answerCommentService.delete(authentication.getName(), answerId, commentId);
        return Response.success();
    }
}