package com.seb33.digitalWizardserver.question.controller;

import com.seb33.digitalWizardserver.exception.Response.Response;
import com.seb33.digitalWizardserver.question.dto.QuestionDto;
import com.seb33.digitalWizardserver.question.dto.request.QuestionCreateRequest;
import com.seb33.digitalWizardserver.question.dto.request.QuestionUpdateRequest;
import com.seb33.digitalWizardserver.question.dto.response.QuestionResponse;
import com.seb33.digitalWizardserver.question.service.QuestionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/question")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping
    public Response<Void> create(@RequestBody QuestionCreateRequest request,
                                 Authentication authentication){
        questionService.create(request.getTitle(), request.getBody(), authentication.getName());
        return Response.success();
    }

    @PatchMapping("/{questionId}")
    public Response<QuestionResponse> update(@PathVariable Long questionId,
                                             @RequestBody QuestionUpdateRequest request,
                                             Authentication authentication){
        QuestionDto questionDto = questionService.update(request.getTitle(), request.getBody(), authentication.getName(), questionId);
        return Response.success(QuestionResponse.from(questionDto));
    }

    @DeleteMapping("/{questionId}")
    public Response<Void> delete(@PathVariable Long questionId,
                                 Authentication authentication){
        questionService.delete(authentication.getName(), questionId);
        return Response.success();
    }

    @GetMapping("/search")
    public Response<Page<QuestionResponse>> search(@RequestParam String keyword, Pageable pageable){
        return Response.success(questionService.search(keyword, pageable).map(QuestionResponse::from));
    }

    @GetMapping("/{questionId}")
    public Response<QuestionResponse> get(@PathVariable Long questionId) {
        QuestionDto questionDto = questionService.findById(questionId);
        return Response.success(QuestionResponse.from(questionDto));
    }

    @GetMapping
    public Response<Page<QuestionResponse>> list(Pageable pageable){
        return Response.success(questionService.list(pageable).map(QuestionResponse::from));
    }

    @GetMapping("/my")
    public Response<Page<QuestionResponse>> myList(Pageable pageable,
                                                   Authentication authentication){
        return Response.success(questionService.myQuestionList(authentication.getName(), pageable).map(QuestionResponse::from));
    }
}
