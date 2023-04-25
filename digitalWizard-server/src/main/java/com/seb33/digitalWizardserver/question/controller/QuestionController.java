package com.seb33.digitalWizardserver.question.controller;

import com.seb33.digitalWizardserver.exception.Response.Response;
import com.seb33.digitalWizardserver.question.dto.QuestionDto;
import com.seb33.digitalWizardserver.question.dto.request.QuestionCreateRequest;
import com.seb33.digitalWizardserver.question.dto.request.QuestionUpdateRequest;
import com.seb33.digitalWizardserver.question.dto.response.QuestionResponse;
import com.seb33.digitalWizardserver.question.service.QuestionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/question")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping
    public Response<Void> create(@RequestBody QuestionCreateRequest request,
                                 Authentication authentication) throws IOException {
        String title = request.getTitle();
        String body = request.getBody();
        List<String> tags = request.getTags();
        questionService.create(title, body, tags, authentication.getName());
        return Response.success();
    }

    @PatchMapping("/{questionId}")
    public Response<QuestionResponse> update(@PathVariable Long questionId,
                                             @RequestBody QuestionUpdateRequest request,
                                             Authentication authentication) throws IOException {
        QuestionDto questionDto = questionService.update(request.getTitle(), request.getBody(), request.getTags(), authentication.getName(), questionId);
        return Response.success(QuestionResponse.from(questionDto));
    }

    @DeleteMapping("/{questionId}")
    public Response<Void> delete(@PathVariable Long questionId,
                                 Authentication authentication) {
        questionService.delete(authentication.getName(), questionId);
        return Response.success();
    }

    @GetMapping("/search")
    public Response<Page<QuestionResponse>> search(@RequestParam String keyword, @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return Response.success(questionService.search(keyword, pageable).map(QuestionResponse::from));
    }

    @GetMapping("/{questionId}")
    public Response<QuestionResponse> get(@PathVariable Long questionId) {
        QuestionDto questionDto = questionService.findById(questionId);
        return Response.success(QuestionResponse.from(questionDto));
    }

    @GetMapping
    public Response<Page<QuestionResponse>> list(
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestParam(name = "sort", required = false) String sort) {
        if (sort != null) {
            if (sort.equals("view")) {
                pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("view").descending().and(Sort.by("createdAt").descending()));
            } else if (sort.equals("votes")) {
                pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("votes").descending().and(Sort.by("createdAt").descending()));
            } else if (sort.equals("answers")) {
                pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("answers").descending().and(Sort.by("createdAt").descending()));
            }
        } else {
            pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("createdAt").descending());
        }
        return Response.success(questionService.list(pageable).map(QuestionResponse::from));
    }

    @GetMapping("/my/question-list")
    public Response<Page<QuestionResponse>> myList(Pageable pageable,
                                                   Authentication authentication) {
        return Response.success(questionService.myQuestionList(authentication.getName(), pageable).map(QuestionResponse::from));
    }
}
