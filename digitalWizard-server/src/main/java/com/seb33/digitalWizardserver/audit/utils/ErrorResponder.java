package com.seb33.digitalWizardserver.audit.utils;

import com.google.gson.Gson;
import com.seb33.digitalWizardserver.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// ErrorResponse를 클라이언트에게 전송하기 위한 클래스
public class ErrorResponder {
    public static void sendErrorResponse(HttpServletResponse response, HttpStatus status) throws IOException {
        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.of(status);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE); // 응답의 컨텐츠 타입을 JSON으로 설정
        response.setStatus(status.value()); // status 작성
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class)); // response body 부분 작성
    }
}